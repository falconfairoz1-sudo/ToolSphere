@echo off
echo Deploying ToolSphere client to Vercel (from \client)

IF "%VERCEL_TOKEN%"=="" (
  echo VERCEL_TOKEN not set — you will be prompted to login interactively.
)

npx --yes vercel --cwd client --prod --confirm

echo Done. Visit your Vercel dashboard to view the deployment.
