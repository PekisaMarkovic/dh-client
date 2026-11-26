# dh-client

This is the public **website of a shop** that uses DH, built with Next.js (App Router). One deployment is one shop's site. It shows the shop's story, its drinks menu and its contact details, and if the shop has turned it on, visitors can order drinks for delivery.

Nothing about any particular shop lives in this code. All texts, pictures, contact details, drinks and SEO data come from the API in `dh-api`, and the shop's admin edits them in the dashboard. SEO is a priority throughout.

- Runs at `http://localhost:4350` (the API allows this address through `APP_CLIENT`)
- Next.js 16 with **Cache Components**, React 19, Tailwind 4, TypeScript
- Content is in Serbian, and the interface texts also exist in English (`translations/`)

## Getting started

You'll need Node 20 or newer, pnpm and the API running locally (`http://localhost:4200`) with a site set up for your company (a row in its `clients` table, see `create_client.py` in the API's README).

```bash
cp .env.example .env.local     # fill in ACCESS_KEY and REVALIDATE_SECRET, see below
pnpm install
pnpm dev
```

| Command                        | What it does                                            |
| ------------------------------ | ------------------------------------------------------- |
| `pnpm dev`                     | Starts the dev server on port 4350.                     |
| `pnpm build` then `pnpm start` | Production build and run (also on port 4350).           |
| `pnpm lint`                    | ESLint.                                                 |
| `pnpm format`                  | Prettier (150 characters per line, like the dashboard). |

If the API isn't running, every page falls back to the neutral "coming soon" page, and the dev server logs a few warnings from Next about it. Start the API and they go away.

## Environment variables

| Variable               | What it's for                                                                                                                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | The public address of the site (`https://www.drinkhouse.rs`). Used for canonical addresses, the sitemap, `robots.txt` and Open Graph.                                                                                       |
| `API_URL`              | The address of the API, `http://localhost:4200/api`. **Server only**, it never reaches the browser.                                                                                                                         |
| `ACCESS_KEY`           | The site's id (a GUID), the `client_id` from the API's `clients` table. It tells the API which shop this is. **Server only.**                                                                                               |
| `REVALIDATE_SECRET`    | A secret shared with the API (use the same value in `dh-api`). After a change in the dashboard, the API calls `/api/revalidate` with it so the change shows immediately. Without it, changes show up within a minute or so. |
| `IMAGE_HOSTS`          | Extra hosts the pictures are served from, comma separated, for example `images.drinkhouse.rs`. `*.r2.dev` is always allowed. `next/image` refuses any other host, so add the bucket's own domain here.                      |
| `SHOW_DRAFT`           | `true` shows the site even while it's still a draft, which is handy while you build it. **Leave it `false` (or unset) in production.**                                                                                      |

`NEXT_PUBLIC_SITE_URL` and `IMAGE_HOSTS` are read when the site is built, so redeploy after you change them.

## Pages

| Address                             | What's there                                                                                                                                                                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`                                 | The landing page: hero, story, recommended drinks, promo, contact details with a map, and the contact form.                                                                                |
| `/karta-pica`                       | The drinks menu, laid out like a shop: categories in a sidebar, a search box, the number of drinks per page (10 to 50, 20 by default) and a grid of drinks.                                |
| `/karta-pica/<category>`            | One category, for example `/karta-pica/vino`. Every category is its own page for Google, with its own title and canonical address.                                                         |
| `?pretraga=...&page=N&perPage=N`    | Search, page and page size work on both menu addresses. Searches and non-default page sizes are `noindex`, so Google only indexes the real pages. A page past the last one is "not found". |
| `/api/contact`, `/api/order` (POST) | Receive the contact form and the order from the browser and pass them on to the API with the `ACCESS_KEY`.                                                                                 |
| `/api/revalidate` (POST)            | Called by the API to drop the cache. Needs `REVALIDATE_SECRET`.                                                                                                                            |
| `/robots.txt`, `/sitemap.xml`       | Built from the site's data. The sitemap lists the home page, every page of the menu and every category.                                                                                    |

## How it works

### Content comes from the API

`services/site-service.ts` reads `GET /public/site` and `services/drink-service.ts` reads `GET /public/drinks` and `GET /public/drinks/categories`, all with the `X-Access-Key` header. A section whose text isn't filled in is simply not shown. The translation files only hold the interface texts ("Na stanju", "Dodaj u korpu", the pagination labels and so on).

These functions are cached with `use cache` (`cacheLife("minutes")`, tags `site` and `drinks`), so the API isn't asked on every visit. Changes from the dashboard still show at once, because the API calls `/api/revalidate`, which drops the tags. The functions **never throw**, since an error inside a cached function would break `next build` whenever the API is down. A failed answer is cached for just a few seconds, and the site falls back to a neutral "coming soon" page.

### Draft and published

A site is a **draft** until its admin publishes it, and the API only allows publishing once everything is filled in. While it's a draft, every address shows just **"Sajt je u izradi"**, the pages are `noindex`, `robots.txt` blocks everything and the sitemap is empty (see `components/layout/Maintenance.tsx`, `SiteShell.tsx` and `isMaintenance` in `lib/site.ts`). Set `SHOW_DRAFT=true` in `.env.local` to see the draft while you work on it. After publishing, the site switches within a minute, or immediately with `REVALIDATE_SECRET` set.

### The drinks menu

The menu lives in `modules/drinks-menu/`. `menu-state.ts` is the single place that reads and builds the menu's addresses (category, search, page and page size), and `menu-metadata.ts` builds the title, canonical address and `noindex` from them. On a wide screen the categories sit in a sticky sidebar, and on a phone they become a row of chips you can swipe sideways. Every category is a plain link to its own page, so the menu works without JavaScript too.

Search starts by itself 400 ms after you stop typing (`components/drinks/DrinkSearch.tsx`), stays inside the current category and keeps the page size. It's still a normal form underneath, so Enter works and it works without JavaScript.

While a new page of drinks loads, the grid shows grey placeholder cards in the same layout, so nothing jumps around.

### Ordering

Ordering is off unless the shop has it turned on (`isOrderingAllowed` from `GET /public/site`, which for now is switched on in the API's database). When it's off, none of the following is shown.

- Every drink card gets a cart button, and hovering a card shows a big "Dodaj u korpu" over its picture.
- The header gets a **Dostava** button with a little van that drives along, plus the number of drinks in the cart. It opens the cart.
- The cart is a **side panel** (`components/cart/CartDrawer.tsx`) in two steps. First the drinks: change quantities, remove drinks, see the total. Then the buyer's details: full name, email, phone, delivery address and the delivery day. After sending, it shows the order number and empties the cart.
- **The delivery day** can be today if it's before 15:00 (Serbian time), otherwise from tomorrow, and at most a month ahead. The date picker only allows those days. The rules live in `lib/pickup-date.ts` and are an exact copy of the API's, which checks them again.
- The cart is kept in the browser's `localStorage` (`providers/cart-store.ts`, read with `useSyncExternalStore`), so it survives a reload and stays in sync between tabs. It lives in `CartProvider`, which `SiteShell` puts on every page.
- The order goes to `/api/order` on this site, which validates it and passes it to the API with the `ACCESS_KEY`. Only drink ids and quantities are sent. The API takes names and prices from its own database and emails both the shop and the buyer.

### SEO

Everything search engines read comes from the API (the SEO tab and the general info in the dashboard), and `lib/seo.ts` puts it together:

- a title, description and canonical address for every page, including every page and category of the menu ("Karta pića: Vino (Strana 2)"),
- Open Graph and Twitter cards with the sharing picture,
- the **favicon is the site's logo** (`public/favicon.ico` is only a placeholder until a logo is uploaded),
- JSON-LD: a `LiquorStore` (name, address, phone, logo, Instagram) on the home page and an `ItemList` of `Product`s with prices and availability on the menu pages,
- `robots.txt` and `sitemap.xml`, `lang="sr-Latn"`, one `h1` per page, real links for pagination and categories, and pictures through `next/image` (lazy loading, sizes, alt text from the dashboard).

The site's own address (`NEXT_PUBLIC_SITE_URL`) is the only SEO value that isn't in the database. Set it to the real domain in production.

### The contact form

`ContactForm` (react-hook-form with yup, using the same rules as the API) posts to `/api/contact` on **this** site through the browser's axios instance (`lib/browser-api.ts`). The route handler validates the data and calls the API with the `ACCESS_KEY`, so the key never reaches the browser. The API saves the message, the admin reads it in the dashboard (the "Poruke" tab), and it allows 5 messages a minute from one address. After sending, a window confirms that the message went out.

### Libraries and shared components

axios, TanStack Query (`providers/Providers.tsx`; the forms use mutations), react-hook-form with yup, react-modal, react-toastify, i18next and react-i18next. `components/core` has the shared building blocks, in the same spirit as the dashboard: `MainButton`, `MainLink`, `InputText`, `InputTextarea`, `Heading`, `Paragraph`, `Pagination` and `PageSize` (real links), `Modal`, toasts, `EmptyComponent` and `SectionTitle`. Icons are in `src/icons`, one per file. API errors are shown with the real reason (`lib/api-error.ts`, `useErrorToast`): no connection, a timeout, or what the API answered.

### Languages

The texts are in `translations/sr` (the default) and `translations/en`, one file per area (`general`, `home`, `drinks`, `cart`, `contact`, `errors`). Server components use `t("ns:key")` from `translations/translate.ts`, and client components use `useTranslation`. The content from the database is in whatever language the admin writes it in, and the site has no language switch yet.

## Project structure

```
src/
  app/            routes only: /, /karta-pica, /karta-pica/[kategorija], the API route handlers
                  (contact, order, revalidate), robots, sitemap, layout
  modules/        what each page is made of: home/, drinks-menu/ (the menu, its address and metadata)
  components/
    core/         buttons, inputs, typography, pagination, modal, toast, SiteImage
    home/         the sections of the landing page
    layout/       Header (sticky), Footer, SiteShell, Maintenance
    drinks/       DrinkCard, DrinkImage, DrinksGrid, CategoryFilter, DrinkSearch, skeletons
    cart/         the cart: side panel, its steps, the Dostava button, add-to-cart buttons
  icons/          one icon per file
  api/            the addresses of the API endpoints
  services/       requests to the API (server side and cached), plus the browser's contact and order requests
  lib/            axios instances, site helpers, seo.ts (metadata and JSON-LD), api-error, pickup-date
  providers/      the query client, toasts, i18n, and the cart (context and store)
  hooks/          useErrorToast, useCart
  interfaces/     the types of what the API returns
  translations/   sr and en
  utils/          small helpers (price formatting)
  validations/    yup rules for the contact form and the order
```

Each file holds one component. The files in `app/` stay thin and hand off to `modules/`, the same way `pages/` and `modules/` work in the dashboard.

## Good to know

- **Server-only values.** `API_URL` and `ACCESS_KEY` deliberately have no `NEXT_PUBLIC_` prefix, and `lib/api.ts` imports `server-only`. The browser only talks to this site (`/api/...`), and this site talks to the API.
- **Don't build next to a running dev server.** `next dev` and `next build` both use `.next`, and a build in the same folder makes the dev server reload your browser over and over. Build in a copy of the project instead, and don't kill `next-server` processes by name while someone is developing.
- **Keep the `RuntimeMarker` in `app/layout.tsx`.** The menu's title and canonical address depend on the address (runtime data), and with Cache Components `next build` fails unless there's a `connection()` marker in the root layout.
- **Dynamic Tailwind classes.** Write classes out in full. A class built from a variable isn't generated (this is why `DrinksTeaser` maps column counts to full class names).
- **The Next.js icon** in the bottom left corner is the dev indicator. It only appears in `pnpm dev` (turn it off with `devIndicators: false` in `next.config.ts` if it bothers you).
- **Before you push**, run `npx tsc --noEmit`, `pnpm lint` and a `next build` (in a copy, see above). There are no tests in this repo, the API has them.
