# FlipBook

### Static viewers for documents, video, image sets, collections, and browser sessions.

FlipBook turns source media into a polished static viewer you can share as a URL.
Give it one document, one video, an image directory, a whole folder of mixed assets,
or a BrowserBox-recorded web session; it renders pages/frames, writes a static site,
and can upload that site to Cloudflare Pages.

The viewer is built for fast inspection: thumbnail-to-full-image loading, scrubbing,
microfilm-style 24fps playback, keyboard controls, invert mode, virtualized thumbnails,
and no backend runtime.

## Install

macOS/Linux:

```bash
curl -fsSL https://flipbook.browserbox.io/install.sh | bash
```

Windows PowerShell:

```powershell
irm https://flipbook.browserbox.io/install.ps1 | iex
```

Public releases and checksums live in this repository:
<https://github.com/DO-SAY-GO/flipbook-releases/releases/latest>

## Quick examples

```bash
flipbook report.pdf
flipbook deck.pptx --title "Launch deck"
flipbook demo.mp4 --fps 24 --quality 88
flipbook ./screenshots --title "Image gallery"
flipbook --from-folder ./archive --title "Archive reel"
flipbook --from-folder ./archive --no-deploy --private-output-dir ./out
flipbook https://example.com --title "Site walkthrough" --open
```

## Input modes

| Mode | Command | Output |
| --- | --- | --- |
| PDF / Office document | `flipbook report.pdf` | Static page viewer |
| Video | `flipbook clip.mp4 --fps 24` | Scrubbable frame viewer |
| Single image | `flipbook cover.png` | Static image viewer |
| Image directory | `flipbook ./screenshots` | Gallery-style viewer |
| Mixed collection folder | `flipbook --from-folder ./archive` | One flattened collection/microfilm viewer |
| Browser session URL | `flipbook https://example.com` | BrowserBox recording rendered as a static viewer |

## Collection folders

`--from-folder` is for multi-asset archives: PDFs, Office files, videos, images, and
image folders stitched into one viewer. FlipBook looks for `flipbook.json`,
`collection.json`, or `manifest.json` to control ordering and metadata; otherwise it
auto-discovers supported files and sorts them naturally.

Collection playback defaults to the current microfilm standard: 24fps video extraction,
JPEG quality 88, 300px thumbnails, thumbnail-first/full-frame promotion, and virtualized
thumbnail navigation. Large folders with more than 20,000 source files build locally but
skip Cloudflare Pages deployment unless you pass `--force-pages`.

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
| `--format <jpg|png|webp>` | Choose output image format |
| `--width <PX>` | Cap render width when you want smaller output |
| `--open` | Open the BrowserBox session or final URL |
| `--yes` | Non-interactive dependency installs |

## Notes

- Output is static HTML, CSS, JavaScript, manifests, pages, and thumbnails.
- FlipBook deploys with Wrangler as a subprocess; it does not reimplement Wrangler.
- Missing runtime tools such as FFmpeg, Poppler, Node.js, and Wrangler are installed or
  prompted for when needed.
- Browser session recording requires BrowserBox from <https://browserbox.io>.

Primary site: <https://flipbook.browserbox.io>
