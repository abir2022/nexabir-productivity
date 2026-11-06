# PROFILE — NexaBir Productivity (portfolio demo PWA)

## 1. Abstract

NexaBir Productivity is a single-file, offline-capable personal command-centre built
as a Progressive Web App. It unifies six normally scattered work surfaces — a task
system (list, kanban and roadmap views over one model), a note workspace with three
editors (rich-text document, spreadsheet grid, freeform design canvas), a focus &
plan view (Pomodoro timer, daily MITs, habit streaks, meeting planner), a categorised
link hub, a monthly personal-KPI scorecard, and an activity-analytics dashboard — into
one vanilla-JS page with no framework, no build step and no required backend. State is
persisted first in `localStorage` (key `nexabirProd.v1`), with an optional JSON
snapshot merge for sharing or resetting. A versioned service worker caches the shell
so the app installs on desktop and mobile and works with no network. This portfolio
copy is seeded entirely from synthetic data (fictional team, invented tasks and notes,
generated session analytics) regenerated for publication. The UI follows a shared
dark-first design system: Fira Sans / Fira Code, a blue + amber token palette, hover
lift as feedback, focus-visible rings, reduced-motion support and a ≤450 ms load
stagger.

## 2. Problem Framing

Personal and small-team work is fragmented: tasks in a to-do app, notes in a doc tool,
bookmarks in the browser, focus sessions on a phone timer, and "how did I actually
spend this week?" answered nowhere. The fragments never join up, so the record of what
was done, how long it took and which tools were used cannot be reviewed together at
week's end. The artifact exists to prove that a genuinely useful, installable workspace
— not a landing page — can live in one HTML file the user fully owns, with no account,
server or subscription, and to show that offline PWAs can be data-dense and well
designed, not just app-shell skeletons.

## 3. Related Practice

The patterns here mirror how knowledge workers actually operate:Getting Things Done /
MIT (most-important-tasks) for daily top-3 planning; Pomodoro time-boxing for focus;
kanban (visualise work, limit WIP) for the board; sprint-based roadmaps with
due-date bars for planning; habit-streak tracking as a consistency-over-intensity
nudge; personal KPI/OKR scorecards where each work output is mapped to an objective
with an evidence trail; and weekly-review ledgers that ask "what moved, what slipped,
what next." Analytics dashboards follow usage-telemetry practice — sessions per day,
time-of-day distribution, per-model and per-agent breakdowns, cost estimates — the
same shape an AI-tooling team keeps for itself. None of these need a server; they are
notebook habits, which is why a local-first app fits.

## 4. Methodology & Data Design

Conceptually the data model is one JSON object saved under a single `localStorage`
key; `data/opencode.json` supplies a synthetic seed (tasks, links, notes, work-log)
the app can merge, and `data/analytics.js` injects a synthetic `window.__ANALYTICS__`
snapshot (sessions, messages, tokens, cost, sessions-per-day, hour-of-day, day-of-week,
models, agents, top directories). Transformation steps: seed → `load()` reads
`localStorage` or falls back to the built-in demo dataset → `renderAll()` recomputes
aggregations → charts are drawn by hand-rolled canvas helpers (`drawBars`,
`drawHBar`, `drawLine`) reading CSS variables via `getComputedStyle` so colours stay
on-palette. Metric definitions: completion rate = done ÷ total tasks; overdue = due
date before today and status ≠ done; habit streak = consecutive completed days; Pomodoro
work/break lengths are user-tunable minutes; analytics cost is an estimated USD total
over token counts. Every figure is invented for the demo.

## 5. Analytical Framework

The app encodes a weekly-review loop: capture (tasks, notes, links, meetings) →
focus (Pomodoro + MITs to do the top things now) → sustain (habit streaks to keep
consistency visible) → measure (task KPIs, roadmap, monthly KPI scorecard mapping
outputs to objectives) → reflect (Dashboard analytics + "Ask opencode" day-end review
suggestions, Requests queue). Status colour bands (open / in progress / review / done /
blocked / backlog) drive every view from one shared status set, so list, board and
roadmap always agree. Empty, loading and read-only states are explicit so the tool is
safe to demo as a shared, non-editable view.

## 6. System Design

One `index.html` holds the whole app: inline `<style>` (the design-system layer) and
one inline `<script>` IIFE, plus a small `data/` folder and `manifest.webmanifest` +
`sw.js`. No framework, no bundler, no runtime beyond the browser; charts are canvas,
the spreadsheet is a table of inputs, the document editor is a `contenteditable`
region. The service worker uses a versioned cache (`nexabir-productivity-v3`):
install pre-caches the shell, activate deletes every older cache then `clients.claim`,
GET requests to the two `data/` files are always revalidated (network-first, cache
fallback) so refreshed demo data appears, and everything else is cache-first with
background refresh. It is deliberately static/local-first: the PWA and offline story
are the point, and a single file is trivially hostable and inspectable in a portfolio.

## 7. Findings & Design Decisions

The data-dense dashboard style carried over well to an app-like tool: KPI and card
hover-lift, tabular-nums monospace values, and a sticky top bar with a visible
"Synthetic demo data" chip make it read as a real product, not filler. Key decisions:
keep all state in one `localStorage` key so reset/export/backup are one call; render
everything from a single `renderAll()` for predictability over speed at this size;
hand-roll canvas charts to avoid a library and inherit palette colours from CSS
variables; replace decorative emoji with inline SVG icons for navigation and controls
(no emoji-as-icons, and icon-only buttons carry `aria-label`); ship dark-first with a
persisted light variant that keeps ≥4.5:1 contrast; one ≤450 ms load stagger and
150–300 ms micro-interactions, all skipped under `prefers-reduced-motion`; responsive
at 390/768/1024/1440 with wide tables scrolling inside their own card.

## 8. Limitations & Validity

All tasks, notes, links, team members, meetings and analytics numbers are **synthetic**
and regenerated for publication — no real personal history, workplace content, live
URLs (they point at `example.com`) or machine paths. The single-file architecture favours
portability over scale; state lives only in one browser's `localStorage`, so it is not
multi-device without the optional JSON sync. Canvas charts and the CSV/export helpers
are intentionally minimal. The "opencode" assistant hooks (Requests queue, day-end
review) are demo affordances, not a live integration. Claims are about the tool's
design, not any true productivity result.

## 9. Reproducibility & Deployment

Run locally: double-click `index.html` (offline; service worker registration is skipped
on `file://`), or better, serve it so install + SW work — `npx serve .` or
`python -m http.server 5173` and open `http://localhost:5173`. Reset anytime via
Menu → Reset demo data. Deploy: import into Vercel with Framework Preset **Other**,
no build command, output at the repo root; keep files at their relative paths so the
service-worker scope and manifest remain valid. After changing shell assets, bump
`VERSION` in `sw.js` so returning visitors never see a stale cache. No environment
variables are required.
