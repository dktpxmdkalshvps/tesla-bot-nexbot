from playwright.sync_api import sync_playwright

def take_screenshot():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto('http://127.0.0.1:3000')

        # Press Tab to focus the first element (which should be our skip link)
        page.keyboard.press("Tab")

        # Wait a moment for any transitions
        page.wait_for_timeout(1000)

        # Take screenshot
        page.screenshot(path='skip-link-focused.png')
        browser.close()

take_screenshot()
