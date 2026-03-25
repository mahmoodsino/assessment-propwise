# DECISIONS.md

## PropWise CRM Dashboard — Technical Decisions & Assumptions

---

### Tech Stack

**Tailwind CSS 3.x**
The assignment specifies Tailwind CSS 3.x. The project was initially scaffolded with Tailwind v4 and downgraded to v3 to meet requirements. A `postcss.config.mjs` file with ESM syntax is used since the project uses `"type": "module"`.

**Sonner for Toast**
Used Sonner as recommended in the assignment. Default Sonner styling was fully replaced with a custom `ToastItem` component using `toast.custom()` to match the design system spec exactly — dark background for neutral/info/success, light red for errors.

**Radix UI primitives via `radix-ui` package**
The assignment mentions shadcn/ui as primitives. We use `radix-ui` directly (the unified package) for Avatar, Progress, and Slot primitives, which shadcn/ui itself is built on. This keeps dependencies minimal while satisfying the primitive requirement.

---

### Responsive Design

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
- Y-axis labels are hidden on mobile to save space

---

### Design System

**Color tokens**
All colors use CSS custom properties defined in `globals.css` with light and dark mode values. Components reference `var(--color-*)` directly in Tailwind arbitrary values.

**Typography**

- Inter is used as the primary font (body, UI elements) per the design system
- Figtree is registered as `font-figtree` for headings where specified

**Custom icons**
The design system includes custom PropWise icons not available in Lucide. These are implemented as React SVG components in `src/components/icons/` with `currentColor` so they inherit text color from their parent.

**Dark mode**
Implemented using `next-themes` with `attribute="class"`. The `.dark` class on `<html>` triggers CSS variable overrides defined in `globals.css`. No `dark:` Tailwind prefixes are needed since colors reference CSS variables that automatically switch.

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
