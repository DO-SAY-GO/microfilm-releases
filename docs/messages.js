export const siteMessages = {
    meta: {
        title: {
            purpose: 'Set the browser title and search-result headline.',
            audience: 'technical buyers and archive owners',
            current_copy: 'Microfilm | Static viewers for documents, video, collections, and browser sessions',
        },
        description: {
            purpose: 'Explain the product in one scannable metadata sentence.',
            audience: 'technical evaluators',
            current_copy: 'Microfilm turns documents, video, image sets, collection folders, and BrowserBox sessions into fast static viewers you can scrub, share, and host anywhere.',
        },
        ogTitle: {
            purpose: 'Provide a compact social-card headline.',
            audience: 'builders, archivists, technical founders',
            current_copy: 'Microfilm | Static, scrubbable viewers for complex media',
        },
        ogDescription: {
            purpose: 'Summarize the product promise for link previews.',
            audience: 'technical evaluators',
            current_copy: 'Convert heavy media into static, shareable viewers with frame-accurate scrubbing, demos, pricing, and a simple path to publish.',
        },
        url: {
            purpose: 'Canonical public landing page URL.',
            audience: 'search engines and social cards',
            current_copy: 'https://microfilm.browserbox.io/',
        },
        image: {
            purpose: 'Social preview image URL.',
            audience: 'social cards',
            current_copy: 'https://microfilm.browserbox.io/assets/branding/microfilm-mark-512.png',
        },
    },
    brand: {
        name: {
            purpose: 'Name the product plainly.',
            audience: 'all visitors',
            current_copy: 'Microfilm',
        },
        logoAlt: {
            purpose: 'Describe the product mark for screen readers.',
            audience: 'assistive technology users',
            current_copy: 'Microfilm logo',
        },
    },
    nav: [
        { label: { purpose: 'Navigate to product demos.', audience: 'evaluators', current_copy: 'Demos' }, href: '#demos' },
        { label: { purpose: 'Navigate to pricing.', audience: 'buyers', current_copy: 'Pricing' }, href: '#pricing' },
        { label: { purpose: 'Navigate to install commands.', audience: 'technical users', current_copy: 'Install' }, href: '#install' },
        { label: { purpose: 'Navigate to common questions.', audience: 'evaluators', current_copy: 'FAQ' }, href: '#faq' },
    ],
    hero: {
        eyebrow: {
            purpose: 'Signal the product category before the headline.',
            audience: 'technical buyers',
            current_copy: 'Static publishing for media that needs to be inspected, not merely downloaded.',
        },
        headline: {
            purpose: 'Explain the core hook in one memorable phrase.',
            audience: 'builders, archivists, early adopters',
            current_copy: 'Turn heavy media into a fast, scrubbable Microfilm.',
        },
        subheadline: {
            purpose: 'Clarify practical value without overexplaining.',
            audience: 'technical evaluators',
            current_copy: 'Documents, videos, image sets, mixed collections, and browser sessions become static viewers people can scan frame by frame.',
        },
        body: {
            purpose: 'Make the sales promise concrete.',
            audience: 'buyers deciding whether to try the tool',
            current_copy: 'Microfilm renders source media into HTML, CSS, JavaScript, manifests, pages, and thumbnails. No backend runtime. One artifact. One link. A browsing surface that feels built for evidence, demos, research, and launches.',
        },
        primaryCta: {
            label: { purpose: 'Primary sales action.', audience: 'buyers', current_copy: 'Buy or request a license' },
            href: 'mailto:sales@dosaygo.com?subject=Microfilm%20license',
        },
        secondaryCta: {
            label: { purpose: 'Secondary proof action.', audience: 'technical evaluators', current_copy: 'Open the main demo' },
            href: 'https://hypergrid.systems/war.gov-ufo-viewer/microfilm5',
        },
        proof: [
            { purpose: 'Compact proof point.', audience: 'skimmers', current_copy: 'Static output' },
            { purpose: 'Compact proof point.', audience: 'skimmers', current_copy: 'Frame-accurate scrubbing' },
            { purpose: 'Compact proof point.', audience: 'skimmers', current_copy: 'Cloudflare Pages ready' },
        ],
    },
    promise: {
        lead: {
            purpose: 'Bridge from hero to proof.',
            audience: 'buyers',
            current_copy: 'Microfilm is for artifacts where the viewer is the product: a launch deck, an archive, a session recording, a video proof, a folder of mixed evidence, or a collection too large to ask people to download and manually inspect.',
        },
    },
    demosSection: {
        kicker: { purpose: 'Introduce the demo section.', audience: 'evaluators', current_copy: 'Proof by artifact' },
        title: { purpose: 'Name the demo section.', audience: 'evaluators', current_copy: 'Open a real Microfilm before you read another claim.' },
        subtitle: { purpose: 'Explain why the demos matter.', audience: 'technical buyers', current_copy: 'The WAR.GOV/UFO viewer is the main demo: a large, advanced, mixed-source reel with fast scrubbing and frame metadata. The smaller examples show the same static publishing model across everyday inputs.' },
    },
    demos: [
        {
            title: { purpose: 'Name the flagship demo.', audience: 'buyers and evaluators', current_copy: 'WAR.GOV/UFO Microfilm5' },
            description: { purpose: 'Explain why this demo is the best proof.', audience: 'technical evaluators', current_copy: 'A large multi-source archive presented as one fast microfilm reel with metadata, virtualized thumbnails, and frame-level navigation.' },
            badge: { purpose: 'Label demo type.', audience: 'skimmers', current_copy: 'Main demo' },
            link: 'https://hypergrid.systems/war.gov-ufo-viewer/microfilm5',
            thumbnailImage: 'https://hypergrid.systems/viewers/items/092-dow-uap-pr35-unresolved-uap-report-greece-october-2023/site/pages/000552.jpg',
            thumbnailAlt: { purpose: 'Describe flagship thumbnail.', audience: 'assistive technology users', current_copy: 'A WAR.GOV/UFO archive frame rendered in the Microfilm viewer' },
            thumbnailText: { purpose: 'Give scale of flagship demo.', audience: 'skimmers', current_copy: '55k+ frames' },
        },
        {
            title: { purpose: 'Name a PDF demo.', audience: 'evaluators', current_copy: 'Bitcoin Whitepaper' },
            description: { purpose: 'Explain the PDF demo.', audience: 'technical evaluators', current_copy: 'The original Bitcoin paper rendered as a clean 9-page static document viewer.' },
            badge: { purpose: 'Label demo type.', audience: 'skimmers', current_copy: 'PDF' },
            link: 'https://bitcoin-whitepaper-1abel.pages.dev',
            thumbnailImage: 'https://bitcoin-vhimg.pages.dev/pages/000001.jpg',
            thumbnailAlt: { purpose: 'Describe Bitcoin thumbnail.', audience: 'assistive technology users', current_copy: 'Bitcoin whitepaper cover page in the Microfilm viewer' },
            thumbnailText: { purpose: 'Show demo size.', audience: 'skimmers', current_copy: '9 pages' },
        },
        {
            title: { purpose: 'Name a spreadsheet demo.', audience: 'evaluators', current_copy: 'Elden Ring Weapons List' },
            description: { purpose: 'Explain spreadsheet conversion.', audience: 'technical evaluators', current_copy: 'A wide XLSX tiled into readable bands with frozen context preserved across pages.' },
            badge: { purpose: 'Label demo type.', audience: 'skimmers', current_copy: 'XLSX' },
            link: 'https://elden-ring-weapons-list-qrclw.pages.dev',
            thumbnailImage: 'https://elden-ring-weapons-list-37c13.pages.dev/pages/000001.jpg',
            thumbnailAlt: { purpose: 'Describe spreadsheet thumbnail.', audience: 'assistive technology users', current_copy: 'Elden Ring weapon spreadsheet rendered as a tiled Microfilm page' },
            thumbnailText: { purpose: 'Show demo size.', audience: 'skimmers', current_copy: '37 pages' },
        },
        {
            title: { purpose: 'Name a manual demo.', audience: 'evaluators', current_copy: 'Daihatsu Hijet Service Manual' },
            description: { purpose: 'Explain long-document handling.', audience: 'technical evaluators', current_copy: 'A 909-page OCR service manual published as a static viewer without pagination lag.' },
            badge: { purpose: 'Label demo type.', audience: 'skimmers', current_copy: 'Manual' },
            link: 'https://hijet-s100-s110-s120-s130-service-manual-2n1gf.pages.dev',
            thumbnailImage: 'https://hijet-s100-s110-s120-s130-service-manual-2n1gf.pages.dev/pages/000001.jpg',
            thumbnailAlt: { purpose: 'Describe manual thumbnail.', audience: 'assistive technology users', current_copy: 'Daihatsu Hijet service manual cover rendered in Microfilm' },
            thumbnailText: { purpose: 'Show demo size.', audience: 'skimmers', current_copy: '909 pages' },
        },
        {
            title: { purpose: 'Name a video demo.', audience: 'evaluators', current_copy: 'Swiss Village Short' },
            description: { purpose: 'Explain video conversion.', audience: 'technical evaluators', current_copy: 'A vertical travel short converted into 438 scrubbable frames with video-style controls.' },
            badge: { purpose: 'Label demo type.', audience: 'skimmers', current_copy: 'Video' },
            link: 'https://swiss-village-9ti6n.pages.dev',
            thumbnailImage: 'https://is-this-the-most-beautiful-village-in-th-tcnby.pages.dev/pages/000183.jpg',
            thumbnailAlt: { purpose: 'Describe video thumbnail.', audience: 'assistive technology users', current_copy: 'A mountain village frame from a vertical travel video rendered in Microfilm' },
            thumbnailText: { purpose: 'Show demo size.', audience: 'skimmers', current_copy: '438 frames' },
        },
        {
            title: { purpose: 'Name a BrowserBox demo.', audience: 'evaluators', current_copy: 'BrowserBox Search Session' },
            description: { purpose: 'Explain browser-session conversion.', audience: 'technical evaluators', current_copy: 'A BrowserBox browsing session published as a 4,638-frame replayable web artifact.' },
            badge: { purpose: 'Label demo type.', audience: 'skimmers', current_copy: 'BrowserBox' },
            link: 'https://browser-session-it94u.pages.dev',
            thumbnailImage: 'https://browser-session-it94u.pages.dev/pages/002319.jpg',
            thumbnailAlt: { purpose: 'Describe BrowserBox thumbnail.', audience: 'assistive technology users', current_copy: 'A BrowserBox session rendered as a Microfilm artifact' },
            thumbnailText: { purpose: 'Show demo size.', audience: 'skimmers', current_copy: '4,638 frames' },
        },
    ],
    workflow: {
        title: { purpose: 'Explain the core workflow.', audience: 'technical evaluators', current_copy: 'How it works' },
        steps: [
            {
                title: { purpose: 'Step label.', audience: 'technical users', current_copy: 'Convert' },
                body: { purpose: 'Explain conversion inputs.', audience: 'technical users', current_copy: 'Feed Microfilm a PDF, Office document, image, image directory, video, collection folder, or URL.' },
            },
            {
                title: { purpose: 'Step label.', audience: 'technical users', current_copy: 'Generate' },
                body: { purpose: 'Explain generated output.', audience: 'technical users', current_copy: 'It renders pages or frames and emits a static viewer with manifests, pages, thumbnails, and controls.' },
            },
            {
                title: { purpose: 'Step label.', audience: 'technical users', current_copy: 'Publish' },
                body: { purpose: 'Explain deployment value.', audience: 'technical users', current_copy: 'Publish to Cloudflare Pages or keep the same static output for any host that serves files.' },
            },
        ],
    },
    pricing: {
        title: { purpose: 'Name pricing section.', audience: 'buyers', current_copy: 'Launch pricing' },
        subtitle: { purpose: 'Set pricing context.', audience: 'buyers', current_copy: 'Simple enough to buy without a procurement saga, serious enough for commercial use.' },
        plans: [
            {
                name: { purpose: 'Name primary plan.', audience: 'individual buyers', current_copy: 'Microfilm Pro' },
                price: { purpose: 'Show primary price.', audience: 'buyers', current_copy: '$149/year' },
                priceValue: '149',
                note: { purpose: 'Clarify plan unit.', audience: 'buyers', current_copy: 'One seat for builders, researchers, and technical operators.' },
                featured: true,
                features: [
                    { purpose: 'Plan feature.', audience: 'buyers', current_copy: 'Local conversion for documents, images, videos, and collections' },
                    { purpose: 'Plan feature.', audience: 'buyers', current_copy: 'Static export and Cloudflare Pages publishing' },
                    { purpose: 'Plan feature.', audience: 'buyers', current_copy: 'Commercial use for one operator' },
                ],
                cta: {
                    label: { purpose: 'Primary pricing CTA.', audience: 'buyers', current_copy: 'Request Pro license' },
                    href: 'mailto:sales@dosaygo.com?subject=Microfilm%20Pro%20license',
                },
            },
            {
                name: { purpose: 'Name team plan.', audience: 'small teams', current_copy: 'Microfilm Commercial' },
                price: { purpose: 'Show team price.', audience: 'buyers', current_copy: '$499/year' },
                priceValue: '499',
                note: { purpose: 'Clarify team plan.', audience: 'buyers', current_copy: 'Small-team license for shared commercial publishing.' },
                features: [
                    { purpose: 'Plan feature.', audience: 'buyers', current_copy: 'Multiple operators on one team' },
                    { purpose: 'Plan feature.', audience: 'buyers', current_copy: 'BrowserBox session publishing path' },
                    { purpose: 'Plan feature.', audience: 'buyers', current_copy: 'Priority help for release artifacts' },
                ],
                cta: {
                    label: { purpose: 'Team pricing CTA.', audience: 'buyers', current_copy: 'Contact for Commercial' },
                    href: 'mailto:sales@dosaygo.com?subject=Microfilm%20Commercial',
                },
            },
            {
                name: { purpose: 'Name custom plan.', audience: 'enterprise and archive buyers', current_copy: 'Custom archive deployment' },
                price: { purpose: 'Show custom starting price.', audience: 'buyers', current_copy: 'From $1,500' },
                priceValue: '1500',
                note: { purpose: 'Clarify custom deployment.', audience: 'buyers', current_copy: 'For large archives, one-off launch rooms, or managed publication.' },
                features: [
                    { purpose: 'Plan feature.', audience: 'buyers', current_copy: 'Large collection planning' },
                    { purpose: 'Plan feature.', audience: 'buyers', current_copy: 'Custom viewer polish and deployment support' },
                    { purpose: 'Plan feature.', audience: 'buyers', current_copy: 'Private handoff for sensitive artifacts' },
                ],
                cta: {
                    label: { purpose: 'Custom pricing CTA.', audience: 'buyers', current_copy: 'Discuss a deployment' },
                    href: 'mailto:sales@dosaygo.com?subject=Microfilm%20custom%20deployment',
                },
            },
        ],
    },
    buyerFilter: {
        title: { purpose: 'Qualify buyers.', audience: 'buyers', current_copy: 'Who should buy this' },
        subtitle: { purpose: 'Filter-fit summary.', audience: 'buyers', current_copy: 'Microfilm is best when the browsing experience is part of the value, not an afterthought.' },
        cards: [
            {
                title: { purpose: 'Buyer profile.', audience: 'buyers', current_copy: 'Launchers' },
                body: { purpose: 'Qualify launcher use case.', audience: 'buyers', current_copy: 'You need a demo, deck, evidence folder, or release artifact people can open immediately.' },
            },
            {
                title: { purpose: 'Buyer profile.', audience: 'buyers', current_copy: 'Archive owners' },
                body: { purpose: 'Qualify archive use case.', audience: 'buyers', current_copy: 'You have large collections where thumbnails, frame context, and fast jumps matter.' },
            },
            {
                title: { purpose: 'Buyer profile.', audience: 'buyers', current_copy: 'Browser session publishers' },
                body: { purpose: 'Qualify BrowserBox use case.', audience: 'buyers', current_copy: 'You want a real browsing session captured as a durable static artifact.' },
            },
        ],
    },
    usage: {
        title: { purpose: 'Introduce command examples.', audience: 'technical users', current_copy: 'Common commands' },
        commands: [
            {
                title: { purpose: 'Command label.', audience: 'technical users', current_copy: 'Single document' },
                command: { purpose: 'Example command.', audience: 'technical users', current_copy: 'microfilm report.pdf --title "Report"' },
            },
            {
                title: { purpose: 'Command label.', audience: 'technical users', current_copy: 'Video fast scan' },
                command: { purpose: 'Example command.', audience: 'technical users', current_copy: 'microfilm clip.mp4 --fps 24 --quality 88' },
            },
            {
                title: { purpose: 'Command label.', audience: 'technical users', current_copy: 'Collection folder' },
                command: { purpose: 'Example command.', audience: 'technical users', current_copy: 'microfilm --from-folder ./archive --title "Archive reel"' },
            },
            {
                title: { purpose: 'Command label.', audience: 'technical users', current_copy: 'Local-only output' },
                command: { purpose: 'Example command.', audience: 'technical users', current_copy: 'microfilm --from-folder ./archive --no-deploy --private-output-dir ./out' },
            },
            {
                title: { purpose: 'Command label.', audience: 'technical users', current_copy: 'Browser session' },
                command: { purpose: 'Example command.', audience: 'technical users', current_copy: 'microfilm https://example.com --title "Site tour" --open' },
            },
        ],
        note: {
            purpose: 'Clarify collection manifests.',
            audience: 'technical users',
            current_copy: 'Collection folders can include microfilm.json, collection.json, or manifest.json for ordering, titles, links, descriptions, tags, and source metadata.',
        },
    },
    install: {
        title: { purpose: 'Name install section.', audience: 'technical users', current_copy: 'Install Microfilm' },
        body: { purpose: 'Explain install route.', audience: 'technical users', current_copy: 'Install the latest signed binary for your platform, then use the license path above for commercial use.' },
        primaryCta: {
            label: { purpose: 'Release CTA.', audience: 'technical users', current_copy: 'Browse releases' },
            href: 'https://github.com/DO-SAY-GO/microfilm-releases/releases/latest',
        },
        commands: [
            { purpose: 'macOS/Linux installer command.', audience: 'technical users', current_copy: 'curl -fsSL https://microfilm.browserbox.io/install.sh | bash' },
            { purpose: 'Windows installer command.', audience: 'technical users', current_copy: 'irm https://microfilm.browserbox.io/install.ps1 | iex' },
        ],
    },
    faqSection: {
        title: { purpose: 'Name FAQ section.', audience: 'evaluators', current_copy: 'FAQ' },
    },
    faqs: [
        {
            q: { purpose: 'FAQ question.', audience: 'evaluators', current_copy: 'What is Microfilm?' },
            a: { purpose: 'FAQ answer.', audience: 'evaluators', current_copy: 'Microfilm is a utility that turns files, folders, and sessions into static directories of pages, frames, manifests, and thumbnails, accompanied by a polished viewer.' },
        },
        {
            q: { purpose: 'FAQ question.', audience: 'evaluators', current_copy: 'What kinds of content can it publish?' },
            a: { purpose: 'FAQ answer.', audience: 'evaluators', current_copy: 'Microfilm supports PDFs, Office documents, videos, images, image directories, mixed collection folders with --from-folder, and BrowserBox session recordings.' },
        },
        {
            q: { purpose: 'FAQ question.', audience: 'evaluators', current_copy: 'Does it require a server?' },
            a: { purpose: 'FAQ answer.', audience: 'evaluators', current_copy: 'No. Microfilm outputs static HTML, CSS, JavaScript, and image assets. You can host the result anywhere static files live.' },
        },
        {
            q: { purpose: 'FAQ question.', audience: 'evaluators', current_copy: 'Is it open source?' },
            a: { purpose: 'FAQ answer.', audience: 'evaluators', current_copy: 'No. Microfilm is a paid product distributed as signed binaries.' },
        },
        {
            q: { purpose: 'FAQ question.', audience: 'evaluators', current_copy: 'How does it relate to BrowserBox?' },
            a: { purpose: 'FAQ answer.', audience: 'evaluators', current_copy: 'Microfilm works standalone for local files. URL input uses BrowserBox to record a browser session and publish that capture as a static artifact.' },
        },
    ],
    footer: {
        builtBy: { purpose: 'Credit product maker.', audience: 'all visitors', current_copy: 'Built by DOSAYGO' },
        links: [
            { label: { purpose: 'Footer home link.', audience: 'all visitors', current_copy: 'Home' }, href: './' },
            { label: { purpose: 'Footer BrowserBox link.', audience: 'evaluators', current_copy: 'BrowserBox' }, href: 'https://browserbox.io' },
            { label: { purpose: 'Footer releases link.', audience: 'technical users', current_copy: 'Releases' }, href: 'https://github.com/DO-SAY-GO/microfilm-releases/releases/latest' },
        ],
    },
};
