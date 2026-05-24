# Microfilm GTM, Pricing, and Licensing

## Positioning

Microfilm is a developer/archive publishing CLI for generating permanent, static, high-performance web artifacts from complex media.

It should not be framed as a generic PDF flipbook maker. Low-end flipbook plugins and hosted PDF converters are cheaper because they optimize for simple page-turning documents. Microfilm should compete on a different axis:

- large mixed-media archives
- static, portable, self-hostable output
- CLI and batch workflows
- frame-accurate scrubbing
- video, document, folder, collection, and browser-session inputs
- durable published artifacts that do not depend on a hosted viewer service

The category promise:

> Not a flipbook toy. Not hosted publishing SaaS. A CLI for generating permanent, static, high-performance archives from complex media.

## Buyer

Primary buyers are technical operators who need to publish or deliver artifacts, not design teams making glossy brochures.

Good-fit buyers:

- developers publishing demos, evidence, sessions, or technical artifacts
- archive and research teams publishing large inspectable collections
- agencies, labs, journalists, and investigators working with source media
- teams that need static output for durability, review, legal, procurement, or security reasons
- companies that want to self-host outputs without viewer-service lock-in

Poor-fit buyers:

- people who only need a cheap PDF page-turn widget
- teams that want a hosted design suite
- buyers whose main requirement is templates, animations, lead forms, or magazine-style layout tools

## Competitive framing

Generic flipbook tools anchor below Microfilm:

- DearFlip JS: low-cost plugin-style flipbooks
- FlipBookPDF: low-cost PDF-to-flipbook conversion
- FlowPaper: self-hosted flipbook/document presentation

Higher-end publishing platforms validate higher annual prices:

- Flipsnack Professional/Business/Team pricing shows that buyers will pay hundreds to thousands per year when the product includes professional publishing, teams, controls, and enterprise workflows.

Microfilm should sit between those categories:

- above cheap flipbook plugins because it is a CLI/batch/archive tool
- below heavy enterprise publishing suites for the Pro tier
- high enough on Team and Archive plans to support real support, offline licensing, and procurement work

## Launch pricing

| Tier | Price | Best for | Core packaging |
| --- | ---: | --- | --- |
| Microfilm Trial | Free for 14 days | Evaluation | Full CLI, capped exports, required footer/watermark, build-time license check |
| Microfilm Indie | $149/year | Small public/commercial artifacts | 1 seat, commercial use, reasonable caps, required "Made with Microfilm" footer |
| Microfilm Pro | $399/year | Default paid tier | 1 seat, footer removal, larger jobs, batch workflows, CI-friendly use, priority updates |
| Microfilm Team | $1,500/year | Small teams and client/internal delivery | 5 seats, shared commercial license, team usage, priority support |
| Microfilm Archive / Enterprise | $10K+/year | Institutions and serious archive deployments | Offline licensing, white-label, custom deployment, procurement/security terms, support |

Pro is the primary conversion target. Indie exists for smaller buyers who can tolerate attribution in exchange for a lower price. Enterprise starts high because offline licensing, white-label rights, custom deployment, procurement terms, and support expectations create real operational cost.

## Tier details

### Microfilm Trial

Goal: maximize reach without giving away production use.

Recommended terms:

- 14-day trial
- full CLI feature surface
- capped exports, such as limited export count and/or frame count per export
- required "Made with Microfilm" footer or visible watermark
- no commercial delivery rights
- build-time license check required
- generated artifacts remain viewable after export, but trial artifacts retain attribution/watermark

Trial should let people prove the workflow on real inputs. It should not produce unbranded production deliverables.

### Microfilm Indie

Goal: offer a credible low-end paid option without making it the default product.

Recommended terms:

- 1 named seat
- commercial use allowed
- public/static artifacts allowed
- reasonable frame/export caps
- required small "Made with Microfilm" footer
- no white-label rights
- no SaaS wrapping
- no shared team usage

This tier is the discounted public-artifact license. The footer requirement is acceptable only because the price is materially below Pro.

### Microfilm Pro

Goal: default paid tier and main self-serve revenue driver.

Recommended terms:

- 1 named seat
- commercial use allowed
- footer removal allowed
- larger jobs than Indie
- batch workflows
- CI-friendly non-interactive activation
- priority updates
- standard email support

This should be the highlighted plan on the landing page.

### Microfilm Team

Goal: monetize multi-user and client/internal archive delivery.

Recommended terms:

- 5 seats
- shared commercial license for one company/team
- internal and client delivery rights
- priority support
- CI/build-machine activation pool
- higher export and frame limits
- procurement-friendly invoice option

Team should stay simple and annual. Avoid per-artifact pricing at launch unless a buyer asks for a custom deployment.

### Microfilm Archive / Enterprise

Goal: capture institutional value without forcing complex customers through self-serve plans.

Recommended terms:

- starts at $10K/year
- offline license option
- white-label rights
- custom deployment help
- larger support expectations
- procurement, MSA, DPA, security review, and custom terms as needed
- dedicated activation limits and build-machine allowances

Enterprise should be sold, not self-served.

## Commercial license boundaries

Customers may:

- use the CLI to generate static Microfilm artifacts within their tier limits
- self-host generated artifacts
- publish generated artifacts publicly or privately, if their tier permits commercial delivery
- keep generated artifacts viewable without runtime license checks
- remove the Microfilm footer only on tiers that grant footer removal or white-label rights

Customers may not:

- redistribute, resell, sublicense, or publish the Microfilm CLI
- extract, resell, or separately redistribute the viewer/runtime code
- SaaS-wrap Microfilm or offer it as a hosted conversion service without a separate agreement
- remove attribution where the tier requires attribution
- share a single-seat license across a team
- bypass license checks, activation limits, export caps, or watermark/footer rules
- use trial artifacts as unbranded production deliverables

Generated artifacts are outputs. The CLI, runtime implementation, obfuscation pipeline, and build system remain protected product IP.

## Technical licensing model

License enforcement belongs at build/export time, not view time.

Generated artifacts should remain:

- static
- portable
- self-hostable
- durable
- viewable without calling a license server

This is core product value. A Microfilm archive should not break because a license API is unavailable years later.

Recommended implementation:

1. The CLI verifies a signed license file or token before export.
2. The license payload includes license ID, tier, customer name, seats, expiration, feature flags, export caps, activation limits, and optional offline permissions.
3. The CLI verifies the signature locally using an embedded public key.
4. Online activations bind a license to a small number of machines/build hosts.
5. CI uses a non-interactive license token or activation secret.
6. Trial and Indie builds inject required attribution/watermark metadata at export time.
7. Pro and higher tiers can emit unbranded artifacts when the license grants that feature.
8. Generated artifacts include non-secret metadata such as generator name, version, license tier, and build timestamp when appropriate.
9. Enterprise offline licenses use longer-lived signed license files with explicit customer, term, and scope.

Do not embed private license secrets in generated artifacts.

## Fraud and theft controls

Use layered controls that protect the product without weakening static artifact portability.

Recommended controls:

- signed licenses verified by the CLI
- short-lived trial licenses
- trial export caps
- machine/build-host activation limits
- CI-specific license tokens
- server-side license revocation for future builds
- local public-key verification for offline resilience
- footer/watermark enforcement for Trial and Indie
- viewer JS obfuscation for served flagship demos and generated commercial artifacts where appropriate
- clear license metadata in generated outputs
- public commercial terms that explicitly prohibit redistribution, extraction, SaaS wrapping, and attribution bypass

Obfuscation is an IP friction layer, not the only defense. The main control is licensing plus commercial terms plus signed build-time enforcement.

## Artifact policy

The exported artifact is the deliverable. It should not require Microfilm servers to display.

Policy:

- no runtime license checks for viewing generated artifacts
- no tracking beacon required for normal viewing
- no hosted dependency required for playback/scrubbing
- no hidden secret required inside exported static files
- optional customer analytics only when explicitly configured by the customer

This is a major differentiator from hosted publishing SaaS.

## Default landing-page message

Use Pro as the default paid CTA.

Suggested pricing copy:

> Start with Microfilm Pro at $399/year. Generate static, self-hostable viewers from documents, videos, folders, browser sessions, and large mixed-media archives. Trial is free for evaluation. Indie is available for small public artifacts with attribution. Teams and archive deployments can license Microfilm for larger commercial use.

## Launch sales motion

Self-serve:

- Trial
- Indie
- Pro

Assisted sales:

- Team
- Archive / Enterprise

Primary conversion path:

1. Visitor opens the WAR.GOV/UFO Microfilm5 demo.
2. Visitor sees Microfilm handles 332K+ frames as one static artifact.
3. Visitor starts a trial or buys Pro.
4. Higher-intent buyers contact for Team or Archive licensing.

## Operating principles

- Keep the free tier useful, but not production-equivalent.
- Keep Pro simple and obviously worth paying for.
- Keep generated artifacts durable and static.
- Charge real money for footer removal, team use, offline rights, white-label rights, and custom deployment.
- Protect the CLI and runtime IP, but do not compromise the buyer's ability to self-host outputs.
