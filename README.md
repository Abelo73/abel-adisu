# Abel Adisu

Personal site for a software engineer in production at Atlas Computer Technology — Java, Spring Boot, React, and the path from a single UI to a running system.

**GitHub repo to create:** [`Abelo73/abel-adisu`](https://github.com/Abelo73/abel-adisu)

Not a template portfolio. The work on `/projects` is real: arts admin in production, tax risk UI, hospital operations, justice case management, workforce ops. Upwork is Top Rated with 100% Job Success — no rates, no invented metrics.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router 7 · Motion

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

```bash
npm run build
npm run preview
```

## Configure

Copy `.env.example` to `.env`:

| Variable | Purpose |
|---|---|
| `VITE_SITE_URL` | Public origin for Open Graph and JSON-LD. Use `http://localhost:5173` in dev. After Vercel, set it to the live URL. |
| `VITE_GITHUB_USERNAME` | `Abelo73` — enables the public repo list. |
| `VITE_CONTACT_ENDPOINT` | POST URL for the contact form. Leave empty and the form will not actually deliver mail. |

Content lives in `src/content/`. Change copy there, not in page components.

| File | What it is |
|---|---|
| `profile.ts` | Name, role, Atlas, photo, CV, socials |
| `experience.ts` | Atlas engineer / QA, Upwork |
| `projects.ts` | Shipped work |
| `services.ts` | Engagements you can hire |
| `userStories.ts` | Roles and real Upwork quotes |
| `aboutStory.ts` | About page |

## Deploy on Vercel

1. Create the GitHub repo **`abel-adisu`** (public) under `Abelo73`.
2. Push this branch (see below).
3. In Vercel: **Add New → Project → import `abel-adisu`**. Framework: Vite. Output: `dist`.
4. Set `VITE_SITE_URL` to the Vercel URL (or your domain), then redeploy.

SPA fallback is in `vercel.json` so `/projects/…` and `/services/…` do not 404 on refresh.

## Push after you create the repo

```bash
git remote add origin https://github.com/Abelo73/abel-adisu.git
git push -u origin homepage-tighten:main
```

Then in GitHub: Settings → General → Default branch → `main`.

## Routes

`/` · `/about` · `/experience` · `/projects` · `/services` · `/automation` · `/upwork` · `/contact`

## License

Private practice site. All rights reserved.
