# CANDRON SEO notes (October 2026)

How the site is set up for search, the keywords each page targets, and who ranks for them today.

## How it works in the code

- **Metadata:** `lib/seo.ts` → `pageMeta()` sets the title, a snippet-length description, canonical URL and social cards. Titles use the template `%s | CANDRON` (keep the page part under ~50 characters).
- **Structured data:** `components/JsonLd.tsx` with builders in `lib/seo.ts` — breadcrumbs, FAQ, product, item list, article, web application. Organization/LocalBusiness/WebSite are site-wide in `app/layout.tsx`.
- **Blog:** Markdown files in `content/blog/*.md`, read by `lib/blog.ts`. Front matter: `title`, `seoTitle`, `description`, `date`, `category`, `keywords`, `related` (`Label | /path; …`), `cta` (`Label | /path`). A `## Frequently asked questions` section with `### Question` headings becomes FAQ structured data. Add a file, deploy, and it appears on `/blog`, its category page, the sitemap, the RSS feed (`/blog/rss.xml`), `llms.txt`, and in the "Related guides" strip on every product or tool page it links to.
- **Sitemap:** `app/sitemap.ts` — static pages, range pages, blog posts and categories (with real dates), and active inventory items from the database. Bump `SITE_UPDATED` when site-wide content changes.
- **AI search:** `/llms.txt` lists products, tools and guides for AI assistants and answer engines.

## Keyword map

| Search intent | Target page |
|---|---|
| dry type transformer supplier / manufacturer Canada | `/products/transformers/dry-type` |
| padmount transformer Canada / Ontario | `/products/transformers/padmount` |
| switchgear / switchboard supplier Toronto, Canada | `/products/power-distribution` |
| load bank rental / testing Ontario | `/products/load-banks` |
| transformer in stock Toronto | `/inventory` |
| how to size a transformer, transformer kVA calculation | `/blog/how-to-size-a-transformer`, `/resources/kva-calculator` |
| dry type vs oil filled transformer | `/blog/dry-type-vs-liquid-filled-transformers` |
| 600V to 480V transformer | `/blog/600v-to-480v-transformer` |
| switchboard vs switchgear vs panelboard | `/blog/switchboard-vs-switchgear-vs-panelboard` |
| k factor transformer | `/blog/k-factor-transformers-explained` |
| padmount transformer sizes, loop vs radial feed | `/blog/padmount-transformer-guide` |
| transformer lead times Canada | `/blog/transformer-switchgear-lead-times-canada`, `/resources/lead-time-index` |
| CSA C282 generator testing | `/blog/csa-c282-generator-testing-requirements`, `/resources/generator-test-planner` |
| transformer oil testing, DGA, Duval triangle | `/blog/transformer-oil-testing-dga-explained`, `/resources/oil-test-readout` |
| generator load bank testing | `/blog/generator-load-bank-testing` |
| CSA C802 / transformer efficiency Canada | `/blog/transformer-efficiency-regulations-canada` |
| how to read a transformer nameplate | `/blog/how-to-read-a-transformer-nameplate` |

## Who ranks today (web search, October 2026)

- **Dry-type transformers, Canada:** Hammond Power Solutions (Guelph), Rex Power Magnetics and MacKinnon Magnetics (Concord), Electric Power Inc. (Mississauga), WR Transformers and Delta Transformers (Quebec), Siemens Canada; directories (GlobalSpec).
- **Padmount transformers, Ontario:** mostly surplus dealers listed on surplusrecord.com — Transcanada Transformers & Switchgear (Pickering), Delta Wye (Toronto), Lakeport Power, Carroll Transformer.
- **Switchgear, Toronto:** Commercial Switchgear Limited (now RESA Power), ABB Brampton, S&C.
- **Custom switchboards, Canada:** Eaton (Milton), Jet Power & Controls (Edmonton), RIC Power (Burnaby), BCS Switchgear, Schneider Electric.
- **Load bank rental/testing:** Aggreko, Sunbelt Rentals, United Rentals.
- **Informational guides (sizing, dry vs oil, switchboard vs switchgear):** ABB, Omni Calculator, FSG, Mike Holt forums, electricalvolt.com, IAEI Magazine, relectric.com.

Local supplier searches are dominated by surplus marketplaces and large OEMs, so the informational guides and free tools are the fastest route to rankings, with product pages earning links from them.

## Not done in code (needs an account owner)

1. **Google Search Console:** verify `candron.com`, submit `https://candron.com/sitemap.xml`, and watch which queries bring impressions.
2. **Google Business Profile:** claim or create the Toronto listing (category: electrical equipment supplier). This drives the local map results for "near me" and "Toronto" searches.
3. **Bing Webmaster Tools:** import from Search Console.
4. **Links:** list CANDRON on Canadian electrical directories and associations (for example the Electro-Federation Canada member directory, if eligible), and share the free tools with partners.
5. **Publishing rhythm:** one or two new guides a month, plus the quarterly Lead-Time Index.
