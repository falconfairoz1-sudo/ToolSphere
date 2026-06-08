Vercel deployment notes
=======================

This repository contains a Next.js frontend in the `client` folder and an Express backend in `server`.

Quick frontend deploy (from repo root)

 - Install Vercel CLI (optional): `npm i -g vercel` or use `npx --yes vercel`
 - Deploy using the helper script (recommended):

```bash
./deploy-vercel.sh
```

or on Windows:

```powershell
deploy-vercel.bat
```

Direct CLI (from repo root):

```bash
npx --yes vercel --cwd client --prod --confirm
```

Environment variables

The frontend uses `NEXT_PUBLIC_*` environment variables. Example files are in `client/.env.example`.
Add production values in the Vercel dashboard or via the CLI:

```bash
vercel env add NEXT_PUBLIC_API_URL production
vercel env add NEXT_PUBLIC_ENABLE_AUTH production
vercel env add NEXT_PUBLIC_ENABLE_ANALYTICS production
```

Backend options

 - Option A (recommended): Host the Express API separately (Heroku, Render, DigitalOcean) and point `NEXT_PUBLIC_API_URL` to that URL.
 - Option B: Convert the backend to Vercel Serverless Functions (requires refactor; I can help if you want).

If you want, I can:
 - Prepare CI-friendly deployment scripts, or
 - Convert the `server` to serverless functions for a single Vercel deployment.
