## 2024-03-24 - Hiding Decorative Icons

**Learning:** Assistive technologies and screen readers can read purely decorative icons nested inside elements like buttons, creating a redundant and annoying experience. If the parent element contains text that properly describes its function, the icon shouldn't be announced.
**Action:** Always add `aria-hidden="true"` to purely decorative icons (such as directional arrows inside CTA buttons or links) when the parent element has adequate descriptive text.
