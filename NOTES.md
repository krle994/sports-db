# Notes – AI Tools & Design Decisions

## AI tools used

- **Cursor / AI assistant**: Used for scaffolding (project layout, API layer, types, components, and adding test suites) and for aligning the implementation with the assignment requirements.

## Design decisions

- **React + TypeScript + Vite**: Chosen for a modern SPA setup with strict typing and fast dev experience.
- **TanStack React Query**: Used for data fetching and caching so that league and season-badge responses are not re-fetched unnecessarily (assignment: “Responses should be cached to avoid repeat calls”).
- **SCSS modules**: All component styles use SCSS modules (no inline styles), with design tokens in `src/styles/_tokens.scss` for colors, spacing, typography, and radii.
- **Component structure**:
  - `LeagueList`: container that fetches leagues, applies search/sport filters, and manages selected league for the badge.
  - `LeagueCard`: clickable league row (strLeague, strSport, strLeagueAlternate).
  - `SearchBar` and `SportFilter`: controlled components for filtering.
  - `SeasonBadge`: shows the season badge image (first season in the API response) with optional close.
- **Mobile-first**: Layout and styles are written with a mobile-first approach; tokens and structure allow for responsive tweaks later.
