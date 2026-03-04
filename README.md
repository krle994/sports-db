# Sports DB

A React app for browsing sports leagues and seasons, powered by [TheSportsDB](https://www.thesportsdb.com/) API.

### For further information about AI usage and design decisions, consult the [NOTES.md](https://github.com/krle994/sports-db/blob/main/NOTES.md) file

## Prerequisites

- **Node.js** 18+ (recommend 20+)
- **pnpm** (or yarn/npm)

## Getting started

### Install dependencies

```bash
pnpm install
```

### Run the app

Start the development server with hot reload:

```bash
pnpm dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
pnpm build
```

Output goes to the `dist/` folder.

### Preview the production build

After building, serve the production bundle locally:

```bash
pnpm preview
```

Then open the URL shown in the terminal (typically [http://localhost:4173](http://localhost:4173)).

## Testing

- **Watch mode** (re-runs on file changes):

  ```bash
  pnpm test
  ```

- **Single run** (CI-friendly, exits with code 0/1):

  ```bash
  pnpm test:run
  ```

- **Vitest UI** (browser UI for tests):

  ```bash
  pnpm test:ui
  ```

Tests use Vitest with jsdom and React Testing Library. Configuration and setup live in `src/test/`.

## Code style

- **Format** (Prettier):

  ```bash
  pnpm format
  ```

- **Check formatting** (no write):

  ```bash
  pnpm format:check
  ```

---

## Stack

| Layer           | Tech                                                                                         |
| --------------- | -------------------------------------------------------------------------------------------- |
| **Runtime**     | Node.js                                                                                      |
| **Build**       | [Vite](https://vite.dev/) 7                                                                  |
| **UI**          | [React](https://react.dev/) 19, TypeScript                                                   |
| **Data**        | [TanStack React Query](https://tanstack.com/query/latest) 5                                  |
| **Styling**     | [Sass](https://sass-lang.com/) (SCSS modules)                                                |
| **Testing**     | [Vitest](https://vitest.dev/) 4, [Testing Library](https://testing-library.com/react), jsdom |
| **Lint/Format** | [Prettier](https://prettier.io/)                                                             |
| **API**         | [TheSportsDB](https://www.thesportsdb.com/) (public JSON API)                                |
