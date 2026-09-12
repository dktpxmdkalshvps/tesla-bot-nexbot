## 2024-03-24 - Hiding Decorative Icons

**Learning:** Assistive technologies and screen readers can read purely decorative icons nested inside elements like buttons, creating a redundant and annoying experience. If the parent element contains text that properly describes its function, the icon shouldn't be announced.
**Action:** Always add `aria-hidden="true"` to purely decorative icons (such as directional arrows inside CTA buttons or links) when the parent element has adequate descriptive text.

## 2024-08-31 - Decorative Icons in Modals/Accordions
**Learning:** Found an accessibility issue pattern where several interactive components (accordions, specs lists, submit buttons, checkboxes) lacked `aria-hidden="true"` on their descriptive decorative icons (like `<Plus>`, `<Minus>`, `<ChevronRight>`, `<CreditCard>`, `<Check>`, and `<Loader2>`), causing screen readers to announce them redundantly.
**Action:** Always verify that icons used within descriptive actionable elements have `aria-hidden="true"`, ensuring this rule is applied across all component variations in the design system.

## 2024-11-20 - High Contrast Focus Rings on Dark Themes

**Learning:** When dealing with dark themed websites, adding `focus-visible:ring-2` with a subtle white ring isn't enough to make keyboard focus distinct. Using a combination of `ring-offset-2` with `ring-offset-neutral-950` (matching the dark background) creates a powerful, high-contrast visual break that greatly improves keyboard accessibility. Also, make sure not to accidentally escape template literals (e.g. `\${`) when applying string replacements in Python scripts.
**Action:** For interactive text links (e.g., `<a>` tags in footers or navigation), do not rely solely on hover state changes (like text color transitions). Always implement explicit, high-contrast keyboard focus indicators using Tailwind's `focus-visible` utilities (e.g., `focus-visible:ring-2 focus-visible:ring-offset-2`) to ensure full keyboard navigation visibility.

## 2023-10-27 - Background Scroll Locking for Overlays
**Learning:** For overlays like mobile navigation drawers that do not take up the entire screen (`bottom-0`), users often accidentally scroll the underlying `body` while attempting to interact with or dismiss the drawer.
**Action:** When creating fixed-position menus or modals, explicitly lock background scrolling by applying `document.body.style.overflow = "hidden"` to the `body` element while the overlay is mounted, and restoring it on unmount.
