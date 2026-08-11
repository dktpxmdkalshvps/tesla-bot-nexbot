Let's consider another potential micro-UX.
"Keyboard shortcut hints".
In `Header.tsx`, there are menu items.
In `PreOrderModal.tsx`, we have a close button with `title="Close (Esc)"`.
Can we improve the Escape to close functionality elsewhere? Or add keyboard shortcuts?

What about `title` attributes on icon-only buttons?
In `App.tsx`:
```tsx
              <a href="#" aria-label="Twitter" className="...">
                <Twitter className="w-4 h-4" />
              </a>
```
We could add `title="Visit our Twitter page"`.

What about `CustomizerSection.tsx`?
The Upgrade items have:
```tsx
                      <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                        isChecked ? "bg-white border-white text-neutral-950" : "border-white/20"
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                      </div>
```
This is a custom checkbox. Should it have an `aria-hidden="true"` or similar? It's inside a `button` which handles the click. The button has `aria-pressed={isChecked}`. This is perfectly fine.

What about `SpecsSection.tsx`?
Tabs:
```tsx
            <button
              key={group.category}
              role="tab"
              aria-selected={activeCategoryIndex === index}
              aria-controls={`specs-panel-${index}`}
              id={`specs-tab-${index}`}
```
This is accessible.

Let's do the **Skip to main content** link! It's explicitly mentioned in the list of "ACCESSIBILITY CHECKS: Missing skip-to-content links".

Let's draft the plan for it.

### What is "Skip to main content"?
A visually hidden link at the very top of the page that becomes visible only when focused via keyboard (using `Tab`). It allows keyboard navigators and screen reader users to bypass long, repetitive header navigation and jump straight to the page content.

### Where to put it?
At the very beginning of the component tree, right inside `App.tsx`'s root `div`.
```tsx
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-white selection:text-neutral-950">

      {/* Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white focus:text-neutral-950 focus:font-display focus:text-sm focus:font-bold focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-neutral-950 transition-all"
      >
        Skip to main content
      </a>

      {/* Premium Header */}
      <Header onPreOrderClick={openDefaultPreOrder} activeSection={activeSection} />

      {/* Main Container */}
      <main id="main-content" className="relative" tabIndex={-1}>
```
Adding `tabIndex={-1}` to `<main>` is often needed so that it can receive focus programmatically from the skip link. Also `focus-visible:outline-none` so it doesn't show a ring when focused via the skip link.

Wait, is that under 50 lines? Yes, it's just adding the link and the id.

Let's test this locally.
