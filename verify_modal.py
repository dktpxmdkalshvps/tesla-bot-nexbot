from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('http://localhost:3000')

        # Click Pre-order button in the header
        page.click('button#header-preorder-btn')

        # Wait for the modal to be visible and stable
        page.wait_for_selector('#installationCountry')

        # Take screenshot of the modal
        page.screenshot(path='modal_screenshot.png')

        browser.close()

if __name__ == '__main__':
    main()
