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
## 2026-08-04 - Focus visibility on primary CTA buttons
**Learning:** In dark-themed applications, primary Call-To-Action (CTA) buttons that have inverted colors (e.g., white background with dark text on a dark backdrop) often lack sufficient focus visibility if they do not explicitly define a high-contrast focus ring with an offset. The default browser outline is frequently masked or insufficiently prominent against the button's own background color or the dark page background.
**Action:** When creating primary CTA buttons, especially in inverted or high-contrast color schemes, always append explicit focus-visible classes that include a clear ring and an offset matched to the page or container background (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950`) to ensure keyboard navigators can clearly see when the button is active.

## 2026-08-05 - Accessible Tabbed Interfaces Pattern
**Learning:** I encountered a section acting as a tabbed content area that was missing proper structural ARIA semantics. When `button` elements act as tabs switching content panes without the `tablist`, `tab`, and `tabpanel` roles, screen reader users cannot perceive the relationship between the controls and the content, nor the state of the active tab.
**Action:** Always implement the `role="tablist"` on the container, `role="tab"`, `aria-selected` and `aria-controls` on the tab buttons, and `role="tabpanel"` and `aria-labelledby` on the content panes to ensure the semantic structure of tabbed components is accessible.

## 2026-08-05 - Grouped Selectable Items Accessibility Pattern
**Learning:** Found custom selectable preset buttons (like LED color choices) that lacked semantic grouping and proper keyboard focus styles, making it hard for screen reader users to understand their relationship and for keyboard users to navigate.
**Action:** When creating a group of related selectable items, wrap them in a container with `role="group"` and a descriptive `aria-label`. Ensure individual items use `<button type="button">` with `focus-visible` styles and appropriate `aria-pressed` states to indicate selection.

## 2026-08-05 - Focus Visibility on Form Fields in Dark Mode
**Learning:** Found an accessibility issue pattern with form fields in dark mode, where removing the default outline and relying on subtle border changes creates a significant keyboard navigation barrier.
**Action:** When creating form fields, avoid relying solely on subtle border changes for focus states. Instead, use explicit focus ring classes like `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:border-transparent` to ensure keyboard navigators can clearly see when an input has focus.

## 2023-10-25 - Dynamic Price Updates Accessibility
**Learning:** Screen readers miss dynamically updating calculations (like totals) if they occur silently outside the user's immediate focus area. Simply updating the text value on the screen is not sufficient for accessibility when prices update based on user choices elsewhere on the page.
**Action:** When displaying dynamically updating values that are contextually important (such as an updating estimated price total), apply `aria-live="polite"` to the container to ensure screen readers announce changes as users configure options.

## 2026-08-10 - Modal Dialog Accessibility Pattern
**Learning:** Found that custom modal implementations often lack the necessary ARIA attributes (`role="dialog"`, `aria-modal="true"`, and `aria-labelledby`) and fail to manage initial focus, leaving screen reader users unaware they are in a dialog and forcing keyboard users to tab through the underlying page to find the modal content.
**Action:** When implementing custom modals, always add `role="dialog"`, `aria-modal="true"`, and link the modal's title using `aria-labelledby`. Additionally, ensure the first interactive element inside the modal receives focus automatically (e.g., using `autoFocus`) when it opens.
