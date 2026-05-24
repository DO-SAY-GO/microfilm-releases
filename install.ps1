$ErrorActionPreference = "Stop"

try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
} catch { }

$ReleaseRepo = if ($env:MICROFILM_RELEASE_REPO) { $env:MICROFILM_RELEASE_REPO } elseif ($env:FLIPBOOK_RELEASE_REPO) { $env:FLIPBOOK_RELEASE_REPO } else { "DO-SAY-GO/microfilm-releases" }
$SiteUrl = if ($env:MICROFILM_SITE_URL) { $env:MICROFILM_SITE_URL } elseif ($env:FLIPBOOK_SITE_URL) { $env:FLIPBOOK_SITE_URL } else { "https://microfilm.browserbox.io" }
$RawSelfUrl = if ($env:MICROFILM_INSTALL_URL) { $env:MICROFILM_INSTALL_URL } elseif ($env:FLIPBOOK_INSTALL_URL) { $env:FLIPBOOK_INSTALL_URL } else { "$SiteUrl/install.ps1" }
$DataRoot = if ($env:MICROFILM_DATA_DIR) { $env:MICROFILM_DATA_DIR } elseif ($env:FLIPBOOK_DATA_DIR) { $env:FLIPBOOK_DATA_DIR } else { Join-Path $env:LOCALAPPDATA "Programs\Microfilm" }
$InstallDir = if ($env:MICROFILM_INSTALL_DIR) { $env:MICROFILM_INSTALL_DIR } elseif ($env:FLIPBOOK_INSTALL_DIR) { $env:FLIPBOOK_INSTALL_DIR } else { Join-Path $DataRoot "bin" }
$WrapperPath = Join-Path $InstallDir "microfilm.ps1"
$CmdShimPath = Join-Path $InstallDir "microfilm.cmd"
$CliPath = Join-Path $InstallDir "microfilm-cli.exe"
$StateDir = Join-Path $DataRoot "state"
$LastUpdateFile = Join-Path $StateDir "last-update-check.txt"
$InstalledTagFile = Join-Path $StateDir "installed-tag.txt"
$ChecksumsName = "SHA256SUMS.txt"
$UpdateIntervalSeconds = if ($env:MICROFILM_UPDATE_INTERVAL_SECONDS) { [int]$env:MICROFILM_UPDATE_INTERVAL_SECONDS } elseif ($env:FLIPBOOK_UPDATE_INTERVAL_SECONDS) { [int]$env:FLIPBOOK_UPDATE_INTERVAL_SECONDS } else { 10800 }
$Token = if ($env:GH_TOKEN) { $env:GH_TOKEN } elseif ($env:GITHUB_TOKEN) { $env:GITHUB_TOKEN } else { $null }

function Write-InfoLine {
    param([string]$Message)
    Write-Host $Message -ForegroundColor Cyan
}

function Write-WarnLine {
    param([string]$Message)
    Write-Host $Message -ForegroundColor Yellow
}

function Get-GitHubHeaders {
    $headers = @{
        "User-Agent" = "Microfilm-Installer"
    }

    if ($Token) {
        $headers["Authorization"] = "Bearer $Token"
    }

    return $headers
}

function Ensure-Directories {
    New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
    New-Item -ItemType Directory -Path $StateDir -Force | Out-Null
}

function Get-SemverFromText {
    param([string]$Text)

    $match = [regex]::Match($Text, '(?im)(v?\d+\.\d+(?:\.\d+)?(?:-[0-9A-Za-z\.-]+)?)')
    if ($match.Success) {
        return $match.Groups[1].Value
    }

    return $null
}

function Get-StableTags {
    $uri = "https://api.github.com/repos/$ReleaseRepo/tags?per_page=100"
    $response = Invoke-RestMethod -Uri $uri -Headers (Get-GitHubHeaders) -TimeoutSec 20
    @($response) |
        ForEach-Object { $_.name } |
        Where-Object { $_ -match '^v\d+\.\d+\.\d+$' }
}

function Get-LatestStableTag {
    $bestTag = $null
    $bestVersion = $null

    foreach ($tag in Get-StableTags) {
        $version = [version]($tag.TrimStart("v"))
        if (-not $bestVersion -or $version -gt $bestVersion) {
            $bestVersion = $version
            $bestTag = $tag
        }
    }

    if (-not $bestTag) {
        throw "Could not determine the latest stable Microfilm release."
    }

    return $bestTag
}

function Get-AssetArch {
    $arch = [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture.ToString().ToLowerInvariant()

    switch ($arch) {
        "x64" { return "x64" }
        "arm64" { return "arm64" }
        default { throw "Unsupported architecture: $arch" }
    }
}

function Get-AssetName {
    $arch = Get-AssetArch
    switch ($arch) {
        "x64" { return "windows-x64.zip" }
        "arm64" {
            # Current releases ship only the Windows x64 build; Windows on Arm can run it via emulation.
            return "windows-x64.zip"
        }
        default { throw "Unsupported architecture: $arch" }
    }
}

function Get-LocalVersionTag {
    if (-not (Test-Path $CliPath)) {
        return "not_installed"
    }

    $reportedTag = $null
    $installedTag = $null

    try {
        $output = & $CliPath --version 2>$null | Out-String
        $version = Get-SemverFromText -Text $output
        if ($version) {
            $reportedTag = if ($version.StartsWith("v")) { $version } else { "v$version" }
        }
    } catch { }

    try {
        if (Test-Path $InstalledTagFile) {
            $storedVersion = (Get-Content $InstalledTagFile -Raw).Trim()
            if ($storedVersion -match '^(v?\d+\.\d+\.\d+)$') {
                $installedTag = if ($storedVersion.StartsWith("v")) { $storedVersion } else { "v$storedVersion" }
            }
        }
    } catch { }

    if ($reportedTag -and $installedTag) {
        if (Test-NeedsUpdate -CandidateTag $installedTag -CurrentTag $reportedTag) {
            return $installedTag
        }
        return $reportedTag
    }

    if ($installedTag) {
        return $installedTag
    }

    if ($reportedTag) {
        return $reportedTag
    }

    return "unknown"
}

function Test-NeedsUpdate {
    param(
        [string]$CandidateTag,
        [string]$CurrentTag
    )

    if ($CurrentTag -in @("unknown", "not_installed")) {
        return $true
    }

    return ([version]($CandidateTag.TrimStart("v")) -gt [version]($CurrentTag.TrimStart("v")))
}

function Record-UpdateCheck {
    Ensure-Directories
    [DateTimeOffset]::UtcNow.ToUnixTimeSeconds().ToString() | Set-Content -Path $LastUpdateFile -Encoding ASCII
}

function Should-CheckForUpdates {
    $skipUpdateCheck = if ($env:MICROFILM_SKIP_UPDATE_CHECK) { $env:MICROFILM_SKIP_UPDATE_CHECK } else { $env:FLIPBOOK_SKIP_UPDATE_CHECK }
    if ($skipUpdateCheck) {
        $normalized = $skipUpdateCheck.ToLowerInvariant()
        if ($normalized -in @("1", "true", "yes", "y", "on")) {
            return $false
        }
    }

    if (-not (Test-Path $LastUpdateFile)) {
        return $true
    }

    try {
        $lastCheck = [long]((Get-Content $LastUpdateFile -Raw).Trim())
    } catch {
        return $true
    }

    $now = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
    return (($now - $lastCheck) -ge $UpdateIntervalSeconds)
}

function Get-ExpectedChecksum {
    param(
        [string]$AssetName,
        [string]$ChecksumsPath
    )

    foreach ($line in Get-Content $ChecksumsPath) {
        if ($line -match '^(?<hash>[A-Fa-f0-9]{64})\s+\*?(?<name>\S+)$') {
            if ($Matches["name"] -eq $AssetName) {
                return $Matches["hash"].ToLowerInvariant()
            }
        }
    }

    throw "No checksum entry found for $AssetName."
}

function Test-ArchiveChecksum {
    param(
        [string]$ArchivePath,
        [string]$AssetName,
        [string]$ChecksumsPath
    )

    $expected = Get-ExpectedChecksum -AssetName $AssetName -ChecksumsPath $ChecksumsPath
    $actual = (Get-FileHash -Path $ArchivePath -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($actual -ne $expected) {
        throw "Checksum mismatch for $AssetName."
    }
}

function Download-And-InstallBinary {
    param([string]$Tag)

    Ensure-Directories

    $archiveName = Get-AssetName
    $downloadUrl = "https://github.com/$ReleaseRepo/releases/download/$Tag/$archiveName"
    $checksumsUrl = "https://github.com/$ReleaseRepo/releases/download/$Tag/$ChecksumsName"
    $tempRoot = Join-Path ([IO.Path]::GetTempPath()) ("microfilm-" + [guid]::NewGuid().ToString("N"))
    $archivePath = Join-Path $tempRoot $archiveName
    $checksumsPath = Join-Path $tempRoot $ChecksumsName
    $extractDir = Join-Path $tempRoot "extract"

    New-Item -ItemType Directory -Path $tempRoot -Force | Out-Null

    try {
        Write-InfoLine "Installing Microfilm $Tag..."
        Invoke-WebRequest -Uri $downloadUrl -Headers (Get-GitHubHeaders) -OutFile $archivePath -TimeoutSec 60
        Invoke-WebRequest -Uri $checksumsUrl -Headers (Get-GitHubHeaders) -OutFile $checksumsPath -TimeoutSec 30
        Test-ArchiveChecksum -ArchivePath $archivePath -AssetName $archiveName -ChecksumsPath $checksumsPath
        Expand-Archive -Path $archivePath -DestinationPath $extractDir -Force

        $binary = Get-ChildItem $extractDir -Recurse -File |
            Where-Object { $_.Name -eq "microfilm.exe" } |
            Select-Object -First 1

        if (-not $binary) {
            throw "Downloaded archive did not contain the Microfilm binary."
        }

        $tmpBinary = "$CliPath.tmp"
        Copy-Item $binary.FullName $tmpBinary -Force
        Move-Item $tmpBinary $CliPath -Force
        $Tag | Set-Content -Path $InstalledTagFile -Encoding ASCII
        [DateTimeOffset]::UtcNow.ToUnixTimeSeconds().ToString() | Set-Content -Path $LastUpdateFile -Encoding ASCII
    } finally {
        Remove-Item $tempRoot -Recurse -Force -ErrorAction SilentlyContinue
    }
}

function Ensure-Binary {
    if (-not (Test-Path $CliPath)) {
        $tag = Get-LatestStableTag
        Download-And-InstallBinary -Tag $tag
        return
    }

    if (-not (Should-CheckForUpdates)) {
        return
    }

    Record-UpdateCheck

    try {
        $latestTag = Get-LatestStableTag
        $currentTag = Get-LocalVersionTag
        if (Test-NeedsUpdate -CandidateTag $latestTag -CurrentTag $currentTag) {
            Write-InfoLine "Updating Microfilm to $latestTag..."
            Download-And-InstallBinary -Tag $latestTag
        }
    } catch {
        Write-WarnLine "Update check failed. Continuing with the installed binary."
    }
}

function Add-InstallDirToUserPath {
    $currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
    $segments = @()

    if ($currentPath) {
        $segments = $currentPath.Split(";") | Where-Object { $_ }
    }

    if ($segments -notcontains $InstallDir) {
        $newPath = if ($currentPath) {
            "$currentPath;$InstallDir"
        } else {
            $InstallDir
        }

        [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
        $env:Path = "$env:Path;$InstallDir"
        Write-InfoLine "Added $InstallDir to the user PATH."
    }
}

function Install-Wrapper {
    Ensure-Directories

    Invoke-WebRequest -Uri $RawSelfUrl -Headers (Get-GitHubHeaders) -OutFile $WrapperPath -TimeoutSec 30

    @"
@echo off
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0microfilm.ps1" %*
"@ | Set-Content -Path $CmdShimPath -Encoding ASCII

    Add-InstallDirToUserPath
    Ensure-Binary

    Write-InfoLine "Installed Microfilm to $InstallDir."
    if ($env:Path -notlike "*$InstallDir*") {
        Write-WarnLine "Open a new terminal to pick up the updated PATH."
    }
}

function Test-InstallMode {
    $scriptName = $null

    if ($MyInvocation.MyCommand.Path) {
        $scriptName = [IO.Path]::GetFileName($MyInvocation.MyCommand.Path)
    } elseif ($MyInvocation.MyCommand.Name) {
        $scriptName = [IO.Path]::GetFileName($MyInvocation.MyCommand.Name)
    }

    return ($scriptName -ne "microfilm.ps1")
}

if (Test-InstallMode) {
    Install-Wrapper
    exit 0
}

Ensure-Binary

# Report the authoritative installed version rather than the binary's
# built-in string, which may fall back to a stale Cargo.toml value on
# older releases that lacked the build-time version stamp.
$isVersionFlag = ($args.Count -eq 1) -and ($args[0] -in @("--version", "-V"))
if ($isVersionFlag -and (Test-Path $InstalledTagFile)) {
    $storedTag = (Get-Content $InstalledTagFile -Raw).Trim()
    if ($storedTag) {
        Write-Output "microfilm $storedTag"
        exit 0
    }
}

& $CliPath @args
exit $LASTEXITCODE
