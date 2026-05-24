#!/usr/bin/env bash
set -euo pipefail

RELEASE_REPO="${MICROFILM_RELEASE_REPO:-${FLIPBOOK_RELEASE_REPO:-DO-SAY-GO/microfilm-releases}}"
SITE_URL="${MICROFILM_SITE_URL:-${FLIPBOOK_SITE_URL:-https://microfilm.browserbox.io}}"
RAW_SELF_URL="${MICROFILM_INSTALL_URL:-${FLIPBOOK_INSTALL_URL:-${SITE_URL}/install.sh}}"
COMMAND_NAME="${MICROFILM_COMMAND_NAME:-${FLIPBOOK_COMMAND_NAME:-microfilm}}"
INSTALL_DIR="${MICROFILM_INSTALL_DIR:-${FLIPBOOK_INSTALL_DIR:-$HOME/.local/bin}}"
WRAPPER_PATH="${INSTALL_DIR}/${COMMAND_NAME}"
DATA_ROOT="${MICROFILM_DATA_DIR:-${FLIPBOOK_DATA_DIR:-${XDG_DATA_HOME:-$HOME/.local/share}/microfilm}}"
BIN_DIR="${DATA_ROOT}/bin"
STATE_DIR="${DATA_ROOT}/state"
BINARY_PATH="${BIN_DIR}/microfilm-cli"
LAST_UPDATE_FILE="${STATE_DIR}/last-update-check"
INSTALLED_TAG_FILE="${STATE_DIR}/installed-tag"
UPDATE_INTERVAL_SECONDS="${MICROFILM_UPDATE_INTERVAL_SECONDS:-${FLIPBOOK_UPDATE_INTERVAL_SECONDS:-10800}}"
CHECKSUMS_NAME="SHA256SUMS.txt"

log() {
  printf '%s\n' "$*" >&2
}

fail() {
  log "Error: $*"
  exit 1
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "$1 is required."
}

make_temp_dir() {
  mktemp -d 2>/dev/null || mktemp -d -t microfilm
}

binary_exists() {
  [[ -f "$BINARY_PATH" ]] && [[ -x "$BINARY_PATH" ]]
}

extract_semver() {
  local text="$1" line
  while IFS= read -r line; do
    if [[ "$line" =~ ([vV]?[0-9]+(\.[0-9]+){1,2}(-[0-9A-Za-z.-]+)?) ]]; then
      echo "${BASH_REMATCH[1]}"
      return 0
    fi
  done <<< "$text"
  return 1
}

normalize_version_tag() {
  local version="$1"
  [[ -n "$version" ]] || return 1

  if [[ "$version" != v* ]]; then
    version="v${version}"
  fi

  _parse_tag "$version" || return 1
  printf '%s\n' "$version"
}

_parse_tag() {
  local s="$1" core pre a b c rcnum
  PAR_MAJ=0 PAR_MIN=0 PAR_PAT=0 PAR_STABLE=1 PAR_RCNUM=0 PAR_HASPATCH=0

  [[ ${s:0:1} == "v" ]] && s="${s:1}"

  core="${s%%-*}"
  if [[ "$core" == "$s" ]]; then
    pre=""
  else
    pre="${s#"$core"-}"
  fi

  IFS='.' read -r a b c <<< "$core"

  [[ "$a" =~ ^[0-9]+$ ]] || return 1
  [[ "$b" =~ ^[0-9]+$ ]] || return 1
  if [[ -z "${c:-}" ]]; then
    PAR_PAT=0
    PAR_HASPATCH=0
  else
    [[ "$c" =~ ^[0-9]+$ ]] || return 1
    PAR_PAT="$c"
    PAR_HASPATCH=1
  fi

  PAR_MAJ="$a"
  PAR_MIN="$b"

  if [[ -n "$pre" ]]; then
    if [[ "$pre" == "rc" ]]; then
      PAR_STABLE=0
      PAR_RCNUM=0
    elif [[ "$pre" == rc.* ]]; then
      rcnum="${pre#rc.}"
      [[ "$rcnum" =~ ^[0-9]+$ ]] || return 1
      PAR_STABLE=0
      PAR_RCNUM="$rcnum"
    else
      return 1
    fi
  fi

  return 0
}

_better_than() {
  local cMaj=$1 cMin=$2 cPat=$3 cSt=$4 cRc=$5 cHP=$6
  local bMaj=$7 bMin=$8 bPat=$9 bSt=${10} bRc=${11} bHP=${12}

  if (( cMaj > bMaj )); then
    return 0
  elif (( cMaj < bMaj )); then
    return 1
  fi

  if (( cMin > bMin )); then
    return 0
  elif (( cMin < bMin )); then
    return 1
  fi

  if (( cPat > bPat )); then
    return 0
  elif (( cPat < bPat )); then
    return 1
  fi

  if (( cSt != bSt )); then
    (( cSt > bSt )) && return 0 || return 1
  fi

  if (( cSt == 0 )); then
    if (( cRc > bRc )); then
      return 0
    elif (( cRc < bRc )); then
      return 1
    fi
  fi

  if (( cHP != bHP )); then
    (( cHP > bHP )) && return 0 || return 1
  fi

  return 1
}

version_is_newer() {
  local candidate="$1" baseline="$2"
  _parse_tag "$candidate" || return 1
  local cMaj=$PAR_MAJ cMin=$PAR_MIN cPat=$PAR_PAT cSt=$PAR_STABLE cRc=$PAR_RCNUM cHP=$PAR_HASPATCH
  _parse_tag "$baseline" || return 1
  local bMaj=$PAR_MAJ bMin=$PAR_MIN bPat=$PAR_PAT bSt=$PAR_STABLE bRc=$PAR_RCNUM bHP=$PAR_HASPATCH
  _better_than "$cMaj" "$cMin" "$cPat" "$cSt" "$cRc" "$cHP" "$bMaj" "$bMin" "$bPat" "$bSt" "$bRc" "$bHP"
}

fetch_tag_names() {
  curl -fsSL --connect-timeout 20 "https://api.github.com/repos/${RELEASE_REPO}/tags?per_page=100" \
    | grep -o '"name":[[:space:]]*"[^"]*"' \
    | sed 's/.*"name":[[:space:]]*"\([^"]*\)"/\1/'
}

get_latest_stable_tag() {
  local best_tag="" bestMaj=0 bestMin=0 bestPat=0 bestStable=0 bestRc=0 bestHP=0
  local tag cMaj cMin cPat cSt cRc cHP

  while IFS= read -r tag; do
    [[ -z "$tag" ]] && continue
    if _parse_tag "$tag" && (( PAR_STABLE == 1 )) && (( PAR_HASPATCH == 1 )); then
      cMaj=$PAR_MAJ
      cMin=$PAR_MIN
      cPat=$PAR_PAT
      cSt=$PAR_STABLE
      cRc=$PAR_RCNUM
      cHP=$PAR_HASPATCH

      if [[ -z "$best_tag" ]] || _better_than \
        "$cMaj" "$cMin" "$cPat" "$cSt" "$cRc" "$cHP" \
        "$bestMaj" "$bestMin" "$bestPat" "$bestStable" "$bestRc" "$bestHP"; then
        best_tag="$tag"
        bestMaj=$cMaj
        bestMin=$cMin
        bestPat=$cPat
        bestStable=$cSt
        bestRc=$cRc
        bestHP=$cHP
      fi
    fi
  done < <(fetch_tag_names)

  [[ -n "$best_tag" ]] || return 1
  printf '%s\n' "$best_tag"
}

get_local_version_tag() {
  if ! binary_exists; then
    printf '%s\n' "not_installed"
    return 0
  fi

  local output version reported_tag installed_tag
  output="$("$BINARY_PATH" --version 2>/dev/null || true)"
  version="$(extract_semver "$output" || true)"

  reported_tag="$(normalize_version_tag "$version" || true)"
  installed_tag="$(normalize_version_tag "$(cat "$INSTALLED_TAG_FILE" 2>/dev/null || true)" || true)"

  if [[ -n "$reported_tag" && -n "$installed_tag" ]]; then
    if version_is_newer "$installed_tag" "$reported_tag"; then
      printf '%s\n' "$installed_tag"
    else
      printf '%s\n' "$reported_tag"
    fi
    return 0
  fi

  if [[ -n "$installed_tag" ]]; then
    printf '%s\n' "$installed_tag"
    return 0
  fi

  if [[ -n "$reported_tag" ]]; then
    printf '%s\n' "$reported_tag"
    return 0
  fi

  printf '%s\n' "unknown"
}

detect_arch() {
  case "$(uname -m)" in
    x86_64|amd64)
      printf 'x64\n'
      ;;
    arm64|aarch64)
      printf 'arm64\n'
      ;;
    *)
      return 1
      ;;
  esac
}

asset_name_for_current_platform() {
  local arch os
  arch="$(detect_arch)" || fail "Unsupported architecture: $(uname -m)"
  os="$(uname -s)"

  case "${os}:${arch}" in
    Linux:x64)
      printf 'linux-x64.tar.gz\n'
      ;;
    Linux:arm64)
      fail "Unsupported architecture: $(uname -m). Current Linux releases ship only linux-x64.tar.gz."
      ;;
    Darwin:x64)
      printf 'macos-x64.zip\n'
      ;;
    Darwin:arm64)
      printf 'macos-arm64.zip\n'
      ;;
    *)
      return 1
      ;;
  esac
}

compute_sha256() {
  local file="$1"

  if command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$file" | awk '{print $1}'
  elif command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$file" | awk '{print $1}'
  elif command -v openssl >/dev/null 2>&1; then
    openssl dgst -sha256 "$file" | awk '{print $NF}'
  else
    fail "No SHA-256 tool is available. Install shasum, sha256sum, or openssl."
  fi
}

expected_checksum_for_asset() {
  local asset="$1" checksums_file="$2"

  awk -v file="$asset" '
    {
      name=$2
      sub(/^\*/, "", name)
      if (name == file) {
        print $1
        exit
      }
    }
  ' "$checksums_file"
}

verify_archive_checksum() {
  local archive_path="$1" asset="$2" checksums_path="$3" expected actual

  expected="$(expected_checksum_for_asset "$asset" "$checksums_path")"
  [[ -n "$expected" ]] || fail "No checksum entry found for ${asset}."

  actual="$(compute_sha256 "$archive_path")"
  expected="$(printf '%s' "$expected" | tr '[:upper:]' '[:lower:]')"
  actual="$(printf '%s' "$actual" | tr '[:upper:]' '[:lower:]')"

  [[ "$actual" == "$expected" ]] || fail "Checksum mismatch for ${asset}."
}

extract_archive() {
  local archive="$1"
  local destination="$2"

  case "$archive" in
    *.tar.gz)
      tar -xzf "$archive" -C "$destination"
      ;;
    *.zip)
      if command -v unzip >/dev/null 2>&1; then
        unzip -qo "$archive" -d "$destination"
      elif command -v ditto >/dev/null 2>&1; then
        ditto -x -k "$archive" "$destination"
      else
        fail "unzip or ditto is required to extract ${archive##*/}."
      fi
      ;;
    *)
      fail "Unsupported archive format: ${archive##*/}"
      ;;
  esac
}

download_and_install_binary() {
  (
    local tag="$1"
    local asset archive_url checksums_url tmp_dir archive_path checksums_path candidate tmp_binary

    mkdir -p "$BIN_DIR" "$STATE_DIR"
    asset="$(asset_name_for_current_platform)" || fail "Unsupported operating system: $(uname -s)"
    archive_url="https://github.com/${RELEASE_REPO}/releases/download/${tag}/${asset}"
    checksums_url="https://github.com/${RELEASE_REPO}/releases/download/${tag}/${CHECKSUMS_NAME}"
    tmp_dir="$(make_temp_dir)"

    cleanup_tmp_dir() {
      rm -rf "$tmp_dir"
    }
    trap cleanup_tmp_dir EXIT

    archive_path="${tmp_dir}/${asset##*/}"
    checksums_path="${tmp_dir}/${CHECKSUMS_NAME}"

    log "Installing Microfilm ${tag}..."
    curl -fL --connect-timeout 20 -o "$archive_path" "$archive_url"
    curl -fL --connect-timeout 20 -o "$checksums_path" "$checksums_url"
    verify_archive_checksum "$archive_path" "$asset" "$checksums_path"
    extract_archive "$archive_path" "$tmp_dir"

    candidate="$(find "$tmp_dir" -type f \( -name 'microfilm' -o -name 'microfilm-cli' \) | head -n 1)"
    [[ -n "$candidate" ]] || fail "Downloaded archive did not contain the Microfilm binary."

    tmp_binary="${BINARY_PATH}.tmp"
    cp "$candidate" "$tmp_binary"
    chmod +x "$tmp_binary"
    mv "$tmp_binary" "$BINARY_PATH"
    printf '%s\n' "$tag" > "$INSTALLED_TAG_FILE"
    date +%s > "$LAST_UPDATE_FILE"
  )
}

should_check_for_updates() {
  local skip_update_check="${MICROFILM_SKIP_UPDATE_CHECK:-${FLIPBOOK_SKIP_UPDATE_CHECK:-}}"
  if [[ "$skip_update_check" =~ ^(1|true|TRUE|yes|YES)$ ]]; then
    return 1
  fi

  if [[ ! -f "$LAST_UPDATE_FILE" ]]; then
    return 0
  fi

  local now last_check
  now="$(date +%s)"
  last_check="$(cat "$LAST_UPDATE_FILE" 2>/dev/null || true)"
  [[ "$last_check" =~ ^[0-9]+$ ]] || return 0

  (( now - last_check >= UPDATE_INTERVAL_SECONDS ))
}

record_update_check() {
  mkdir -p "$STATE_DIR"
  date +%s > "$LAST_UPDATE_FILE"
}

ensure_binary() {
  local latest_tag current_tag

  if ! binary_exists; then
    latest_tag="$(get_latest_stable_tag)" || fail "Could not determine the latest stable Microfilm release."
    download_and_install_binary "$latest_tag"
    return 0
  fi

  if ! should_check_for_updates; then
    return 0
  fi

  record_update_check

  if ! latest_tag="$(get_latest_stable_tag 2>/dev/null)"; then
    log "Skipping update check because the latest stable release could not be determined."
    return 0
  fi

  current_tag="$(get_local_version_tag)"
  if [[ "$current_tag" == "unknown" || "$current_tag" == "not_installed" ]] || version_is_newer "$latest_tag" "$current_tag"; then
    log "Updating Microfilm to ${latest_tag}..."
    if ! download_and_install_binary "$latest_tag"; then
      log "Update failed. Continuing with the installed binary."
    fi
  fi
}

select_profile_file() {
  local shell_name candidate
  shell_name="${SHELL##*/}"

  case "$shell_name" in
    zsh)
      for candidate in "$HOME/.zprofile" "$HOME/.zshrc"; do
        [[ -f "$candidate" ]] && { printf '%s\n' "$candidate"; return 0; }
      done
      printf '%s\n' "$HOME/.zprofile"
      ;;
    bash)
      for candidate in "$HOME/.bash_profile" "$HOME/.bashrc" "$HOME/.profile"; do
        [[ -f "$candidate" ]] && { printf '%s\n' "$candidate"; return 0; }
      done
      printf '%s\n' "$HOME/.bash_profile"
      ;;
    *)
      printf '%s\n' "$HOME/.profile"
      ;;
  esac
}

ensure_install_dir_on_path() {
  local profile_file path_line

  case ":$PATH:" in
    *":${INSTALL_DIR}:"*)
      return 0
      ;;
  esac

  profile_file="$(select_profile_file)"
  path_line="export PATH=\"${INSTALL_DIR}:\$PATH\""

  touch "$profile_file"
  if ! grep -Fqs "$path_line" "$profile_file"; then
    printf '\n%s\n' "$path_line" >> "$profile_file"
    log "Added ${INSTALL_DIR} to PATH in ${profile_file}."
  fi
}

install_wrapper() {
  require_cmd curl

  mkdir -p "$INSTALL_DIR"

  if [[ -n "${BASH_SOURCE[0]:-}" ]] \
    && [[ -f "${BASH_SOURCE[0]}" ]] \
    && [[ "${BASH_SOURCE[0]}" != /dev/fd/* ]] \
    && [[ "${BASH_SOURCE[0]}" != /proc/self/fd/* ]]; then
    cp "${BASH_SOURCE[0]}" "$WRAPPER_PATH"
  else
    curl -fsSL "$RAW_SELF_URL" -o "$WRAPPER_PATH"
  fi

  chmod +x "$WRAPPER_PATH"
  ensure_install_dir_on_path
  ensure_binary

  log "Installed Microfilm to ${WRAPPER_PATH}."
  case ":$PATH:" in
    *":${INSTALL_DIR}:"*)
      ;;
    *)
      log "Open a new shell or run: export PATH=\"${INSTALL_DIR}:\$PATH\""
      ;;
  esac
}

is_install_mode() {
  [[ "${0##*/}" != "$COMMAND_NAME" ]]
}

main() {
  if is_install_mode; then
    install_wrapper
    exit 0
  fi

  require_cmd curl
  ensure_binary

  # Report the authoritative installed version rather than the binary's
  # built-in string, which may fall back to a stale Cargo.toml value on
  # older releases that lacked the build-time version stamp.
  if [[ "${1:-}" == "--version" || "${1:-}" == "-V" ]]; then
    local installed_tag
    installed_tag="$(cat "$INSTALLED_TAG_FILE" 2>/dev/null || true)"
    if [[ -n "$installed_tag" ]]; then
      printf 'microfilm %s\n' "$installed_tag"
      exit 0
    fi
  fi

  exec "$BINARY_PATH" "$@"
}

main "$@"
