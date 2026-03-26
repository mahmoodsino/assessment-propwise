# DECISIONS.md

## PropWise CRM Dashboard — Technical Decisions & Assumptions

---

### Tech Stack

**Tailwind CSS 3.x**
The assignment specifies Tailwind CSS 3.x. The project was initially scaffolded with Tailwind v4 and downgraded to v3 to meet requirements. A `postcss.config.js` file is used for PostCSS configuration.

**Sonner for Toast**
Used Sonner as recommended in the assignment. Default Sonner styling was fully replaced with a custom `ToastItem` component using `toast.custom()` to match the design system spec exactly — dark background for neutral/info/success, light red for errors.

**Radix UI primitives via `radix-ui` package**
The assignment mentions shadcn/ui as primitives. We use `radix-ui` directly (the unified package) for Avatar, Progress, and Slot primitives, which shadcn/ui itself is built on. This keeps dependencies minimal while satisfying the primitive requirement.

---

### Responsive Design

**Breakpoints**
Custom breakpoint scale defined in `tailwind.config.ts`, replacing Tailwind's defaults:

| Token      | Width  | Targets                      |
| ---------- | ------ | ---------------------------- |
| `mobile`   | 380px  | Small phones                 |
| `tablet-s` | 744px  | Small tablets / large phones |
| `tablet-m` | 834px  | Mid-size tablets             |
| `sm`       | 1280px | Desktop (baseline)           |
| `md`       | 1440px | Large desktop                |
| `lg`       | 1680px | Wide desktop                 |
| `xl`       | 2000px | Ultra-wide                   |

**Sidebar behavior**

- Mobile (< 1280px): sidebar is hidden off-screen and opens as a drawer overlay when the hamburger menu is tapped
- Desktop (≥ 1280px): sidebar is always visible, fixed on the left, 208px wide

**KPI cards**

- Mobile: 1 column
- Tablet (≥ 744px): 2 columns
- Desktop (≥ 1280px): 4 columns in one row

**Two-column layout (Revenue + Activity, Pipeline + Tasks)**

- Mobile & Tablet: stacked vertically, full width
- Desktop (≥ 1280px): side by side, 3/5 + 2/5 split

**Date filter tabs**

- Mobile: horizontally scrollable with `overflow-x-auto`, tabs do not wrap
- Tablet/Desktop: displayed inline as designed

**Charts**

- Recharts `ResponsiveContainer` handles chart resizing automatically

---

### Design System

**Colors**
Two-layer system: a static primitive palette (`brand`, `grey`, `stone` scales) defined in `tailwind.config.ts`, and semantic CSS custom properties defined in `globals.css` (e.g. `--color-bg-subtle`, `--color-content-muted`). Components always reference semantic tokens via Tailwind arbitrary values like `bg-[var(--color-bg-default)]` — never raw hex or primitive scales directly. Dark mode overrides are handled entirely by redefining the same tokens inside the `.dark` class, so no `dark:` prefixes are needed in component code.

**Typography**
Inter is the primary font (body, UI elements). Figtree is defined as a secondary font family in `tailwind.config.ts` and imported in `globals.css`, available for use where specified by the design.

**Custom icons**
The design system includes custom PropWise icons not available in Lucide. These are implemented as React SVG components in `src/components/icons/` with `currentColor` so they inherit text color from their parent.

**Dark mode**
Implemented using `next-themes` with `attribute="class"`. See Colors — dark mode is handled entirely via `.dark` CSS variable overrides, so no `dark:` Tailwind prefixes are needed in component code.

---

### State Management

**Jotai atoms**

- `activePeriodAtom` — uses `atomWithStorage` to persist the selected period in localStorage and sync with URL
- `dashboardDataAtom` — holds the fetched dashboard data
- `isLoadingAtom` / `hasErrorAtom` — loading and error states
- `taskOverridesAtom` — tracks task completion overrides for undo support
- `tasksAtom` / `taskProgressAtom` — derived atoms that compute task list and progress from base atoms

**URL sync**
The active period is stored in localStorage via `atomWithStorage`. A separate hook reads `?period=` from the URL on mount and sets the atom accordingly, keeping the URL and state in sync.

---

### Toast Triggers

| Action             | Toast                                       |
| ------------------ | ------------------------------------------- |
| Switch date filter | Neutral: "Dashboard updated to [period]"    |
| Complete a task    | Success: "Task completed" + Undo action     |
| Click "+ Create"   | Neutral: "Feature coming soon"              |
| API failure        | Error: "Failed to load data" + Retry action |

---

### Assumptions

- **Pipeline Negotiation and Closed Won** — the assignment table shows no count/value for these stages. The mock data uses reasonable values (12/AED 320K and 8/AED 280K) based on the proportional bar widths shown in the Figma design.
- **Activity feed entries** — exact messages are taken from the Figma design screenshots. The "Just now" group matches the design exactly.
- **Tasks `completed` count** — initialized to 0 since all tasks start as incomplete. The count updates dynamically as users check off tasks.
- **Tablet layout** — not designed in Figma. Decisions made based on product sense: sidebar collapses to drawer, 2-column KPI grid, single-column chart layout.
- **Mobile layout** — not designed in Figma. Single column throughout, scrollable tabs, drawer sidebar.
