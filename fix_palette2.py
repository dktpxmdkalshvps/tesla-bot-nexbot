import re

with open(".Jules/palette.md", "r") as f:
    content = f.read()

content = re.sub(
    r"<<<<<<< HEAD\n",
    "",
    content
)

content = re.sub(
    r"=======\n\*\*Learning:\*\* Assistive technologies and screen readers can read purely decorative icons nested inside elements like buttons, creating a redundant and annoying experience. If the parent element contains text that properly describes its function, the icon shouldn't be announced.\n\*\*Action:\*\* Always add `aria-hidden=\"true\"` to purely decorative icons \(such as directional arrows inside CTA buttons or links\) when the parent element has adequate descriptive text.\n>>>>>>> origin/main",
    """
## 2026-08-28 - Hidden Decorative Icons
**Learning:** Assistive technologies and screen readers can read purely decorative icons nested inside elements like buttons, creating a redundant and annoying experience. If the parent element contains text that properly describes its function, the icon shouldn't be announced.
**Action:** Always add `aria-hidden="true"` to purely decorative icons (such as directional arrows inside CTA buttons or links) when the parent element has adequate descriptive text.""",
    content
)

with open(".Jules/palette.md", "w") as f:
    f.write(content)
