import { siteMessages } from './messages.js';

const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

function copyText(entry) {
    if (entry && typeof entry === 'object' && hasOwn(entry, 'current_copy')) {
        return entry.current_copy;
    }
    return entry ?? '';
}

function setText(id, entry) {
    const element = document.getElementById(id);
    if (element) element.textContent = copyText(entry);
    return element;
}

function setHref(id, href) {
    const element = document.getElementById(id);
    if (element && href) element.href = href;
    return element;
}

function setMeta(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.setAttribute('content', copyText(value));
}

function linkElement(config, className = '') {
    const link = document.createElement('a');
    link.href = config.href || '#';
    link.textContent = copyText(config.label);
    if (className) link.className = className;
    if (config.external) {
        link.target = '_blank';
        link.rel = 'noopener';
    }
    return link;
}

function renderMeta(messages) {
    document.title = copyText(messages.meta.title);
    setMeta('meta[name="description"]', messages.meta.description);
    setMeta('meta[property="og:url"]', messages.meta.url);
    setMeta('meta[property="og:title"]', messages.meta.ogTitle);
    setMeta('meta[property="og:description"]', messages.meta.ogDescription);
    setMeta('meta[property="og:image"]', messages.meta.image);
    setMeta('meta[property="twitter:url"]', messages.meta.url);
    setMeta('meta[property="twitter:title"]', messages.meta.ogTitle);
    setMeta('meta[property="twitter:description"]', messages.meta.ogDescription);
    setMeta('meta[property="twitter:image"]', messages.meta.image);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = copyText(messages.meta.url);

    const schema = document.getElementById('schema-software');
    if (schema) {
        schema.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: copyText(messages.brand.name),
            operatingSystem: 'Windows, Linux, macOS',
            applicationCategory: 'MultimediaApplication, UtilitiesApplication',
            description: copyText(messages.meta.description),
            offers: messages.pricing.plans.map(plan => ({
                '@type': 'Offer',
                name: copyText(plan.name),
                price: plan.priceValue,
                priceCurrency: 'USD',
            })),
        });
    }
}

function renderBrand(messages) {
    setText('brand-name', messages.brand.name);
    setText('footer-brand-name', messages.brand.name);
    setText('built-by', messages.footer.builtBy);
    const brandMark = document.getElementById('brand-mark');
    const footerBrandMark = document.getElementById('footer-brand-mark');
    const logoAlt = copyText(messages.brand.logoAlt);
    if (brandMark) brandMark.alt = logoAlt;
    if (footerBrandMark) footerBrandMark.alt = logoAlt;
}

function renderNav(messages) {
    const nav = document.getElementById('nav-links');
    if (!nav) return;
    nav.replaceChildren(...messages.nav.map(item => linkElement(item)));
}

function renderHero(messages) {
    setText('hero-eyebrow', messages.hero.eyebrow);
    setText('hero-title', messages.hero.headline);
    setText('hero-subtitle', messages.hero.subheadline);
    setText('hero-description', messages.hero.body);
    const primary = setHref('hero-primary-cta', messages.hero.primaryCta.href);
    if (primary) primary.textContent = copyText(messages.hero.primaryCta.label);
    const secondary = setHref('hero-secondary-cta', messages.hero.secondaryCta.href);
    if (secondary) secondary.textContent = copyText(messages.hero.secondaryCta.label);

    const proof = document.getElementById('hero-proof');
    if (proof) {
        proof.replaceChildren(...messages.hero.proof.map(item => {
            const pill = document.createElement('span');
            pill.className = 'proof-pill';
            pill.textContent = copyText(item);
            return pill;
        }));
    }
}

function renderLead(messages) {
    setText('promise-lead', messages.promise.lead);
}

function renderDemos(messages) {
    setText('demos-kicker', messages.demosSection.kicker);
    setText('demos-title', messages.demosSection.title);
    setText('demos-subtitle', messages.demosSection.subtitle);

    const demoContainer = document.getElementById('demo-container');
    if (!demoContainer) return;
    demoContainer.replaceChildren(...messages.demos.map((demo, index) => {
        const card = linkElement({ href: demo.link, label: '' }, `demo-card${index === 0 ? ' primary-demo' : ''}`);
        card.setAttribute('aria-label', copyText(demo.title));

        const thumb = document.createElement('div');
        thumb.className = demo.thumbnailImage ? 'demo-thumb has-media' : 'demo-thumb';
        if (demo.thumbnailImage) {
            const img = document.createElement('img');
            img.className = 'demo-thumb-media';
            img.src = demo.thumbnailImage;
            img.alt = copyText(demo.thumbnailAlt) || `${copyText(demo.title)} thumbnail`;
            img.loading = 'lazy';
            thumb.appendChild(img);
        } else {
            const placeholder = document.createElement('span');
            placeholder.className = 'demo-thumb-placeholder';
            placeholder.textContent = copyText(demo.thumbnailText);
            thumb.appendChild(placeholder);
        }
        if (demo.thumbnailText) {
            const label = document.createElement('span');
            label.className = 'demo-thumb-label';
            label.textContent = copyText(demo.thumbnailText);
            thumb.appendChild(label);
        }

        const content = document.createElement('div');
        content.className = 'demo-content';
        const header = document.createElement('div');
        header.className = 'demo-header';
        const title = document.createElement('h3');
        title.className = 'demo-title';
        title.textContent = copyText(demo.title);
        const badge = document.createElement('span');
        badge.className = 'demo-badge';
        badge.textContent = copyText(demo.badge);
        header.append(title, badge);

        const description = document.createElement('p');
        description.className = 'demo-desc';
        description.textContent = copyText(demo.description);
        content.append(header, description);
        card.replaceChildren(thumb, content);
        return card;
    }));
}

function renderSteps(messages) {
    setText('flow-title', messages.workflow.title);
    const container = document.getElementById('flow-container');
    if (!container) return;
    container.replaceChildren(...messages.workflow.steps.map(step => {
        const card = document.createElement('div');
        card.className = 'flow-step';
        const title = document.createElement('h3');
        title.textContent = copyText(step.title);
        const body = document.createElement('p');
        body.textContent = copyText(step.body);
        card.append(title, body);
        return card;
    }));
}

function renderPricing(messages) {
    setText('pricing-title', messages.pricing.title);
    setText('pricing-subtitle', messages.pricing.subtitle);
    const container = document.getElementById('pricing-container');
    if (!container) return;
    container.replaceChildren(...messages.pricing.plans.map(plan => {
        const card = document.createElement('article');
        card.className = `pricing-card${plan.featured ? ' featured' : ''}`;

        const name = document.createElement('h3');
        name.textContent = copyText(plan.name);
        const price = document.createElement('p');
        price.className = 'price';
        price.textContent = copyText(plan.price);
        const note = document.createElement('p');
        note.className = 'price-note';
        note.textContent = copyText(plan.note);

        const features = document.createElement('ul');
        features.className = 'feature-list';
        features.replaceChildren(...plan.features.map(feature => {
            const item = document.createElement('li');
            item.textContent = copyText(feature);
            return item;
        }));

        const cta = linkElement(plan.cta, 'button primary pricing-cta');
        card.append(name, price, note, features, cta);
        return card;
    }));
}

function renderBuyerFilter(messages) {
    setText('buyer-title', messages.buyerFilter.title);
    setText('buyer-subtitle', messages.buyerFilter.subtitle);
    const container = document.getElementById('buyer-container');
    if (!container) return;
    container.replaceChildren(...messages.buyerFilter.cards.map(cardConfig => {
        const card = document.createElement('article');
        card.className = 'buyer-card';
        const title = document.createElement('h3');
        title.textContent = copyText(cardConfig.title);
        const body = document.createElement('p');
        body.textContent = copyText(cardConfig.body);
        card.append(title, body);
        return card;
    }));
}

function renderUsage(messages) {
    setText('usage-title', messages.usage.title);
    const container = document.getElementById('usage-container');
    if (container) {
        container.replaceChildren(...messages.usage.commands.map(command => {
            const card = document.createElement('div');
            card.className = 'command-card';
            const title = document.createElement('h3');
            title.textContent = copyText(command.title);
            const code = document.createElement('code');
            code.textContent = copyText(command.command);
            card.append(title, code);
            return card;
        }));
    }
    setText('usage-note', messages.usage.note);
}

function renderInstall(messages) {
    setText('install-title', messages.install.title);
    setText('install-description', messages.install.body);
    const cta = setHref('install-primary-cta', messages.install.primaryCta.href);
    if (cta) cta.textContent = copyText(messages.install.primaryCta.label);
    const commands = document.getElementById('install-commands');
    if (commands) {
        commands.replaceChildren(...messages.install.commands.map(command => {
            const code = document.createElement('code');
            code.textContent = copyText(command);
            return code;
        }));
    }
}

function renderFaqs(messages) {
    setText('faq-title', messages.faqSection.title);
    const container = document.getElementById('faq-container');
    if (!container) return;
    container.replaceChildren(...messages.faqs.map(faq => {
        const item = document.createElement('div');
        item.className = 'faq-item';
        const question = document.createElement('h3');
        question.className = 'faq-q';
        question.textContent = copyText(faq.q);
        const answer = document.createElement('p');
        answer.className = 'faq-a';
        answer.textContent = copyText(faq.a);
        item.append(question, answer);
        return item;
    }));
}

function renderFooter(messages) {
    const links = document.getElementById('footer-links');
    if (!links) return;
    links.replaceChildren(...messages.footer.links.map(item => linkElement(item)));
}

document.addEventListener('DOMContentLoaded', () => {
    renderMeta(siteMessages);
    renderBrand(siteMessages);
    renderNav(siteMessages);
    renderHero(siteMessages);
    renderLead(siteMessages);
    renderDemos(siteMessages);
    renderSteps(siteMessages);
    renderPricing(siteMessages);
    renderBuyerFilter(siteMessages);
    renderUsage(siteMessages);
    renderInstall(siteMessages);
    renderFaqs(siteMessages);
    renderFooter(siteMessages);
});
