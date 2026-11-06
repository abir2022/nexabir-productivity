# NexaBir Productivity

A personal command-centre PWA: tasks, notes, focus sessions and analytics — in one offline-capable HTML file.

## Problem

Personal work lives scattered across a task list in one app, notes in another, bookmarks in a third, and
"how did I actually spend this week?" nowhere at all. Nothing connects the tasks I do with the time I spend
and the tools I use to do them.

## Solution

One single-page app that owns all of it locally:

- A task board with statuses, priorities, projects, sprints, sub-steps, comments and an assignee picker.
- A note workspace with three editors — rich-text document, spreadsheet and freeform canvas.
- A focus & plan view: Pomodoro timer, daily MITs (top 3), habits with streaks, and a meeting planner.
- A link hub grouping every bookmark by type (dashboard, sheet, doc, other).
- A KPI view that scores each month against three personal objectives (automation, tooling, reporting).
- An analytics dashboard fed by a snapshot of my own AI-tool sessions (sessions, tokens, cost, per-day,
  per-hour, per-model, per-agent).
- Service-worker offline shell + installable web manifest, so it behaves like a native app.

Everything is stored in `localStorage` first. There is no account, no server and no database required to run it.

## Features

- **Dashboard** — task KPIs and charts plus AI-usage analytics on one screen.
- **Tasks / Board / Roadmap** — list, kanban and timeline views of the same task model.
- **Focus & Plan** — Pomodoro, MITs, habits, streaks, meetings with Google Calendar links.
- **Notes** — document, spreadsheet and design (canvas) editors, export to HTML/PNG/CSV.
- **Links** — categorised bookmark hub with add/edit/delete.
- **KPI** — monthly personal scorecard auto-derived from tagged tasks, with an evidence trail you can copy
  straight into a sheet.
- **Requests** — an "ask my assistant" queue that exports to JSON for later review.
- **Backup** — one-click JSON export of the whole workspace; optional auto-backup.
- **PWA** — manifest + versioned service worker; installs on desktop and mobile, works offline.

## Tech stack

- Vanilla JavaScript (no framework, no build step), single `index.html`
- CSS custom properties, hand-rolled canvas charts (no chart library)
- Progressive Web App: `manifest.webmanifest` + `sw.js` service worker with a versioned cache
- State in `localStorage`; optional JSON snapshot import/sync
- No dependencies, no bundler, no runtime outside the browser

## Demo data — synthetic

**Every task, note, link, work-log entry and analytics number in this repository is synthetic demo data.**
The dataset was regenerated for publication: no real personal history, no workplace content, no live
URLs (they point at `example.com`), and no machine paths. The analytics figures are generated from a fixed
seed of invented sessions, so the charts render realistically while telling you nothing true about anyone.

Files:
- `data/analytics.js` — synthetic usage snapshot injected as `window.__ANALYTICS__`
- `data/opencode.json` — synthetic task/link/note/worklog snapshot the app can merge

## Run locally

Static files — any of these works:

```bash
# 1) Just open it (works offline, service worker registration is skipped on file://)
open index.html          # macOS
start index.html         # Windows

# 2) Serve it (recommended — enables the service worker and JSON sync)
python -m http.server 5173
npx serve .
```

Then visit `http://localhost:5173`. Clear the workspace any time with **Menu → Reset demo data**.

## Deploy on Vercel

Static import, no build:

1. Import this repository in Vercel.
2. **Framework preset:** Other · **Build command:** (leave empty) · **Output directory:** repo root.
3. Deploy — `index.html` is served from the root and the PWA installs as-is.

## Repo layout

```
index.html              the whole app
manifest.webmanifest    PWA manifest
sw.js                   versioned service worker (shell cache + fresh data)
data/analytics.js       synthetic analytics snapshot
data/opencode.json      synthetic task/link/worklog snapshot
icons/                  180 / 192 / 512 app icons
.nojekyll               static-hosting marker
```
