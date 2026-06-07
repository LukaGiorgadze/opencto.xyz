# OpenCTO Landing Page

OpenCTO is a self-hosted AI operator for founder-led products.

Tell OpenCTO the outcome. It operates the workflow.

OpenCTO runs on your machine as a self-hosted assistant and uses the tools you give it to get product work done. It can code, run commands, deploy, monitor, publish, and report back from Discord or Telegram.

## What It Can Do

- Launch a site and connect a domain
- Fix failed deploys
- Configure repos, env vars, and CI
- Prepare release notes
- Recover stuck workflows
- Run recurring checks

## How It Works

- Plain-language outcome
- Context from project, files, tools
- Local machine and connected services
- Keeps going through waits and failures
- Reports changes, checks, and blockers

## Install

```sh
curl -fsSL https://raw.githubusercontent.com/LukaGiorgadze/opencto/main/install.sh | sh
```

## Landing Page Development

This site is a single-page Vite React app.

```sh
pnpm install
pnpm dev
pnpm build
```
