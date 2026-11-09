<div align="center">

<img src="public/logo.png" alt="Virginia HomeCraft – Paint, Remodel, Renovate" width="420" />

# Virginia HomeCraft

**A fast, mobile-first, SEO-ready website for a home remodeling & renovation contractor in Arlington, Virginia.**

Kitchen remodeling · Bathroom remodeling · Interior & exterior painting · Flooring · General home improvement

[Live site](https://virginiahomecraft.com) · [Report a bug](../../issues) · [Request a feature](../../issues)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

</div>

---

## About

Virginia HomeCraft is a lead-generation website for a local home improvement company serving **Arlington, VA** and nearby Northern Virginia communities. Its job is simple: help homeowners find the company on Google, trust it quickly, and request a free quote or call.

It is also built as a **reusable client template**: business name, phone, services, areas, reviews, colors, social links and SEO text all live in one file (`src/config/siteConfig.ts`), so the same codebase can be reused for another local contractor.

## Features

- **Conversion-focused layout:** hero, trust stats, services, why-choose-us, featured projects, process, service areas, reviews, FAQ and a strong quote CTA.
- **Dedicated pages:** Services overview, individual service pages (`/services/:slug`), Projects gallery, About, Contact, Privacy, Terms and a custom 404.
- **Quote system:** quote modal and contact form with validation and success/error states.
- **Mobile-first UX:** sticky navbar with slide-in drawer and a persistent bottom **Call Now / Get a Free Quote** bar.
- **Brand logo everywhere:** navbar, mobile drawer, footer, favicon set and Open Graph image.
- **Light scroll animations:** cards slide in from the outer edges toward the center as you scroll (CSS + `IntersectionObserver`, no extra library). Respects `prefers-reduced-motion`.
- **Accessible:** semantic HTML, visible focus states, labelled forms, keyboard-friendly menu.

## Tech stack

| Area | Technology |
| --- | --- |
| UI | React 19 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS 4 |
| Icons | lucide-react |
| Fonts | Manrope (headings), Inter (body) |
| Routing | Lightweight custom router using the History API (`pushState` / `popstate`) |
| SEO | Per-page meta via a `SEO` component + build-time static meta files + JSON-LD |

**Brand colors:** Deep Navy `#142B3A` · Warm Off-White `#F7F4EE` · Burnt Orange `#D96B32`

## Project structure

```
├── public/
│   ├── logo.png / logo.webp      # Site logo
│   ├── favicon.ico, favicon-*.png, apple-touch-icon.png, site.webmanifest
│   ├── og-image.jpg              # 1200×630 social share image
│   └── robots.txt
├── scripts/
│   └── postbuild.mjs             # Writes per-route HTML meta + sitemap.xml into dist/
├── src/
│   ├── components/               # Navbar, Hero, ServicesSection, ReviewsSection, Footer, SEO, QuoteModal...
│   ├── pages/                    # HomePage, ServicesPage, ServiceDetailPage, ProjectsPage, AboutPage, ContactPage...
│   ├── hooks/useScrollReveal.ts  # Scroll animation
│   ├── config/siteConfig.ts      # ★ ONE file for all business content
│   ├── assets/images/            # Project and service photos
│   ├── App.tsx                   # Routing + layout
│   └── index.css                 # Tailwind + animation styles
└── index.html                    # Base meta, favicons, Open Graph
```

## Getting started

Requirements: Node.js 18+ and npm.

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install --legacy-peer-deps   # the current dependency set needs this flag
npm run dev                      # http://localhost:3000
```

Production build:

```bash
npm run build     # vite build + scripts/postbuild.mjs
npm run preview
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, etc.).

## Customizing for a client

Edit **`src/config/siteConfig.ts`**:

- Business name, phone, email, address, hours, license text
- Services, descriptions and images
- Service areas
- Reviews, FAQs, process steps, stats
- Social links (only configured platforms should be shown)
- SEO title, description, keywords, site URL

Replace images in `src/assets/images/`, and the logo/favicons in `public/`.

> **Use real information only.** Replace every placeholder, rating, review count and license claim with genuine data before launch.

## SEO

What is already set up:

- Unique title, description and canonical URL for each page
- Open Graph and Twitter card tags, plus a social share image
- JSON-LD structured data (`HomeAndConstructionBusiness` / `GeneralContractor`, services, breadcrumbs)
- `robots.txt` and an auto-generated `sitemap.xml`
- Build-time static HTML per route (`dist/services/painting/index.html`, etc.) so crawlers and link previews see correct meta without running JavaScript
- Keywords used naturally in headings, URLs, alt text and body copy

Target searches include: *home remodeling Arlington VA*, *kitchen remodeling Arlington VA*, *bathroom remodeling Arlington VA*, *house painting Arlington VA*, *flooring contractor Arlington VA*.

Rating structured data (`aggregateRating`) is **off by default**. Turn it on with `seo.showRatingSchema: true` only if the numbers are real and verifiable. Fake review markup can lead to Google penalties.

### After deployment checklist

1. Set the real domain in `siteConfig.ts` and `scripts/postbuild.mjs`.
2. Verify the site in **Google Search Console** and submit `https://<your-domain>/sitemap.xml`.
3. Request indexing for the homepage and each service page.
4. Create and fully complete a **Google Business Profile**. For local search this usually matters as much as the website. Keep the name, address and phone identical to the site.
5. Collect genuine Google reviews and link to them from the site.
6. Check pages with Lighthouse / PageSpeed Insights and validate structured data with Google's Rich Results Test.
7. Add Google Analytics 4 if you want to track calls and quote requests.

### Note on rendering

This is a client-side rendered React app. Google can generally render JavaScript, but server-rendered or pre-rendered pages are usually more reliable for SEO. If search performance matters a lot, consider moving to a framework with server rendering (for example Next.js) or adding full prerendering.

## Roadmap

- [ ] Connect the quote form to an email/CRM service
- [ ] Blog / resources section for local search topics
- [ ] Full static prerendering of page content
- [ ] Analytics and call-click tracking

## Repository tips (GitHub discoverability)

- **Description:** `Responsive, SEO-optimized website for a home remodeling & renovation company in Arlington, VA (React, Vite, Tailwind CSS)`
- **Website:** add the live URL
- **Topics:** `react` `vite` `typescript` `tailwindcss` `local-seo` `home-improvement` `remodeling` `contractor-website` `arlington-virginia` `website-template`
- **Social preview:** upload `public/og-image.jpg` under Settings → Social preview

## License

Add a license file (for example MIT) if you plan to share or reuse this code. Brand name, logo and photos remain the property of Virginia HomeCraft.

---

<div align="center">Built for homeowners in Arlington, VA · Paint · Remodel · Renovate</div>
