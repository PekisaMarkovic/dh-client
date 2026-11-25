# dh-client

Public Next.js (App Router) site for DH. SEO is a priority: server-rendered pages, `metadata` per route, `robots.ts`, `sitemap.ts`.

## Run

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the production URL (used for canonical, sitemap and robots).
