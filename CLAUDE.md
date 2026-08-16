# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This repository is currently just the default Vite React+TS scaffold (`src/App.tsx` is still the template "Hello world!" component). The real application has not been built yet.

**`SPEC.md` is the authoritative product/architecture specification for what to build.** Read it in full before implementing anything — it defines exact required behavior (commands, help text, tab semantics, state shape, directory layout) and explicitly lists what NOT to build (no `cd`/`ls`/etc., no extra commands, no theme switcher). Do not deviate from it without checking with the user first.

## Commands

```
npm run dev       # start Vite dev server
npm run build     # tsc -b (project references) then vite build
npm run lint      # eslint .
npm run preview   # preview production build
```

There is no test setup in this repo (no test runner configured, no `test` script).

Always run `npm run lint` and `npm run build` after implementation changes — `npm run build` type-checks via `tsc -b` before bundling, so it's the fastest way to catch type errors across the project.

## Stack

- React 19 + TypeScript, built with Vite.
- Tailwind CSS v3 (`tailwind.config.js`, `src/index.css` uses the standard `@tailwind base/components/utilities` directives) — no component library on top of it.
- ESLint flat config (`eslint.config.js`) using `typescript-eslint` recommended + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` (Vite variant). Type-aware lint rules are not enabled.
- `tsconfig.json` is a references-only root pointing at `tsconfig.app.json` (app code) and `tsconfig.node.json` (Vite config).

## Architecture direction (per SPEC.md)

The app is a terminal-emulator-style portfolio site: a tab bar of independent terminal sessions, each with its own command history, working directory, and output buffer, driven by a small set of hardcoded commands (`help`, `about`, `neofetch`/`fastfetch`, `github`, `experience`, `links`, `history`, `whoami`, `echo`, `clear`).

Key architectural rules from the spec that matter across the whole codebase:

- **Modular, not monolithic**: terminal UI (tabs/window/output/prompt/input/hints), command implementations, and portfolio content must live in separate modules (`components/terminal/*`, `commands/*`, `data/portfolio*`) — not all in one component.
- **Command registry, not if/else**: commands are registered in a central lookup keyed by name (with alias support, e.g. `neofetch`/`fastfetch`/`github` all needing to work), so adding a command later doesn't require touching a big conditional.
- **Portfolio content is data, not JSX**: profile/skills/education/github/experience/links must live in one central data structure, not scattered across command implementations.
- **Per-terminal session state**: each tab carries its own `{ id, name, commandHistory, historyIndex, currentDirectory, output, inputValue }`; nothing about command history or input state is global.
- Only `terminal1` is protected from closing and lacks an `x` button; every other tab gets sequential names (`terminal2`, `terminal3`, ...) and closes back to a valid neighboring tab.
