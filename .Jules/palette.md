## 2026-07-22 - Icon-only buttons accessibility pattern
**Learning:** Found multiple critical accessibility issues across the app where interactive elements (lucide-react icons used as buttons or links) lacked accessible names and visible focus states, making them invisible to screen readers and difficult to use via keyboard navigation.
**Action:** Implemented a standard pattern for all icon-only buttons using aria-label and focus-visible:ring-2 focus-visible:outline-none. This pattern should be applied consistently to any new icon-only controls.

## 2024-07-25 - Custom Disclosure (Accordion) Accessibility Pattern
**Learning:** Found custom accordion implementations lacking proper ARIA attributes, meaning screen reader users wouldn't know the expanded/collapsed state or how the content relates to the toggle.
**Action:** Implemented a standard pattern for custom disclosure widgets using aria-expanded on the button, and associating the button with the content using aria-controls, role="region", and aria-labelledby.