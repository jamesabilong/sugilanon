This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Deployment Trigger

Pushing to `main` or `master` dispatches `sugilanon-updated` to
`jamesabilong/fpdocker`, which builds `ghcr.io/jamesabilong/sugilanon:latest`
from the pushed ref and updates the `freshprice_sugilanon` Swarm service.
Any push to those branches triggers the deployment chain, including README-only
changes.

To manually trigger the same deployment without a new Sugilanon commit, set a
GitHub token in your shell and dispatch `sugilanon-updated` directly to
`jamesabilong/fpdocker`:

```bash
export GH_PAT='your_github_token'

curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: token ${GH_PAT}" \
  https://api.github.com/repos/jamesabilong/fpdocker/dispatches \
  -d '{"event_type": "sugilanon-updated", "client_payload": {"ref": "main"}}'
```

Set `client_payload.ref` to `main` or `master`, matching the branch you want the
production image built from. Use a token with permission to dispatch workflows in
`jamesabilong/fpdocker`. If Docker deployment files changed, push `fpdocker`
`master` before triggering this dispatch so the VPS pulls the updated stack
config.

A successful manual dispatch returns no response body from GitHub. If the
response is `Bad credentials`, the token is missing, expired, or lacks access to
create repository dispatch events in `jamesabilong/fpdocker`.

After triggering a deploy, check `jamesabilong/fpdocker` Actions for the
`sugilanon-updated` run. That workflow is responsible for building and pushing
the production image before the VPS updates the `freshprice_sugilanon` service.
If the Sugilanon action reports `Bad credentials`, update the `GH_PAT` Actions
secret in `jamesabilong/sugilanon`; that token must be allowed to create a
repository dispatch event in `jamesabilong/fpdocker`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Manual trigger: July 20, 17:44:00