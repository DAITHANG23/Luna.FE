---
name: frontend-conventions
description: Front-end design system conventions for the Luna project. Use when writing new UI components, pages, or styling to ensure consistency with the established color palette, typography scale, font families, shadows, and Tailwind CSS patterns.
metadata:
  author: Luna Team
  version: "1.0.0"
---

# Luna Front-End Conventions

This skill defines the design system conventions for the Luna restaurant booking application. **All new UI code MUST follow these conventions** to maintain visual consistency across the project.

---

## 1. Technology Stack

| Layer       | Technology                               |
|-------------|------------------------------------------|
| Framework   | Next.js (App Router)                     |
| Styling     | Tailwind CSS v4 (`@import "tailwindcss"`) |
| Typography  | `@tailwindcss/typography` plugin (prose) |
| Dark Mode   | Class-based (`.dark` / `.light` on `<html>`) |
| Fonts       | Google Fonts via `next/font/google`      |

---

## 2. Color System

Colors are defined as CSS custom properties using **space-separated RGB values** (e.g., `248 250 252`) and consumed via `rgb(var(--variable))`. Some use HSL format.

### 2.1 Light Mode (`.light`)

| Token              | RGB / HSL Value         | Rendered Color          | Tailwind Class         | Usage                        |
|--------------------|-------------------------|-------------------------|------------------------|------------------------------|
| `--background`     | `248 250 252`           | `rgb(248,250,252)`      | `bg-background`        | Page background              |
| `--primary`        | `239 71 111`            | `rgb(239,71,111)`       | `bg-primary`, `text-primary` | Brand / accent color    |
| `--secondary`      | `210 40% 96.1%`        | HSL                     | `bg-secondary`         | Secondary surfaces           |
| `--border`         | `212 212 212`           | `rgb(212,212,212)`      | `border-border`        | Borders & dividers           |
| `--card`           | `255 255 255`           | `rgb(255,255,255)`      | `bg-card`              | Card backgrounds             |
| `--primary-text`   | `22 23 28`              | `rgb(22,23,28)`         | `text-primary-text`    | Main body text               |
| `--secondary-text` | `136 139 148`           | `rgb(136,139,148)`      | `text-secondary-text`  | Muted / secondary text       |
| `--cta`            | `139 92 246`            | `rgb(139,92,246)`       | `bg-cta`               | Call-to-action buttons       |
| `--cta-active`     | `124 58 237`            | `rgb(124,58,237)`       | `bg-cta-active`        | CTA hover / active state     |
| `--cta-text`       | `255 255 255`           | `rgb(255,255,255)`      | `text-cta-text`        | Text on CTA buttons          |
| `--success`        | `16 255 203`            | `rgb(16,255,203)`       | `text-success`         | Success indicators           |
| `--error`          | `183 29 24`             | `rgb(183,29,24)`        | `text-error`           | Error states                 |
| `--warning`        | `255 214 0`             | `rgb(255,214,0)`        | `text-warning`         | Warning states               |
| `--success-bg`     | `91 228 155`            | `rgb(91,228,155)`       | `bg-success-bg`        | Success notification bg      |
| `--accent`         | `221 83% 95%`           | HSL                     | `bg-accent`            | Accent highlights            |
| `--accent-foreground` | `221 83% 53%`        | HSL                     | `text-accent-foreground` | Accent text                |

### 2.2 Dark Mode (`.dark`)

| Token              | RGB / HSL Value         | Rendered Color          | Notes                        |
|--------------------|-------------------------|-------------------------|------------------------------|
| `--background`     | `33 39 55`              | `rgb(33,39,55)`         | Dark blue-gray               |
| `--primary`        | `239 71 111`            | Same as light           | Unchanged                    |
| `--border`         | `38 38 38`              | `rgb(38,38,38)`         | Very dark border             |
| `--card`           | `220 10% 20%`           | HSL dark gray           | Dark card surface            |
| `--primary-text`   | `255 255 255`           | White                   | Inverted for readability     |
| `--secondary-text` | `136 139 148`           | Same as light           | Unchanged                    |
| `--cta`            | `99 102 241`            | `rgb(99,102,241)`       | Indigo (different from light)|
| `--cta-active`     | `79 70 229`             | `rgb(79,70,229)`        | Darker indigo                |

### 2.3 Additional Colors

| Token      | Value             | Usage                 |
|------------|-------------------|-----------------------|
| `--grape`  | `114, 35, 204`    | Defined in `:root`, special accent |
| `gray-800` | `oklch(27.8% 0.033 256.848)` | Tailwind theme token |

### 2.4 Color Usage Rules

- ✅ **DO:** Use semantic Tailwind classes: `bg-background`, `text-primary-text`, `bg-cta`, `border-border`
- ✅ **DO:** Use custom utilities: `text-primary`, `text-primary-text` (defined via `@utility`)
- ❌ **DON'T:** Hardcode hex/rgb values inline — always reference design tokens
- ❌ **DON'T:** Use raw CSS variables directly when a Tailwind class exists

---

## 3. Typography

### 3.1 Font Families

| Font Name         | CSS Variable              | Tailwind Class          | Loaded via               |
|-------------------|---------------------------|-------------------------|--------------------------|
| **Inter**         | `--font-inter`            | `font-inter`            | `next/font/google`       |
| **Red Hat Display** | `--font-red-hat-display` | `font-red-hat-display` | `next/font/google`       |

Both fonts use `display: "swap"` for performance.

### 3.2 Font Family Assignment

| Element(s)     | Font Family       | Tailwind Class          |
|----------------|-------------------|-------------------------|
| `h1`, `h5`     | Red Hat Display   | `font-red-hat-display`  |
| `p`, `h2`, `h3`, `h4` | Inter      | `font-inter`            |

> **Rule:** Headlines `h1` and `h5` use **Red Hat Display** for visual emphasis. All other text uses **Inter** for readability.

### 3.3 Typography Scale

All heading styles are defined in `@layer base` (globals.css) and `theme/__Theme.Typography.ts`.

| Element    | Font Weight | Font Size | Line Height | Letter Spacing | Font Family       |
|------------|-------------|-----------|-------------|----------------|-------------------|
| `h1`       | **Bold**    | `40px`    | `74px`      | `-0.01em`      | Red Hat Display   |
| `h2`       | **Bold**    | `28px`    | `42px`      | `-0.01em`      | Inter             |
| `h3`       | **Bold**    | `22px`    | `32px`      | `-0.02em`      | Inter             |
| `h4`       | **Bold**    | `18px`    | `22px`      | `-0.01em`      | Inter             |
| `h5`       | **Bold**    | `14px`    | `20px`      | `-0.01em`      | Red Hat Display   |
| `p`        | Normal      | `16px`    | `24px`      | `-0.01em`      | Inter             |
| `.caption` | Normal      | `12px`    | `18px`      | `-0.01em`      | —                 |
| `.button`  | **Bold**    | `16px`    | `34px`      | `-0.01em`      | —                 |

### 3.4 Typography Usage Rules

- ✅ Use the correct semantic HTML tag (`h1`–`h5`, `p`) — styles are applied automatically via `@layer base`
- ✅ Use `.caption` class for small helper text
- ✅ Use `.button` class for button-specific text styling (includes `min-width: 176px`)
- ❌ **DON'T** override font-size/line-height inline — use the established scale
- ❌ **DON'T** mix font families arbitrarily — follow the element-to-font mapping above

---

## 4. Shadows

Defined in `tailwind.config.ts` under `theme.extend.boxShadow`:

| Tailwind Class        | Value                                        | Usage                    |
|-----------------------|----------------------------------------------|--------------------------|
| `shadow-glass`        | `0 4px 30px rgba(0,0,0,0.1)`                | Glassmorphism surfaces   |
| `shadow-glass-hover`  | `0 8px 32px rgba(0,0,0,0.12)`               | Glass surface hover      |
| `shadow-button`       | `0 2px 4px rgba(0,0,0,0.1)`                 | Default button shadow    |
| `shadow-button-hover` | `0 4px 8px rgba(0,0,0,0.12)`                | Button hover shadow      |
| `shadow-custom-blue`  | `0px 34px 80px rgba(46,52,121,0.12)`         | Featured / hero cards    |

---

## 5. Animations

| Tailwind Class       | Keyframe      | Duration / Timing          | Usage                  |
|----------------------|---------------|----------------------------|------------------------|
| `animate-spin-slow`  | `spin`        | `3s linear infinite`       | Slow-spinning loaders  |
| `animate-bounceLow`  | `bounceLow`   | `1s ease-in-out infinite`  | Subtle bounce (4px)    |

---

## 6. Layout Conventions

### 6.1 Base Layout (globals.css `@layer base`)

```css
html  → p-0 m-0 min-h-screen flex flex-col
body  → p-0 m-auto min-h-screen flex flex-col w-full
main  → flex-grow
```

### 6.2 Root Layout (layout.tsx)

- `<html>` receives both font variables: `${inter.variable} ${red_hat_display.variable}`
- `<html>` includes `prose w-full max-w-none` for typography plugin
- Theme class (`.light` or `.dark`) is toggled on `<html>` via `AppContext`

---

## 7. Scrollbar Styling

Custom webkit scrollbar is defined globally:

| Part          | Style                                     |
|---------------|-------------------------------------------|
| Width/Height  | `8px`                                     |
| Thumb         | `rgb(151,151,151)`, `border-radius: 20px` |
| Track         | `rgba(0,0,0,0.04)`, `border-radius: 20px` |
| Buttons       | Hidden (`display: none`)                  |

---

## 8. Notification Styles (Notistack)

| Class                          | Background Color         |
|--------------------------------|--------------------------|
| `.notistack-MuiContent`        | `border-radius: 8px`     |
| `.notistack-MuiContent-success`| `rgb(var(--success-bg))` |
| `.notistack-MuiContent-error`  | `rgba(var(--error))`     |
| `.notistack-MuiContent-warning`| `rgba(var(--warning))`   |

---

## 9. Prose Overrides

The `@tailwindcss/typography` plugin's prose styles are customized:

- `p`, `h2`, `h3` — margins reset to `0`
- `button` — `min-width: 0` (reset)
- `img` — `margin: 0`
- `hr` — `margin: 16px` top & bottom
- `a` — `text-decoration: none`

---

## 10. Checklist for New Components

When creating a new component, verify:

- [ ] Uses semantic color tokens (`bg-background`, `text-primary-text`, etc.) — no hardcoded colors
- [ ] Uses the correct heading tag (`h1`–`h5`) or text class (`.caption`, `.button`)
- [ ] Does NOT override font-size/line-height unless absolutely necessary
- [ ] Supports dark mode (uses CSS variables that adapt automatically)
- [ ] Uses `shadow-glass` or `shadow-button` for elevation — no custom shadows
- [ ] Interactive elements have `cursor: pointer` (buttons get this by default)
- [ ] Responsive: tested at mobile (`max-width: 640px`) and desktop breakpoints
- [ ] Font family follows the mapping: `h1`/`h5` → Red Hat Display, rest → Inter

---

## 11. File Reference

| File                                 | Purpose                              |
|--------------------------------------|--------------------------------------|
| `src/app/globals.css`                | Global styles, CSS variables, base layer |
| `src/app/fonts.ts`                   | Google Font loading (Inter, Red Hat Display) |
| `src/app/layout.tsx`                 | Root layout, font variable injection |
| `theme/__Theme.Typography.ts`        | Typography config for Tailwind prose plugin |
| `tailwind.config.ts`                 | Tailwind theme extensions (shadows, animations) |
| `src/contexts/AppContext.tsx`        | Dark/light mode toggle logic         |
