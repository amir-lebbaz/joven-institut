import time
from playwright.sync_api import sync_playwright

HIGHLIGHT_URL = "https://www.instagram.com/stories/highlights/18100347461336154/"

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
    )
    print("Navigating to highlight...")
    page.goto(HIGHLIGHT_URL, wait_until="domcontentloaded")
    time.sleep(5)
    print("Title:", page.title())
    print("URL:", page.url)
    page.screenshot(path="highlight_test.png")
    
    # Check if video or img tag exists
    videos = page.eval_on_selector_all('video', 'els => els.map(e => e.src)')
    imgs = page.eval_on_selector_all('img', 'els => els.map(e => e.src)')
    print("Found videos in highlight:", len(videos), videos)
    print("Found images in highlight:", len(imgs), imgs[:5])
    
    browser.close()
