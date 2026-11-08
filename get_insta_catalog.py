import time
import json
import os
from playwright.sync_api import sync_playwright

def get_instagram_catalog():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
        )
        page = context.new_page()
        
        # 1. Main Profile
        print("Navigating to profile...")
        page.goto("https://www.instagram.com/joven_institut/", wait_until="domcontentloaded")
        time.sleep(5)
        
        # Extract Highlights
        # Highlights are usually listed right above the posts grid
        highlights_data = []
        highlight_links = page.query_selector_all('a[href*="/stories/highlights/"]')
        print(f"Found {len(highlight_links)} highlight links on page")
        for hl in highlight_links:
            href = hl.get_attribute("href")
            text = hl.inner_text().strip()
            # find img src if any
            img = hl.query_selector("img")
            img_src = img.get_attribute("src") if img else None
            highlights_data.append({
                "url": f"https://www.instagram.com{href}" if href.startswith('/') else href,
                "title": text,
                "cover": img_src
            })
            
        print("Highlights:", highlights_data)
        
        # Extract all posts by scrolling down the main page
        posts_urls = set()
        for i in range(15):
            links = page.eval_on_selector_all('a[href*="/p/"], a[href*="/reel/"]', 'els => els.map(e => e.href)')
            for l in links:
                posts_urls.add(l)
            page.mouse.wheel(0, 1500)
            time.sleep(2)
            
        print(f"Found {len(posts_urls)} posts/reels on main profile")
        
        # 2. Go to Reels tab
        page.goto("https://www.instagram.com/joven_institut/reels/", wait_until="domcontentloaded")
        time.sleep(5)
        reels_urls = set()
        for i in range(15):
            links = page.eval_on_selector_all('a[href*="/reel/"]', 'els => els.map(e => e.href)')
            for l in links:
                reels_urls.add(l)
            page.mouse.wheel(0, 1500)
            time.sleep(2)
            
        print(f"Found {len(reels_urls)} reels on Reels tab")
        
        all_catalog = {
            "highlights": highlights_data,
            "posts_and_reels": list(posts_urls),
            "reels_tab": list(reels_urls)
        }
        
        with open("insta_catalog.json", "w", encoding="utf-8") as f:
            json.dump(all_catalog, f, ensure_ascii=False, indent=2)
            
        browser.close()

if __name__ == "__main__":
    get_instagram_catalog()
