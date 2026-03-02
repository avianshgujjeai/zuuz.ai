## Cursor Cloud specific instructions

### Repository structure
- `/` — Root: Original ZUUZ AI Analytics Dashboard (Vite + React, runs on port 5173)
- `/website/` — ZUUZ Marketing Website (Next.js 15 + TypeScript + Tailwind, runs on port 3000)

### Marketing website (`/website/`)
- **Dev server:** `npm run dev` (port 3000)
- **Build:** `npm run build` (runs tsc + next build, generates 42 static pages)
- **Lint:** `npm run lint` (uses eslint-config-next)
- Content is config-driven — see `src/content/*.ts` and `src/config/nav.ts`
- All routes use App Router with `(marketing)` route group for shared header/footer
- Dynamic routes use `generateStaticParams` from content configs
- Command Palette opens with Ctrl+K / Cmd+K
- The `lucide-react` icon lookup requires `as unknown as Record<string, LucideIcon>` cast due to a type mismatch with the `Icon` export in recent versions

### Original dashboard (`/`)
- **Dev server:** `npm run dev` (port 5173)
- **Build:** `npm run build`
- Demo login: `demo@zuuz.com` / `password`
- Note: The repo is missing an `.eslintrc` config file, so `npm run lint` fails in the root project. This is a pre-existing issue.
