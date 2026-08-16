# Abel Adisu — personal site

Premium multi-route site for Abel Adisu: Java/Spring, React, cloud, and n8n automation.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Edit content, not components

All copy lives in `src/content/`.

| File | What to change |
|---|---|
| `src/content/profile.ts` | Name, headline, email, GitHub / LinkedIn / Upwork URLs |
| `src/content/experience.ts` | Replace `COMPANY_NAME` and `PERIOD` |
| `src/content/projects.ts` | Real project names, repos, outcomes |
| `src/content/services.ts` | Service copy |
| `.env` | `VITE_SITE_URL`, `VITE_GITHUB_USERNAME`, `VITE_CONTACT_ENDPOINT` |

Do not invent reviews, earnings, or metrics. Leave placeholders until you have the real values.

## Design

Tokens and rationale: `design-system/abel-adisu/MASTER.md`.
