# Agent Instructions

This repository is a Next.js/React application deployed with GitHub and Vercel.

## Required skills
- For React/Next.js implementation and performance refactors, read `.agents/skills/vercel-react-best-practices/SKILL.md`.
- For UI, accessibility, and UX reviews, read `.agents/skills/web-design-guidelines/SKILL.md`.
- Before deployment, dependency, API, authentication, or database changes, read `.agents/skills/vercel-deployment-security/SKILL.md`.

## Working rules
- Inspect the existing implementation before making changes; preserve working behavior and the current architecture unless a change is justified.
- Prefer small, targeted changes over broad rewrites.
- Do not hardcode secrets or expose server-only credentials to browser code.
- Validate inputs and handle loading, empty, error, and success states.
- Run the checks available in `package.json` and a production build when practical.
- Never claim a test or deployment passed without confirming its result.
- Do not perform destructive production database operations without explicit approval.
