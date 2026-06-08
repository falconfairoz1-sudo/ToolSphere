#!/usr/bin/env bash
set -euo pipefail

echo "Deploying ToolSphere client to Vercel (from /client)"

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "VERCEL_TOKEN not set — you'll be prompted to login interactively."
fi

# Install dependencies and deploy using the Vercel CLI from the client folder
npx --yes vercel --cwd client --prod --confirm

echo "Done. Visit your Vercel dashboard to view the deployment."
