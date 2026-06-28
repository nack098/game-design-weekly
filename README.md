<div align="center">
  <img src="apps/web/public/logo-banner.jpg" alt="Weekly Game Design Challenge" width="440" />

  <p><strong>A weekly game design challenge.</strong><br/>
  Every week, a small random idea drops — design a game around it, share your concept, and learn from everyone else's.</p>
</div>

---

## What is this?

**Weekly Game Design Challenge** is a tiny, friendly habit for getting better at game design. Each week we post a short prompt; you design a game around it — any genre, any scope — and share the idea. No engine to install and no code required: it's all about the *design*.

Browse what everyone else came up with for the same prompt, leave comments, and pick up ideas to make your next design better. It's meant for **everyone** — a softer on-ramp than a full game jam, with no deadline crunch and no all-nighters.

> Inspired by Takashi Hamamura's (GameDesignLab) idea of learning game design by breaking it into pieces and practicing — [read the interview on gamemakers.jp](https://gamemakers.jp/article/2022_07_13_11507/).

## Tech stack

| Part | Stack |
| --- | --- |
| **Web** (`apps/web`) | [TanStack Start](https://tanstack.com/start) + React 19, Vite 8, Tailwind CSS v4, TypeScript, lucide-react |
| **API** (`apps/api`) | ASP.NET Core MVC (.NET 10) |
| **Tooling** | pnpm workspace, Prettier, ESLint, Vitest |

## Monorepo layout

```
game-design-weekly/
├── apps/
│   ├── web/        # TanStack Start frontend
│   └── api/        # ASP.NET Core backend (.NET 10)
├── pnpm-workspace.yaml
└── package.json    # root: runs web + api together
```

## Prerequisites

- **Node.js** 20+ and **pnpm** 11+ (`corepack enable` will provide pnpm)
- **.NET 10 SDK** (for the API)

## Getting started

```bash
git clone git@github.com:nack098/game-design-weekly.git
cd game-design-weekly

pnpm install          # install web dependencies (.NET restores on first run)
pnpm dev              # run the web app and API together
```

- Web → http://localhost:3000
- API → http://localhost:5026 (https: 7271)

### Running one side only

```bash
pnpm --filter web web:dev          # web only
dotnet run --project apps/api      # API only
```

## Scripts

Run from the repo root.

| Command | Description |
| --- | --- |
| `pnpm dev` | Run the web app and API concurrently |
| `pnpm --filter web web:dev` | Start the web dev server (port 3000) |
| `pnpm --filter web web:build` | Production build of the web app |
| `pnpm --filter web web:preview` | Preview the production build |
| `pnpm --filter web web:test` | Run web tests (Vitest) |
| `pnpm --filter web web:lint` | Lint the web app (ESLint) |
| `pnpm --filter web web:format` | Format with Prettier + ESLint `--fix` |
| `pnpm --filter web web:generate-routes` | Regenerate the TanStack route tree |

## Web app structure

```
apps/web/src/
├── components/         # Shared UI: Layout, Navigator, Logo, Footer, Card, Overlay, Sns
├── features/
│   ├── challenge/      # Weekly challenge view (statement, submissions grid, submit modal)
│   └── submission/     # Submission detail view + submission form
└── routes/             # File-based routes (TanStack Router)
    ├── __root.tsx      # Global shell: <head>, layout, devtools
    ├── index.tsx       # /                 current challenge
    ├── about/          # /about            what this is
    ├── history/        # /history          past challenges (+ /history/$date detail)
    └── submission/     # /submission/$id   a submission's details
```

| Route | Page |
| --- | --- |
| `/` | The current weekly challenge and its submissions |
| `/history` | List of past challenges |
| `/history/$date` | A past challenge (read-only) |
| `/submission/$id` | A submission — image, description, design-docs link, comments |
| `/about` | What the challenge is and how it works |

The global frame (background, centered content box, the `Navigator` side nav, logo, and footer) lives in `components/Layout.tsx` and is applied once at the root, so every route inherits it.

> **Note:** the submission/challenge data is currently placeholder, marked in code with `// will come from the API`, ready to be wired to `apps/api`.

## Connect

Made by **Nakuya**.

- X (Twitter): [@doraenack](https://x.com/doraenack)
- YouTube: [@nakuya](https://www.youtube.com/@nakuya)
- Email: nack098gamer@gmail.com

## License

Released under the **GNU Affero General Public License v3.0** — see [LICENSE](LICENSE).

© 2026 Nakuya
