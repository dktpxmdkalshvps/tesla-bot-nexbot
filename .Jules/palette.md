## 2026-07-22 - Icon-only buttons accessibility pattern
**Learning:** Found multiple critical accessibility issues across the app where interactive elements (lucide-react icons used as buttons or links) lacked accessible names and visible focus states, making them invisible to screen readers and difficult to use via keyboard navigation.
**Action:** Implemented a standard pattern for all icon-only buttons using `aria-label` and `focus-visible:ring-2 focus-visible:outline-none`. This pattern should be applied consistently to any new icon-only controls.
## 2026-07-24 - Custom Accordion Accessibility Pattern
**Learning:** Custom expand/collapse components (like accordions) lack native accessibility. They require specific WAI-ARIA attributes to be usable by screen readers.
**Action:** Applied the WAI-ARIA accordion pattern by adding `aria-expanded`, `aria-controls`, `id`, `role="region"`, `aria-labelledby`, and visible focus rings (`focus-visible:ring-2 focus-visible:outline-none`) to the FAQ component.
