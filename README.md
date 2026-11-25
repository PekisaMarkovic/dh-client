# dh-client

Public Next.js (App Router) site for DH. SEO is a priority: server-rendered pages, `metadata` per route, `robots.ts`, `sitemap.ts`.

## Run

```bash
pnpm install
pnpm dev
```

Runs on http://localhost:4350 (the api allows this origin in CORS, see `APP_CLIENT`).

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the production URL (used for canonical, sitemap and robots).

## Structure

- `src/app/` pages: `/` (landing), `/karta-pica?page=N` (the drinks menu, 10 per page, every page is a real link for Google)
- `src/components/core/` the shared components (buttons, inputs, typography, pagination, modal, toast, empty), the same idea as in the dashboard
- `src/components/home/`, `layout/`, `drinks/` the parts of the pages
- `src/api/` the addresses of the api, `src/services/` the requests (server only, cached with `use cache`), `src/lib/api.ts` the axios instance (adds the `X-Access-Key` header)
- `src/translations/` the texts (`sr` is the default, `en` too), server components use `t("ns:key")`, client components `useTranslation`
- `src/validations/` yup schemas for react-hook-form

The api address and `ACCESS_KEY` are used on the server only. The api route is `GET /public/drinks` (no login, the client is found by the key).
