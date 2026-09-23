# CalcHub Professional

A clean, responsive calculator website built with Next.js 15, React 19, TypeScript and CSS.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

Push this project to GitHub and import the repository into Vercel.

Before production, replace the placeholder domain in:
- `app/sitemap.ts`
- `app/robots.ts`

Then add your AdSense code only after the site is ready and your publisher account is approved.

## CalcHub AI

The site includes a floating CalcHub AI assistant. It uses the OpenAI Responses API through the server-side `/api/ai` route.

1. Copy `.env.example` to `.env.local` for local development.
2. Add your OpenAI API key as `OPENAI_API_KEY`.
3. Optionally set `OPENAI_MODEL`.
4. In Vercel, add the same variables under Project Settings → Environment Variables.

Never put the API key directly in client-side React code.

## AI setup

Create these Vercel environment variables:

- `OPENAI_API_KEY` — your OpenAI API key
- `OPENAI_MODEL` — `gpt-5.6-luna`

Keep the API key server-side. Never put it in `NEXT_PUBLIC_*` variables or browser code.
