## 2024-03-24 - Hiding Decorative Icons

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

## 2026-08-11 - Skip-to-content Link Pattern
**Learning:** Modern web applications often have complex sticky headers or navigation bars that can be tedious for keyboard-only and screen reader users to tab through on every single page load. A "skip to main content" link is a critical accessibility standard that is often forgotten.
**Action:** Always implement a visually hidden skip-to-content link at the very top of the application's DOM tree (`<a href="#main-content" className="sr-only focus:not-sr-only...">Skip to main content</a>`). Ensure the `<main>` element has the corresponding `id="main-content"`, `tabIndex={-1}`, and `focus:outline-none` so it can programmatically receive focus without displaying a confusing focus ring on the entire page wrapper.

## 2026-08-12 - Copy to Clipboard Feedback Pattern
**Learning:** Found that when users are presented with randomly generated important information (like a reservation ID), they often manually highlight and copy it. Providing a dedicated copy button improves UX, but without visual feedback, users are unsure if the action succeeded.
**Action:** When implementing 'copy to clipboard' functionality, always provide immediate temporary visual feedback (e.g., toggling an icon from 'Copy' to 'Check' for a few seconds using a timeout) and ensure the button is fully accessible with a descriptive aria-label, title tooltip, and focus states.

## 2026-08-19 - Consistent Inline Form Validation
**Learning:** Found that while required inputs (Name and Email) provided a visual checkmark when successfully populated, optional inputs (like Phone Number) did not provide any feedback. This inconsistency creates a disjointed user experience where users might think the form is broken or their optional input was not accepted.
**Action:** Provide consistent inline validation feedback (such as displaying a green checkmark icon) inside all form input fields when the user has entered valid data, ensuring that right padding (e.g., `pr-10`) is adjusted to prevent text from overlapping the icon. Consistency across both required and optional fields creates a more unified UX.

## 2026-08-20 - Form Autofill UX and Optional Indicators
**Learning:** Found that checkout and pre-order forms often neglect native HTML `autoComplete` attributes, which forces users (especially on mobile) to manually type standard information like their name, email, and phone number. This creates unnecessary friction. Additionally, not explicitly marking optional fields creates cognitive load, as users might worry a missing asterisk implies it's still required.
**Action:** Always enhance form UX by applying standard browser `autoComplete` attributes (`name`, `email`, `tel`, `country-name`, etc.) to corresponding input fields. Furthermore, explicitly append an `(Optional)` label to non-required fields to completely eliminate user ambiguity.
## 2026-08-22 - Mobile Menu Escape Key Pattern
**Learning:** Found that while custom modals often correctly implement the Escape key for closure, mobile navigation menus/drawers often lack this fundamental keyboard accessibility feature. Users navigating with a keyboard expect to be able to dismiss any full-screen or prominent overlay using the Escape key.
**Action:** When implementing dismissible overlays (e.g., mobile menus, drawers), always attach a keyboard event listener for the `Escape` key to automatically close the overlay, and add `title="Close (Esc)"` to the toggle button to improve discoverability.

## 2026-08-24 - Active Navigation Item ARIA Pattern
**Learning:** Found that while navigation menus often have visual styling (like highlights or underlines) to indicate the active page or section, this state is invisible to screen reader users if standard ARIA attributes are missing.
**Action:** When creating navigation menus (both desktop and mobile), always dynamically apply `aria-current="true"` (or `aria-current="page"`) to the `<button>` or `<a>` element that corresponds to the currently active section.
## 2023-10-26 - Accessible Copy to Clipboard Feedback
**Learning:** Sighted users often rely on visual cues (like an icon changing to a checkmark) for successful 'copy to clipboard' actions, but screen reader users miss this feedback completely unless it's explicitly announced.
**Action:** When implementing 'copy to clipboard' or similar asynchronous success states, always pair the visual feedback with an `aria-live="polite"` region (e.g., `<span className="sr-only" aria-live="polite">{copied ? 'Copied' : ''}</span>`) and dynamically update the button's `aria-label` and `title` attributes.

## 2024-05-24 - Modal State Change Focus Management
**Learning:** When a custom modal dialog's internal state changes significantly (e.g., from a form to a success view), keyboard focus can be lost and reset to the document body, causing a poor experience for keyboard and screen reader users.
**Action:** Always explicitly apply `autoFocus` to the next logical element (like a 'Close' button) when the modal's primary view changes entirely.

## 2026-08-28 - Focus Visibility on Text Links
**Learning:** Found that text links, such as those in the footer navigation, often rely only on hover states (like text color changes) and lack explicit `focus-visible` styles. Against dark backgrounds, the browser default focus ring is often invisible, creating a severe accessibility issue for keyboard users.
**Action:** Always append explicit focus ring classes to all `<a>` and `<button>` text links (e.g., `rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950`) to ensure keyboard navigators can clearly see when a link is focused.

## 2026-08-28 - Hidden Decorative Icons
**Learning:** Assistive technologies and screen readers can read purely decorative icons nested inside elements like buttons, creating a redundant and annoying experience. If the parent element contains text that properly describes its function, the icon shouldn't be announced.
**Action:** Always add `aria-hidden="true"` to purely decorative icons (such as directional arrows inside CTA buttons or links) when the parent element has adequate descriptive text.
