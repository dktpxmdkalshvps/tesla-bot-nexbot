import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Fix first conflict block
content = re.sub(
    r"<<<<<<< HEAD\n\s*<li><a href=\"#overview\" className=\"hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950\">Overview</a></li>\n\s*<li><a href=\"#technology\" className=\"hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950\">Technology Core</a></li>\n\s*<li><a href=\"#customizer\" className=\"hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950\">Design Customizer</a></li>\n\s*<li><a href=\"#specs\" className=\"hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950\">Technical specs</a></li>\n=======\n\s*<li><a href=\"#overview\" className=\"hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm\">Overview</a></li>\n\s*<li><a href=\"#technology\" className=\"hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm\">Technology Core</a></li>\n\s*<li><a href=\"#customizer\" className=\"hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm\">Design Customizer</a></li>\n\s*<li><a href=\"#specs\" className=\"hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm\">Technical specs</a></li>\n>>>>>>> origin/main",
    """              <li><a href="#overview" className="hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950">Overview</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950">Technology Core</a></li>
              <li><a href="#customizer" className="hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950">Design Customizer</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950">Technical specs</a></li>""",
    content
)

# Fix second conflict block
content = re.sub(
    r"<<<<<<< HEAD\n\s*<a href=\"#\" className=\"hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950\">Terms of Service</a>\n\s*<a href=\"#\" className=\"hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950\">Privacy and Cookies</a>\n=======\n\s*<a href=\"#\" className=\"hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm\">Terms of Service</a>\n\s*<a href=\"#\" className=\"hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm\">Privacy and Cookies</a>\n>>>>>>> origin/main",
    """            <a href="#" className="hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950">Privacy and Cookies</a>""",
    content
)

with open("src/App.tsx", "w") as f:
    f.write(content)
