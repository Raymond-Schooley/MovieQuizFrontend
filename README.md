# Movie Quiz - Frontend

React 18 + TypeScript, built with Vite. Talks to the `backend` API
(sibling repo) over `/api/v1`, always as a relative path - in both dev and
prod this app is served from behind the nginx reverse proxy described in
the root-level `README.md`, so the browser only ever sees one origin and
CORS never comes up.

## Stack

- React 18, TypeScript, Vite
- @tanstack/react-query for server state (fetching questions, submitting
  answers, listing movies)
- Vitest + React Testing Library for tests

## Project layout

```
src/
  api/          fetch wrapper + typed calls to the backend (mirrors the
                backend's DTOs by hand - see api/types.ts)
  hooks/        useQuiz - the question/answer flow as a hook
  components/
    QuizGame.tsx    orchestrates a round: question -> answer -> feedback -> next
    QuizCard.tsx    renders one question's prompt + options
    ScoreBoard.tsx  running correct/answered tally
    MovieList.tsx   simple read view over /api/v1/movies
  App.tsx       tab switcher between the quiz and the movie browser
```

## Running it

### With Docker (recommended)

See the root-level `docker-compose.yml` (production-like) and
`docker-compose.dev.yml` (live-reloading dev, via a bare `node` container
running `npm run dev`) one directory up. Either way, nginx is what you open
in a browser - not this app directly - so dev matches prod.

### Standalone

```bash
npm install
npm run dev
```

This runs Vite's own dev server on `http://localhost:5173` and proxies
`/api/*` straight to `http://localhost:8080` (see `vite.config.ts`), so you
can iterate on the frontend against a backend running locally without
needing the reverse proxy or Docker at all. Point `VITE_DEV_API_PROXY_TARGET`
at something else if your backend isn't on the default port (see
`.env.example`).

```bash
npm run build    # type-checks then builds dist/
npm run preview  # serves the production build locally
npm test         # runs the Vitest suite once
```

> **Note on this scaffold:** the sandbox this project was generated in had
> no access to the npm registry (its outbound network is locked down to a
> small allowlist), so none of this could actually be installed or run to
> verify it end-to-end. The code follows standard, current Vite/React/
> Vitest conventions, but please run `npm install && npm test && npm run
> build` as your first step after cloning, and let me know if anything
> doesn't come up clean so it can be fixed.

## Talking to the API

`src/api/client.ts` is a small `fetch` wrapper that throws a typed
`ApiError` (with the backend's error `message`/`details`) on non-2xx
responses. `src/api/types.ts` mirrors the backend's request/response DTOs
by hand; if the two drift, TypeScript will only catch it at the call sites,
not automatically - keep them in sync when you change either side.

## Todo
connect the new Colorado theme into the app
