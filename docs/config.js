export const siteConfig = {
    demos: [
        {
            title: "WAR.GOV/UFO Microfilm2",
            description: "A large multi-source archive presented as one fast microfilm viewer with 24fps playback, virtualized thumbnails, and source metadata.",
            badge: "Collection",
            link: "https://hypergrid.systems/war.gov-ufo-viewer/microfilm2?frame=20752&page=20752",
            thumbnailImage: "https://hypergrid.systems/viewers/items/092-dow-uap-pr35-unresolved-uap-report-greece-october-2023/site/pages/000552.jpg",
            thumbnailAlt: "A WAR.GOV/UFO archive frame rendered in the FlipBook microfilm viewer",
            thumbnailText: "55k+ frames"
        },
        {
            title: "Bitcoin Whitepaper",
            description: "The original Bitcoin paper rendered as a clean 9-page static document viewer.",
            badge: "PDF",
            link: "https://bitcoin-whitepaper-1abel.pages.dev",
            thumbnailImage: "https://bitcoin-vhimg.pages.dev/pages/000001.jpg",
            thumbnailAlt: "Bitcoin whitepaper cover page in the FlipBook viewer",
            thumbnailText: "9 pages"
        },
        {
            title: "Elden Ring Weapons List",
            description: "A wide XLSX tiled into readable bands with frozen context preserved across pages.",
            badge: "XLSX",
            link: "https://elden-ring-weapons-list-qrclw.pages.dev",
            thumbnailImage: "https://elden-ring-weapons-list-37c13.pages.dev/pages/000001.jpg",
            thumbnailAlt: "Elden Ring weapon spreadsheet rendered as a tiled FlipBook page",
            thumbnailText: "37 pages"
        },
        {
            title: "Daihatsu Hijet Service Manual",
            description: "A 909-page OCR service manual published as a static viewer without pagination lag.",
            badge: "Manual",
            link: "https://hijet-s100-s110-s120-s130-service-manual-2n1gf.pages.dev",
            thumbnailImage: "https://hijet-s100-s110-s120-s130-service-manual-2n1gf.pages.dev/pages/000001.jpg",
            thumbnailAlt: "Daihatsu Hijet service manual cover rendered in FlipBook",
            thumbnailText: "909 pages"
        },
        {
            title: "NuScale Investor Presentation",
            description: "A modern investor deck exported into a crisp slide-by-slide static presentation.",
            badge: "Slides",
            link: "https://nuscale-investor-presentation-y9386.pages.dev",
            thumbnailImage: "https://nuscale-investor-presentation-cb1xn.pages.dev/pages/000001.jpg",
            thumbnailAlt: "NuScale investor presentation cover slide in the FlipBook viewer",
            thumbnailText: "16 pages"
        },
        {
            title: "Swiss Village Short",
            description: "A vertical travel short converted into 438 scrubbable frames with video-style controls.",
            badge: "Video",
            link: "https://swiss-village-9ti6n.pages.dev",
            thumbnailImage: "https://is-this-the-most-beautiful-village-in-th-tcnby.pages.dev/pages/000183.jpg",
            thumbnailAlt: "A mountain village frame from a vertical travel video rendered in FlipBook",
            thumbnailText: "438 frames"
        },
        {
            title: "Neo Tokyo Motorcycle",
            description: "A short cyberpunk clip rendered into frame-accurate playback and fast visual scrubbing.",
            badge: "Video",
            link: "https://neo-tokyo-motorbike-with-girlfriend-e5r1w.pages.dev",
            thumbnailImage: "https://neo-tokyo-motorcycle-s08zm.pages.dev/pages/000073.jpg",
            thumbnailAlt: "A neon motorcycle frame from a cyberpunk video rendered in FlipBook",
            thumbnailText: "145 frames"
        },
        {
            title: "Steve Jobs Interview Clip",
            description: "A longer archival interview clip published as 1,224 frames for precise searching and replay.",
            badge: "Video",
            link: "https://steve-jobs-interview-clip-6npqx.pages.dev",
            thumbnailImage: "https://steve-jobs-predicts-the-iphone-in-1981-x-4r4gn.pages.dev/pages/000612.jpg",
            thumbnailAlt: "A Steve Jobs interview frame rendered in the FlipBook viewer",
            thumbnailText: "1,224 frames"
        },
        {
            title: "Attention Is All You Need",
            description: "The original transformer paper rendered as a fast 15-page research document viewer.",
            badge: "Paper",
            link: "https://attention-is-all-you-need-nl226.pages.dev",
            thumbnailImage: "https://attention-is-all-you-need-nl226.pages.dev/pages/000001.jpg",
            thumbnailAlt: "Attention Is All You Need title page rendered in the FlipBook viewer",
            thumbnailText: "15 pages"
        },
        {
            title: "AlphaFold Structure Predictions",
            description: "The AlphaFold paper published as a 24-page scientific article with quick page scrubbing.",
            badge: "Paper",
            link: "https://alphafold-accurate-structure-predictions-g2640.pages.dev",
            thumbnailImage: "https://alphafold-accurate-structure-predictions-g2640.pages.dev/pages/000001.jpg",
            thumbnailAlt: "AlphaFold paper opening page rendered in the FlipBook viewer",
            thumbnailText: "24 pages"
        },
        {
            title: "Skateboard Clip",
            description: "A short vertical skate clip converted into 242 scrubbable frames with instant seeking.",
            badge: "Video",
            link: "https://skateboard-8n2na.pages.dev",
            thumbnailImage: "https://skateboard-8n2na.pages.dev/pages/000121.jpg",
            thumbnailAlt: "A skateboarding frame rendered in the FlipBook viewer",
            thumbnailText: "242 frames"
        },
        {
            title: "BrowserBox Flipbook Search Session",
            description: "A live BrowserBox browsing session exploring what a flipbook is across Google, Wikipedia, and FlipBook, published as a 4,638-frame replayable web artifact.",
            badge: "BrowserBox",
            link: "https://browser-session-it94u.pages.dev",
            thumbnailImage: "https://browser-session-it94u.pages.dev/pages/002319.jpg",
            thumbnailAlt: "A BrowserBox session browsing a flip book article and search results in FlipBook",
            thumbnailText: "4,638 frames"
        }
    ],
    faqs: [
        {
            q: "What is FlipBook?",
            a: "FlipBook is a utility that turns files, folders, and sessions into static directories of pages, frames, manifests, and thumbnails, accompanied by a polished viewer. The output is highly scrubbable and fast to browse."
        },
        {
            q: "What kinds of content can it publish?",
            a: "FlipBook supports PDFs, Office documents (PowerPoint, Excel, Word), videos, images, image directories, mixed collection folders with --from-folder, and BrowserBox session recordings."
        },
        {
            q: "What is --from-folder?",
            a: "--from-folder builds one flattened collection viewer from a folder of supported assets. Optional flipbook.json, collection.json, or manifest.json files can define ordering, titles, links, descriptions, tags, and source metadata."
        },
        {
            q: "Does it require a server?",
            a: "No. FlipBook converts inputs into static HTML, CSS, JavaScript, and image assets. You can host the output anywhere static files live."
        },
        {
            q: "Where can I host the output?",
            a: "Cloudflare Pages is built in, and --no-deploy writes the same static site locally for GitHub Pages, AWS S3, Vercel, Netlify, nginx, or any standard web server."
        },
        {
            q: "Is it open source?",
            a: "No. FlipBook is free to use, but not open source."
        },
        {
            q: "How does it relate to BrowserBox?",
            a: "FlipBook is built by the same team. It functions as a standalone utility for local media, but URL input uses BrowserBox to record and publish a browser session. BrowserBox mode requires a BrowserBox license."
        }
    ]
};
