# dh-client

The public **white label website** of a company of DH, a Next.js (App Router) app. One deployment is one site. It shows the drinks menu and the content of the company, everything comes from the `dh-api`: texts, pictures, contact data, SEO. SEO is a priority.

- Site: `http://localhost:4350` (the API allows this address in CORS, see `APP_CLIENT` in `dh-api`)
- Next.js 16 with **Cache Components**, React 19, Tailwind 4, TypeScript
- Language: Serbian, the texts of the interface are also in English (`translations/`)

## Quick start

You need Node 20+, pnpm and a running `dh-api` (`http://localhost:4200`) with a site (a row in its `clients` table).

```bash
cp .env.example .env.local     # fill in ACCESS_KEY and REVALIDATE_SECRET, see below
pnpm install
pnpm dev
```

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server on port 4350. |
| `pnpm build` then `pnpm start` | Production build and run (also on port 4350). |
| `pnpm lint` | ESLint. |

## Environment variables

| Variable | What it is |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The public address of the site (`https://drinkhouse.rs`). Used for canonical addresses, the sitemap, `robots.txt` and Open Graph. |
| `API_URL` | Address of the API, `http://localhost:4200/api`. **Server only**, it never reaches the browser. |
| `ACCESS_KEY` | The id (GUID) of this site, the `client_id` in the `clients` table of the API. It tells the API which company this site is. **Server only.** |
| `REVALIDATE_SECRET` | Shared secret with the API (the same value as in `dh-api`). After a change in the dashboard the API calls `/api/revalidate` with it, so the change shows at once. Without it a change shows within a minute. |
| `IMAGE_HOSTS` | Extra hosts the pictures come from, separated by a comma (`*.r2.dev` is always allowed). Add your own domain of the bucket here. |
| `SHOW_DRAFT` | `true`: show the site even while it is a draft. For developing, **leave it `false` (or unset) in production**. |

## Pages

| Address | What |
| --- | --- |
| `/` | Landing: hero, story, recommended drinks, promo, contact (with a map) and the contact form. |
| `/karta-pica?page=N` | The drinks menu, 10 per page. Every page is a real link with its own title and canonical address, so Google indexes them one by one. A page past the last one is "not found". |
| `/api/contact` (POST) | Receives the contact form and sends it to the API with the `ACCESS_KEY`. |
| `/api/revalidate` (POST) | Called by the API, drops the cache. Needs `REVALIDATE_SECRET`. |
| `/robots.txt`, `/sitemap.xml` | Made from the data of the site: the sitemap has the home page and every page of the menu. |

## How it works

### The content comes from the API

`services/site-service.ts` reads `GET /public/site` (header `X-Access-Key`) and `services/drink-service.ts` reads `GET /public/drinks`. The admin of the company edits all of it in the dashboard (the page "Web sajt"). **There is nothing of any company in the code:** a section whose text is not filled in is simply not shown, the translations only hold the texts of the interface ("Na stanju", "Kontaktirajte nas", the labels of the pagination...).

Both functions are cached with `use cache` (`cacheLife("minutes")`, tags `site` and `drinks`), so the API is not asked on every visit. A change in the dashboard shows at once: the API calls `/api/revalidate`, which drops the tags. **They never throw** (an error inside a cached function would fail `next build` when the API is down): a failed answer is cached for a few seconds only, and the site falls back to a neutral "coming soon" page.

### Draft and published

A site is a **draft** until its admin publishes it (the API only allows that when everything is filled in). While it is a draft, every address shows only **"Sajt je u izradi"**, the pages are `noindex`, `robots.txt` forbids everything and the sitemap is empty (`components/layout/Maintenance.tsx`, `SiteShell.tsx`, `isMaintenance` in `lib/site.ts`). `SHOW_DRAFT=true` in `.env.local` shows the draft site for developing. After a publish the site changes within a minute, or at once with `REVALIDATE_SECRET` set.

### SEO

Everything Google reads comes from the API (the SEO tab and the general info), `lib/seo.ts` builds it:

- title, description and canonical address of every page, and every page of the menu has its own ("Karta pića (Strana 2)"),
- Open Graph and Twitter cards with the sharing picture,
- the **favicon is the logo** of the site (a default `public/favicon.ico` until a logo is uploaded),
- JSON-LD: a `LiquorStore` (name, address, phone, logo, Instagram) on the home page and an `ItemList` of `Product`s with prices and availability on every page of the menu,
- `robots.txt` and `sitemap.xml`, `lang="sr-Latn"`, one `h1` per page, real links for the pagination, pictures with `next/image` (lazy loading, sizes, alt text from the dashboard).

The address of the site (`NEXT_PUBLIC_SITE_URL`) is the only SEO value that is not in the database, set it to the real domain in production.

### The contact form

`ContactForm` (react-hook-form and yup, the same rules as the API) posts to `/api/contact` of **this** site with the axios instance of the browser (`lib/browser-api.ts`). The route handler checks the data and calls the API with the `ACCESS_KEY`, so the key never reaches the browser. The messages are saved by the API and the admin reads them in the dashboard (tab "Poruke"). The API allows 5 messages a minute from one address. After sending, a window says it was sent.

### Libraries and shared components

axios, TanStack Query (`providers/Providers.tsx`, the form uses a mutation), react-hook-form with yup, react-modal, react-toastify, i18next and react-i18next. `components/core` has the shared pieces with the same idea as in the dashboard: `MainButton`, `MainLink`, `InputText`, `InputTextarea`, `Heading`, `Paragraph`, `Pagination` (real links), `Modal`, toast, `EmptyComponent`, `SectionTitle`. Errors of the API are shown with the real reason (`lib/api-error.ts`, `useErrorToast`): no connection, timeout or the answer of the API.

### Languages

`translations/sr` (default) and `translations/en`, one file per area (`general`, `home`, `drinks`, `contact`, `errors`). Server components use `t("ns:key")` from `translations/translate.ts`, client components use `useTranslation`. The texts from the database are in one language (the one the admin writes), the site has no language switch yet.

## Project structure

```
src/
  app/            pages (/, /karta-pica), route handlers (api/contact, api/revalidate), robots, sitemap, layout
  api/            the addresses of the API endpoints
  services/       the requests to the API (server only, cached), the contact request of the browser
  lib/            axios instances, site helpers, seo.ts (metadata and JSON-LD), api-error
  components/
    core/         buttons, inputs, typography, pagination, modal, toast, icons, SiteImage
    home/         the sections of the landing page
    layout/       Header, Footer, SiteShell, Maintenance
    drinks/       DrinkCard, DrinkImage, DrinksGrid
  providers/      query client, toasts, i18n
  hooks/          useErrorToast
  interfaces/     the types of what the API returns
  translations/   sr and en
  utils/          small helpers (price format)
  validations/    yup rules of the contact form
```

## Good to know

- **Server only values.** `API_URL` and `ACCESS_KEY` have no `NEXT_PUBLIC_` prefix on purpose, `lib/api.ts` imports `server-only`. The browser talks to this site (`/api/...`), this site talks to the API.
- **Do not kill `next-server` by name** while a dev server is running, and do not run `next build` next to `next dev` in the same folder to test: use a copy of the project. Both use `.next`.
- **`connection()` marker in `app/layout.tsx`.** The title and the canonical address of the menu pages depend on `?page=` (runtime data). With Cache Components `next build` fails for such a page unless a `connection()` marker is in the root layout. Do not remove it.
- **Dynamic classes in Tailwind 4**: write the classes out in full, a class built from a variable is not generated.
- **The Next.js icon** in the bottom left corner is the dev indicator, it exists only in `pnpm dev` (it can be turned off with `devIndicators: false` in `next.config.ts`).
- **Check before you push**: `npx tsc --noEmit`, `pnpm lint` and a `next build` (in a copy, see above). There are no tests here, the API has them.
