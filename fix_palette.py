import re

with open(".Jules/palette.md", "r") as f:
    content = f.read()

content = re.sub(
    r"<<<<<<< HEAD\n## 2026-08-28 - Focus Visibility on Text Links\n\*\*Learning:\*\* Found that text links, such as those in the footer navigation, often rely only on hover states \(like text color changes\) and lack explicit `focus-visible` styles. Against dark backgrounds, the browser default focus ring is often invisible, creating a severe accessibility issue for keyboard users.\n\*\*Action:\*\* Always append explicit focus ring classes to all `<a>` and `<button>` text links \(e.g., `rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950`\) to ensure keyboard navigators can clearly see when a link is focused.\n=======\n\*\*Learning:\*\* Assistive technologies and screen readers can read purely decorative icons nested inside elements like buttons, creating a redundant and annoying experience. If the parent element contains text that properly describes its function, the icon shouldn't be announced.\n\*\*Action:\*\* Always add `aria-hidden=\"true\"` to purely decorative icons \(such as directional arrows inside CTA buttons or links\) when the parent element has adequate descriptive text.\n>>>>>>> origin/main",
    """## 2026-08-28 - Focus Visibility on Text Links
**Learning:** Found that text links, such as those in the footer navigation, often rely only on hover states (like text color changes) and lack explicit `focus-visible` styles. Against dark backgrounds, the browser default focus ring is often invisible, creating a severe accessibility issue for keyboard users.
**Action:** Always append explicit focus ring classes to all `<a>` and `<button>` text links (e.g., `rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950`) to ensure keyboard navigators can clearly see when a link is focused.

## 2026-08-28 - Hidden Decorative Icons
**Learning:** Assistive technologies and screen readers can read purely decorative icons nested inside elements like buttons, creating a redundant and annoying experience. If the parent element contains text that properly describes its function, the icon shouldn't be announced.
**Action:** Always add `aria-hidden="true"` to purely decorative icons (such as directional arrows inside CTA buttons or links) when the parent element has adequate descriptive text.""",
    content
)

with open(".Jules/palette.md", "w") as f:
    f.write(content)
