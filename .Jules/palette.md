## 2024-03-24 - Hiding Decorative Icons

**Learning:** Assistive technologies and screen readers can read purely decorative icons nested inside elements like buttons, creating a redundant and annoying experience. If the parent element contains text that properly describes its function, the icon shouldn't be announced.
**Action:** Always add `aria-hidden="true"` to purely decorative icons (such as directional arrows inside CTA buttons or links) when the parent element has adequate descriptive text.

## 2024-08-31 - Decorative Icons in Modals/Accordions
**Learning:** Found an accessibility issue pattern where several interactive components (accordions, specs lists, submit buttons, checkboxes) lacked `aria-hidden="true"` on their descriptive decorative icons (like `<Plus>`, `<Minus>`, `<ChevronRight>`, `<CreditCard>`, `<Check>`, and `<Loader2>`), causing screen readers to announce them redundantly.
**Action:** Always verify that icons used within descriptive actionable elements have `aria-hidden="true"`, ensuring this rule is applied across all component variations in the design system.
