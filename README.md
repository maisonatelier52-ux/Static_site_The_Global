# The Global Dispatch

A responsive editorial news site built with standard Next.js App Router, React JSX, and Tailwind CSS. The design follows the supplied newspaper reference while using the useful article structure and interaction patterns from the supplied OS-Intel project.

## Included

- JavaScript and JSX source only — no TSX application files
- Next.js App Router with `next dev`, a Webpack production build, and `next start`
- Tailwind CSS 4 through PostCSS, plus the publication's custom editorial CSS
- A dense home page with exactly 46 image-led cards
- Distinct home, category, author, about, article, and 404 layouts
- 10 categories, 48 demonstration stories, and 6 fictional authors
- A 1,000+ word court feature with a hero image and a second article image
- Table of contents, summary, key takeaways, pull quote, author profile, related stories, latest news, social links, and newsletter panels
- Live client-side search, mobile navigation, copy/share controls, and newsletter validation
- Responsive desktop, tablet, and mobile layouts
- Canonical metadata, NewsArticle JSON-LD, sitemap, robots, and `llms.txt`

All names, headlines, and reporting scenarios are demonstration content. Replace them with verified newsroom material before publishing.

## Run locally

Use Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The scripts work in Windows Command Prompt, PowerShell, macOS, and Linux because they do not use shell-specific environment-variable syntax.

Production check:

```bash
npm test
npm start
```

`npm test` runs ESLint, creates a production Next.js build, and verifies the project structure and editorial dataset.

## Change the domain, brand, and social profiles

Copy `.env.example` to `.env.local`, update the values, and restart the development server.

- Publication and social defaults: `lib/site.js`
- Authors and dummy articles: `data/news.js`
- Long court feature: the first article in `data/news.js`
- Global styling and responsive rules: `app/globals.css`
- Tailwind/PostCSS setup: `postcss.config.mjs`

The search index is generated from the article data. The newsletter form validates locally and shows success feedback; connect `components/Newsletter.jsx` to your email provider before collecting real subscriptions.

## Project structure

```text
app/
  [category]/
  author/[slug]/
  about/
  layout.jsx
  page.jsx
  globals.css
components/
data/news.js
lib/site.js
public/
jsconfig.json
next.config.mjs
postcss.config.mjs
```
