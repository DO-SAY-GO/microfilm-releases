# Microfilm Landing Page

A fast, static sales page for the Microfilm product.

## Structure

- `index.html`: Minimal shell and metadata placeholders.
- `messages.js`: Canonical copy store for visible page text, metadata, demos, pricing, FAQs, and links.
- `app.js`: DOM rendering logic that prints the page from `messages.js` on load.
- `styles.css`: All styling, zero dependencies, responsive, custom properties.

## How To Edit Content

1. Open `messages.js`.
2. Rewrite the `current_copy` values in your own voice.
3. Keep `purpose` and `audience` notes when useful so future edits preserve intent.
4. Update demo links, pricing, FAQ answers, and install commands in the same file.

## Publishing Source

This site is intended to be served from the `docs/` folder via Cloudflare Pages.
The canonical public release repository is:

- <https://github.com/DO-SAY-GO/microfilm-releases>

It should describe the paid public CLI surface, especially:

- single-file document/video/image conversion
- positional image-directory gallery mode
- `--from-folder` collection mode
- `--no-deploy` local static export
- `--force-pages` for overriding large collection deployment guards
- BrowserBox URL mode as an optional licensed integration

## Cloudflare Pages

For direct uploads to Cloudflare Pages, run:

- `./deploy-pages.sh`

The script will:

- install `wrangler` globally with npm if it is missing
- create the `microfilm-releases` Pages project if it does not exist
- deploy `docs/`
- attach git branch and commit metadata to the deployment

## Installer Endpoints

The canonical installer entrypoints live in `docs/` so the Pages site serves them directly:

- `https://microfilm.browserbox.io/install.sh`
- `https://microfilm.browserbox.io/install.ps1`
