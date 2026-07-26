## 2026-07-22 - Icon-only buttons accessibility pattern
**Learning:** Found multiple critical accessibility issues across the app where interactive elements (lucide-react icons used as buttons or links) lacked accessible names and visible focus states, making them invisible to screen readers and difficult to use via keyboard navigation.
**Action:** Implemented a standard pattern for all icon-only buttons using `aria-label` and `focus-visible:ring-2 focus-visible:outline-none`. This pattern should be applied consistently to any new icon-only controls.

## 2026-07-26 - Interactive Divs vs Buttons Pattern
**Learning:** Found multiple instances where large interactive "card" components (like configuration options) were using `<div>` elements with `onClick` handlers. This creates significant accessibility barriers, as screen readers do not announce them as interactive controls, and they lack native keyboard interaction support (tabbing and enter/space key activation).
**Action:** Always use native `<button type="button">` elements for interactive elements, even for complex layouts like cards. Apply `w-full text-left` to maintain the expected text layout, use `aria-pressed` for toggle states, and ensure proper `focus-visible` styling is included for keyboard navigation.
