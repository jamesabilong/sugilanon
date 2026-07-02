<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Deployment Notes

- Pushing `main` or `master` dispatches `sugilanon-updated` to `jamesabilong/fpdocker` with the pushed ref.
- Manual Sugilanon redeploys use GitHub's repository dispatch API against `jamesabilong/fpdocker` with `{"event_type": "sugilanon-updated", "client_payload": {"ref": "main"}}`; change `ref` to `master` when deploying that branch.
- If the Sugilanon change depends on Docker, Compose, nginx, or deploy workflow updates, make sure `fpdocker` `master` is pushed first so the VPS pulls the updated deployment config during the dispatch workflow.
<!-- END:nextjs-agent-rules -->
