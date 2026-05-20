# FlipBook Landing Page

A fast, static landing page designed to be calm, legible, and easy to deploy.

## Structure

- `index.html`: Core structure, messaging, and metadata.
- `styles.css`: All styling, zero dependencies, responsive, custom properties.
- `config.js`: Centralized data store for demos and FAQs.
- `app.js`: Lightweight DOM rendering logic for the config.

## How To Edit Content

1. Copy adjustments: open `index.html` and edit the text directly.
2. Updating command examples or the main product copy: open `index.html`.
3. Replacing demo slots: open `config.js` and modify the `demos` array.
4. Updating FAQs: open `config.js` and modify the `faqs` array.

## Publishing Source

This site is intended to be served from the `docs/` folder via Cloudflare Pages.
It should describe the current public CLI surface, especially:

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
- create the `flipbook-releases` Pages project if it does not exist
- deploy `docs/`
- attach git branch and commit metadata to the deployment

## Installer Endpoints

The canonical installer entrypoints live in `docs/` so the Pages site serves them directly:

- `https://flipbook.browserbox.io/install.sh`
- `https://flipbook.browserbox.io/install.ps1`
