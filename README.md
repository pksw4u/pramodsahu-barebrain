# pramodsahu.dev

Personal portfolio of **Pramod Sahu** — AI Automation Specialist.

A small, fast, static site built with Astro. It is intentionally text-first: no
CMS, no database, no client-side framework, and no build-time content pulled from
an API. Every page is plain HTML with a single stylesheet, self-hosted fonts and
three small inlined scripts (theme pre-paint, theme toggle, mobile menu). There is
no external JavaScript file at all.

---

## Tech Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | [Astro 7](https://astro.build) | Ships zero JS by default, MDX, content collections, per-page islands |
| Language | TypeScript (strict) | `astro check` validates templates, content schemas and helpers |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) | CSS-first config via `@theme` in `src/styles/global.css`, no JS config file |
| Content | MDX + [Content Layer](https://docs.astro.build/en/guides/content-collections/) | Each case study is a versioned `.mdx` file with a validated schema |
| Fonts | [`@fontsource-variable/geist`](https://fontsource.org) + Geist Mono | Self-hosted, no third-party font requests, `font-display: swap` |
| SEO | `@astrojs/sitemap` + hand-written metadata in `src/layouts/Base.astro` | Canonical URLs, Open Graph, Twitter card, JSON-LD `Person` |
| Hosting | Cloudflare Pages | Free static hosting, Git-based deploys, global CDN |

There is no React/Vue/Svelte component in the project, no form backend, no
analytics and no cookies. The only client-side JavaScript is inlined into the
HTML (see [Scripts](#scripts)).

---

## Project Structure

```
.
├── public/                     # Copied verbatim to the site root
│   ├── _headers                # Cloudflare Pages headers + asset caching
│   ├── apple-touch-icon.png
│   ├── avatar.svg              # Profile image (monogram fallback — swap freely)
│   ├── favicon.svg
│   ├── og.png                  # 1200x630 social preview image
│   ├── robots.txt              # Points at sitemap-index.xml
│   └── site.webmanifest
├── src/
│   ├── components/             # Astro components (header, footer, theme toggle, …)
│   ├── content/projects/       # 15 MDX case studies
│   ├── layouts/Base.astro      # <head>, theme pre-paint script, skip link
│   ├── lib/projects.ts         # Ordering, labels, list-item mapping
│   ├── pages/
│   │   ├── index.astro         # Home
│   │   ├── work/index.astro    # All work, grouped by kind
│   │   ├── work/[slug].astro   # Case study route (generated from MDX)
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── writing.astro       # Gateway to BareBrain + DEV
│   │   └── 404.astro
│   ├── consts.ts               # Site identity, nav, socials, publications
│   ├── content.config.ts       # Project collection schema
│   └── styles/global.css       # Design tokens, Tailwind theme, prose styles
└── astro.config.ts
```

Routes: `/`, `/work`, `/work/<slug>` (15), `/about`, `/writing`, `/contact`, `404`.

---

## Development

Requires Node.js 22.23.4 or newer. The version is pinned by the committed `.node-version`
file, which Cloudflare Pages also reads.

```bash
npm install       # install dependencies
npm run dev       # dev server on http://localhost:4321
npm run check     # astro check — type-check templates, content and helpers
npm run build     # static build into ./dist
npm run preview   # serve the production build locally
```

`npm run build` emits a fully static site to `dist/`. The build is the exact
artifact Cloudflare Pages serves, so `npm run preview` is a faithful local
preview of production.

### Scripts

Only three inline scripts exist, all dependency-free and minified into the HTML
(the page also carries one `application/ld+json` block for JSON-LD):

- **Theme pre-paint** (`src/layouts/Base.astro`) — reads `localStorage`, then sets
  `data-theme="dark|light"` on `<html>` before first paint so there is no flash of
  the wrong theme. Dark is the default; the stored choice wins if there is one.
- **Header** (`src/components/SiteHeader.astro`) — mobile menu open/close,
  `Escape` to dismiss, link click to close.
- **Theme toggle** (`src/components/ThemeToggle.astro`) — switches and persists
  the theme.

---

## Content

**All content lives in the repository. There is no CMS and no runtime API.**

| What | Where |
| --- | --- |
| Name, role, location, email, social links, nav | `src/consts.ts` |
| Project/case-study content | `src/content/projects/<slug>.mdx` |
| Project schema (title, kind, order, date, year, category, client, stack, links) | `src/content.config.ts` |
| Home page `Stack` section categories | `src/consts.ts` (`STACK`) |
| Home page copy and featured projects | `src/pages/index.astro` |
| About page copy | `src/pages/about.astro` |
| Contact page copy | `src/pages/contact.astro` |
| Writing gateway copy | `src/pages/writing.astro` |
| Colours, type scale, spacing, prose styles | `src/styles/global.css` |

### Adding a case study

1. Create `src/content/projects/<slug>.mdx` with frontmatter:

   ```mdx
   ---
   title: Project Name
   summary: One line, used in the work index and the home page.
   kind: client              # open-source | experiment | client
   order: 10                 # lower sorts first
   featured: false           # optional, shows on the home page
   date: "2026-09-27"        # optional, ISO — public repos only
   year: 2026                # optional
   category: Agent Infrastructure
   client: Client Name       # optional
   role: What you did        # optional
   status: Completed         # optional
   stack:
     - Python
     - LangGraph
   links:
     - label: Repository
       href: https://github.com/…
   ---

   ## Problem

   What was actually broken.
   ```

   The schema in `src/content.config.ts` validates every field, so `npm run check`
   fails on a typo or a missing required key rather than shipping a broken page.

2. Set `order` (lower comes first). Ordering and grouping are handled by
   `src/lib/projects.ts`; the file name becomes the URL.
3. Run `npm run check`, then `npm run build`. The route is generated
   automatically and added to the sitemap.

### Content rules

- Only document work that actually exists, with the client and stack names you
  really used.
- Never invent metrics, percentages, revenue, user counts or timelines. If a
  number is not measured, do not write it. Client systems are described as
  architecture, not as results you cannot evidence.
- Leave `year` empty when it is unknown rather than guessing. Prefer `date` (exact,
  ISO) over `year` for anything with a public repository. Client work has no public
  repo, so it gets no date at all — the list falls back to the kind instead.
- Writing links point at BareBrain and DEV. Do not add article titles that do
  not exist yet.

### Design tokens

Everything visual is defined in `src/styles/global.css` via Tailwind's
`@theme`, so there is one place to change the design:

```css
--color-bg / --color-bg-subtle / --color-fg / --color-fg-muted
--color-line / --color-accent
--font-sans / --font-mono
--text-display / --text-title / --text-lead / --text-eyebrow
--shell / --prose
```

The site is a narrow, single-column reading surface — `--shell` is `48rem`
(768px including its padding), centred with generous empty margins on large
screens. Dark is the default (`#1f2635`); light (`#fbfaf8`) is opt-in via the
`data-theme` attribute on `<html>`, and the stored choice wins on first paint
because an inline script in `Base.astro` sets the attribute before render.

Geist Mono carries the interface (headings, navigation, metadata) and Geist Sans
carries long-form prose, so case studies read as documents rather than marketing
copy. Rules and hairlines separate content instead of cards or boxes. There are
no gradients, no glassmorphism, and no decorative motion; colour and small
transforms are the only transitions, and everything is disabled under
`prefers-reduced-motion: reduce`.

The profile image is `public/avatar.svg`, currently a typographic monogram
fallback. Replace that single file with a square photo to swap it site-wide —
nothing else needs changing.

---

## Security

There are no secrets in this repository and the site makes no runtime API calls.

- `.gitignore` excludes `.env`, `.env.*`, key and certificate files (`*.pem`,
  `*.key`, `*.p12`), `.npmrc`, `.netrc`, and `wrangler.*` / `.dev.vars`, so local
  credentials cannot be committed by accident. `!.env.example` is allowed so a
  template can be shared.
- `package-lock.json` **is** committed. It pins exact dependency versions and
  contains no credentials.
- The contact email is intentionally public in `src/consts.ts` — it is the
  published contact address, not a secret.
- No analytics, cookies, trackers, forms or third-party embeds. Fonts are
  self-hosted, so there are no external font requests.
- The only outbound links are to GitHub, LinkedIn, X, DEV, BareBrain, mailto, and
  public project repositories.

If you ever add a secret, put it in `.env`, reference it via
`import.meta.env`, and confirm with `git status` that it is not staged before
committing.

---

## SEO

- `site` is set in `astro.config.ts` from `SITE.url` in `src/consts.ts`.
  **Change it there** when the domain changes, and update
  `public/robots.txt` to match.
- Each page sets its own `<title>`, description, canonical URL, Open Graph and
  Twitter card; the default OG image is `public/og.png`.
- `Base.astro` emits JSON-LD `Person` for `SITE.url`.
- `@astrojs/sitemap` generates `sitemap-index.xml` at build time. The 404 page
  is `noindex`.

---

## Deployment

Deployed to **Cloudflare Pages** from GitHub. No build command configuration
beyond the defaults is required.

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `24` (pinned by the committed `.node-version` file) |
| Install command | `npm ci` |

Steps:

1. Push this directory to a GitHub repository.
2. In Cloudflare, **Workers & Pages → Create → Pages → Connect to Git**, and
   select the repository.
3. Accept the detected Astro settings above and deploy. The `.node-version`
   file pins Node, so the build environment needs no extra configuration.
4. Add the custom domain under **Pages → <project> → Custom domains**.
   Cloudflare provisions TLS automatically.
5. Update `SITE.url` in `src/consts.ts` and `public/robots.txt` to the final
   domain, then redeploy so canonical URLs and the sitemap are correct.

`public/_headers` configures response headers without touching the dashboard:
hashed `/_astro/*` assets are cached for a year and immutable, and security
headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`,
`X-Frame-Options`) are set site-wide.

### Before publishing

- [ ] `npm run check` → 0 errors
- [ ] `npm run build` → completes, `dist/` generated
- [ ] `SITE.url` and `public/robots.txt` use the final domain
- [ ] `public/og.png` regenerated if the name/tagline changed
- [ ] Every project, social and writing link resolves

---

## Contributing

This is a personal portfolio, so changes are usually content edits rather than
feature work. The workflow:

1. Branch from `main`.
2. Edit `src/content/projects/*.mdx` or `src/consts.ts`.
3. `npm run check` — must be 0 errors.
4. `npm run build` — must complete.
5. Open a pull request; Cloudflare Pages deploys on merge.

Before pushing, `git status` should show only files you intended to change —
`node_modules/`, `dist/` and `.astro/` should never appear.

