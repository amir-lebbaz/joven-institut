import time
import json
import re
import os
import requests
from playwright.sync_api import sync_playwright

MAPS_URL = "https://www.google.com/maps/place/JOVEN+institut+de+beaut%C3%A9+et+soins/@36.7501283,3.0210355,695m/data=!3m1!1e3!4m6!3m5!1s0x128fb38036d758d9:0x2a85e75626a7cbde!8m2!3d36.7499612!4d3.0206314!16s%2Fg%2F11jp04gkqb?hl=fr-DZ&entry=ttu"

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
            locale="fr-DZ",
            viewport={"width": 1280, "height": 900}
        )
        page = context.new_page()
        page.goto(MAPS_URL, wait_until="domcontentloaded")
        time.sleep(5)
        
        # 1. Click on "Photo de JOVEN institut de beauté et soins"
        hero_photo = page.query_selector('button[aria-label*="Photo de JOVEN"]')
        if hero_photo:
            hero_photo.click()
            time.sleep(4)
            print("Opened photo gallery")
            
        # Check tabs in photo gallery
        tabs = page.query_selector_all('button[role="tab"]')
        for t in tabs:
            print("Photo Tab:", t.inner_text())
            
        # Let's extract all photo background-image or img src inside the photo list
        # In Google Maps photo gallery, photos are in a scrollable list
        # Usually div.m6QErb with role="main" or role="region"
        photo_urls = set()
        
        for scroll_i in range(10):
            # Find all images and background images
            imgs = page.eval_on_selector_all('div[style*="background-image"], img[src*="googleusercontent.com"]', '''
                elements => elements.map(e => {
                    let style = e.getAttribute("style") || "";
                    let m = style.match(/url\\("?([^"\\)]+)"?\\)/);
                    if (m) return m[1];
                    return e.src || "";
                }).filter(Boolean)
            ''')
            for url in imgs:
                if 'googleusercontent.com' in url:
                    # Upgrade to high resolution: replace =w...-h... with =s2048 or =w1920-h1080
                    high_res = re.sub(r'=w\d+-h\d+.*', '=s2048', url)
                    high_res = re.sub(r'=s\d+.*', '=s2048', high_res)
                    photo_urls.add((url, high_res))
                    
            # Scroll down the gallery pane
            page.mouse.wheel(0, 1000)
            time.sleep(1.5)
            
        print(f"Extracted {len(photo_urls)} Google Maps photos!")
        
        # 2. Check 360 / Street View tab if available
        sv_tab = page.query_selector('button[role="tab"]:has-text("Street View"), button[role="tab"]:has-text("360")')
        if sv_tab:
            print("Clicking Street View / 360 tab...")
            sv_tab.click()
            time.sleep(3)
            # Extract 360 links/panoramas
            sv_imgs = page.eval_on_selector_all('div[style*="background-image"], img[src*="googleusercontent.com"]', '''
                elements => elements.map(e => {
                    let style = e.getAttribute("style") || "";
                    let m = style.match(/url\\("?([^"\\)]+)"?\\)/);
                    if (m) return m[1];
                    return e.src || "";
                }).filter(Boolean)
            ''')
            print(f"Found {len(sv_imgs)} images in 360 tab")
            
        # Save photo metadata
        with open("gmaps_photos.json", "w", encoding="utf-8") as f:
            json.dump(list(photo_urls), f, ensure_ascii=False, indent=2)
            
        browser.close()

if __name__ == "__main__":
    run()
