# Howell Insurance Group Website

Marketing site for Scott Howell's independent health insurance agency (Brevard County, FL; licensed in 30 states).

Live: https://www.howellinsurancegroup.com

## Stack

Plain static HTML, CSS, and vanilla JavaScript. No framework, no package manager, no build step — the files in this repo are exactly what gets served.

## Structure

Every page is a folder containing an `index.html`, which gives clean URLs (`/services/aca-marketplace-plans/`).

```
index.html                 Homepage
about/                     About Scott
services/                  Services hub + one folder per service
quote/                     Multi-step quote form (GHL embed placeholder)
booking/                   Strategy-call booking
faq/                       FAQ (FAQPage schema)
contact/                   Contact info, hours, service area
blog/                      Blog hub + one folder per article
locations/florida/         Florida hub + Brevard city pages
shared/header.html         Site header, nav, announcement bar, mobile nav
shared/footer.html         Site footer
css/style.css              Single global stylesheet (brand colors as CSS variables)
js/components.js           Injects shared header/footer into each page
js/main.js                 Menu toggle, FAQ accordion, other UI behavior
images/                    Optimized images (about photos, carrier logos)
sitemap.xml, robots.txt    Search engine files
llms.txt                   Site summary for AI crawlers
knowledge-base/            Source content for the AI chat agent (not served as pages)
docs/                      Original strategy & build plan (.docx)
```

### Shared header and footer

Pages don't contain the header or footer markup. Each page has empty `#site-header` and `#site-footer` elements, and `js/components.js` fetches `/shared/header.html` and `/shared/footer.html` at runtime and inserts them. Edit nav and footer links in `shared/` only.

### Structured data

Each page carries its own JSON-LD in `<head>` (LocalBusiness, FAQPage, BlogPosting, BreadcrumbList, Person, as appropriate). When adding a page, copy the schema pattern from a similar existing page and add the URL to `sitemap.xml`.

## Running locally

Because the header/footer are loaded with `fetch` from absolute paths, opening files directly (`file://`) won't work. Serve the repo root instead:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deployment

Hosted on Vercel (project `howell-health-site`, team `powersuite-4078's projects`), connected to `github.com/powersuite/howell-health-site`.

- Every push to `main` triggers a production deploy automatically — usually live within a minute.
- No build command or output directory is configured; Vercel serves the repo root as static files.
- Domains: `www.howellinsurancegroup.com` is primary; `howellinsurancegroup.com` redirects to it.
- Each deploy gets an immutable preview URL; rollbacks are done from the Vercel dashboard.
