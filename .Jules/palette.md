## 2026-07-22 - Icon-only buttons accessibility pattern
**Learning:** Found multiple critical accessibility issues across the app where interactive elements (lucide-react icons used as buttons or links) lacked accessible names and visible focus states, making them invisible to screen readers and difficult to use via keyboard navigation.
**Action:** Implemented a standard pattern for all icon-only buttons using `aria-label` and `focus-visible:ring-2 focus-visible:outline-none`. This pattern should be applied consistently to any new icon-only controls.

## 2026-07-26 - Interactive Divs vs Buttons Pattern
**Learning:** Found multiple instances where large interactive "card" components (like configuration options) were using `<div>` elements with `onClick` handlers. This creates significant accessibility barriers, as screen readers do not announce them as interactive controls, and they lack native keyboard interaction support (tabbing and enter/space key activation).
**Action:** Always use native `<button type="button">` elements for interactive elements, even for complex layouts like cards. Apply `w-full text-left` to maintain the expected text layout, use `aria-pressed` for toggle states, and ensure proper `focus-visible` styling is included for keyboard navigation.

## 2026-07-28 - Custom Checkboxes Focus Visibility Pattern
**Learning:** Using `sr-only` class on an `<input type="checkbox">` hides it visually (which is good for screen readers and semantic HTML), but it removes the native browser focus outline for keyboard users navigating to that element. This makes custom checkbox designs completely inaccessible for keyboard users without a mouse.
**Action:** Always combine the hidden `<input className="sr-only peer">` with Tailwind's `peer` utility, and use `peer-focus-visible:ring-2` (and related styling) on the adjacent visual replacement `<div>` to ensure the focus state is clearly communicated visually.

## 2026-08-01 - Select Dropdown Visual Affordance Pattern
**Learning:** Applying Tailwind's `appearance-none` class to `<select>` elements removes the native browser dropdown arrow, causing the input to look indistinguishable from a regular text field. This removes a critical visual affordance for users indicating that they must choose from a predefined list.
**Action:** Whenever applying `appearance-none` to a `<select>`, always provide a custom dropdown icon (like `ChevronDown`) absolutely positioned to the right. Additionally, increase the right padding (e.g., `pr-10`) on the `<select>` to prevent the text content from overlapping the custom icon.
