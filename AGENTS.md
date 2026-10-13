# Agent rules
Read PRD.md fully before any task. Appendix B and sections 16.2, 35 and 38 are binding.
- Never invent features, metrics, URLs, years, or decisions.
- Every claim cites a file path or commit hash. If you cannot cite it, write "unverified".
- Never set verified: true. Only the owner does.
- No em dashes. No proprietary PitchMatter material.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
