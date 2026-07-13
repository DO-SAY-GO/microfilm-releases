# Microfilm

## 🎬 Live now

```bash
curl -fsSL https://microfilm.browserbox.io/install.sh | bash
```

Latest release: <https://github.com/DO-SAY-GO/microfilm-releases/releases/latest> ·
Questions or feedback: <microfilm@dosaygo.com>

### Static, scrubbable viewers for documents, video, collections, and browser sessions.

This repository is the public release channel and Cloudflare Pages landing site
for Microfilm. It publishes installer scripts, release artifacts, checksums, and
the editable product site at <https://microfilm.browserbox.io>.

Microfilm turns source media into a polished static viewer you can share as a URL.
Give it one document, one video, an image directory, a whole folder of mixed assets,
or a BrowserBox-recorded web session; it renders pages/frames, writes a static site,
and can upload that site to Cloudflare Pages.

The viewer is built for fast inspection: thumbnail-to-full-frame loading, scrubbing
from the slider, the viewport, or the canvas filmstrip (drag, wheel, or click it),
storyboard-backed previews that keep frames visible at any connection speed,
microfilm-style 24fps playback, global keyboard controls, invert mode, and no
backend runtime.

## Install

macOS/Linux:

```bash
curl -fsSL https://microfilm.browserbox.io/install.sh | bash
```

Windows PowerShell:

```powershell
irm https://microfilm.browserbox.io/install.ps1 | iex
```

Public releases and checksums live in this repository:
<https://github.com/DO-SAY-GO/microfilm-releases/releases/latest>

## Quick examples

```bash
microfilm report.pdf
microfilm deck.pptx --title "Launch deck"
microfilm demo.mp4 --fps 24 --quality 88
microfilm ./screenshots --title "Image gallery"
microfilm --from-folder ./archive --title "Archive reel"
microfilm --from-folder ./archive --no-deploy --private-output-dir ./out
microfilm https://example.com --title "Site walkthrough" --open
```

## Input modes

| Mode | Command | Output |
| --- | --- | --- |
| PDF / Office document | `microfilm report.pdf` | Static page viewer |
| Video | `microfilm clip.mp4 --fps 24` | Scrubbable frame viewer |
| Single image | `microfilm cover.png` | Static image viewer |
| Image directory | `microfilm ./screenshots` | Gallery-style viewer |
| Mixed collection folder | `microfilm --from-folder ./archive` | One flattened collection/microfilm viewer |
| Browser session URL | `microfilm https://example.com` | BrowserBox recording rendered as a static viewer |

## Collection folders

`--from-folder` is for multi-asset archives: PDFs, Office files, videos, images, and
image folders stitched into one viewer. Microfilm looks for `microfilm.json`,
`collection.json`, or `manifest.json` to control ordering and metadata; it also
accepts legacy `flipbook.json` manifests. Without a manifest, it auto-discovers
supported files and sorts them naturally.

Collection playback defaults to the current microfilm standard: 24fps video extraction,
JPEG quality 88, 300px thumbnails, thumbnail-first/full-frame promotion, and a canvas
filmstrip that scrubs any number of frames. Large folders with more than 20,000 source
files build locally but skip Cloudflare Pages deployment unless you pass `--force-pages`.

## Useful options

| Option | Purpose |
| --- | --- |
| `--title <TITLE>` | Set the viewer title |
| `--name <PROJECT>` | Set the Cloudflare Pages project name |
| `--no-deploy` | Generate the static viewer locally only |
| `--private-output-dir <DIR>` | Choose where local output is written |
| `--from-folder <DIR>` | Build a mixed collection from a folder |
| `--force-pages` | Override the large-folder Pages deployment guard |
| `--fps <FPS>` | Set video extraction/playback FPS; default `24` |
| `--quality <1-100>` | Set JPEG/WebP output quality; default `88` | 
| `--format <jpg\|png\|webp>` | Choose output image format |
| `--width <PX>` | Cap render width when you want smaller output |
| `--open` | Open the BrowserBox session or final URL |
| `--yes` | Non-interactive dependency installs |

## Notes

- Output is static HTML, CSS, JavaScript, manifests, pages, and thumbnails.
- Microfilm deploys with Wrangler as a subprocess; it does not reimplement Wrangler.
- Missing runtime tools such as FFmpeg, Poppler, Node.js, and Wrangler are installed or
  prompted for when needed.
- Browser session recording requires BrowserBox from <https://browserbox.io>.

Primary site: <https://microfilm.browserbox.io>
