# GitHub Copilot Instructions

This is a Next.js/React project deployed through Vercel.

- Follow `AGENTS.md` for repository-wide guidance.
- For React/Next.js performance work, follow `.agents/skills/vercel-react-best-practices/SKILL.md`.
- For interface and accessibility reviews, follow `.agents/skills/web-design-guidelines/SKILL.md`.
- For security and deployment changes, follow `.agents/skills/vercel-deployment-security/SKILL.md`.
- Inspect surrounding code and reuse existing conventions before editing.
- Never commit secrets, bypass server-side authorization, or expose private environment variables to client code.
- Validate inputs, handle errors safely, and avoid destructive database changes without explicit approval.
- Run relevant lint, type-check, tests, and build checks when available; report exactly what was run.
