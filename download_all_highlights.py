import os
import time
import json
import requests
import re
from concurrent.futures import ThreadPoolExecutor
from playwright.sync_api import sync_playwright

HIGHLIGHTS = [
    {"id": "18100347461336154", "name": "01_Tarifs_الأسعار_والتسعيرات", "url": "https://www.instagram.com/stories/highlights/18100347461336154/"},
    {"id": "18108834559984107", "name": "02_Conditions_تنبيهات_وشروط_الحجز", "url": "https://www.instagram.com/stories/highlights/18108834559984107/"},
    {"id": "18091656790226457", "name": "03_Temoignages_شهادات_وآراء_الزبائن", "url": "https://www.instagram.com/stories/highlights/18091656790226457/"},
    {"id": "18297743197117648", "name": "04_Soins_Cheveux_علاجات_الشعر", "url": "https://www.instagram.com/stories/highlights/18297743197117648/"},
    {"id": "17920372582696157", "name": "05_Cils_عناية_ورفع_الرموش", "url": "https://www.instagram.com/stories/highlights/17920372582696157/"},
    {"id": "17899275630337317", "name": "06_Callus_Peeling_تقشير_القدمين", "url": "https://www.instagram.com/stories/highlights/17899275630337317/"},
    {"id": "18053005333529511", "name": "07_Hydrafacial_جلسات_الهيدرافيشل", "url": "https://www.instagram.com/stories/highlights/18053005333529511/"},
    {"id": "17903669827997217", "name": "08_Onglerie_العناية_بالأظافر", "url": "https://www.instagram.com/stories/highlights/17903669827997217/"}
]

BASE_DIR = r"C:\Users\amir\Desktop\صالون\01_Instagram\03_Highlights_الهايلاتات"
os.makedirs(BASE_DIR, exist_ok=True)

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
}

def download_item(args):
    url, target_path = args
    if not url or url.startswith("blob:"):
        return False
    if os.path.exists(target_path) and os.path.getsize(target_path) > 1000:
        return True
    try:
        r = requests.get(url, headers=headers, timeout=6)
        if r.status_code == 200 and len(r.content) > 1000:
            with open(target_path, "wb") as f:
                f.write(r.content)
            return True
    except:
        pass
    return False

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
            viewport={"width": 1080, "height": 1920}
        )
        page = context.new_page()
        
        captured_media = []
        def handle_response(response):
            try:
                url = response.url
                if ("cdninstagram.com" in url or "fbcdn.net" in url) and any(ext in url for ext in [".jpg", ".mp4", ".webp"]):
                    if "s150x150" not in url and "p150x150" not in url:
                        captured_media.append(url)
            except:
                pass
                
        page.on("response", handle_response)
        
        for hl in HIGHLIGHTS:
            hl_folder = os.path.join(BASE_DIR, hl["name"])
            os.makedirs(hl_folder, exist_ok=True)
            print(f"\n==========================================")
            print(f"Highlight: {hl['name']}")
            
            captured_media.clear()
            page.goto(hl["url"], wait_until="domcontentloaded")
            time.sleep(3)
            
            seen_items = set()
            for step in range(8):
                current_imgs = page.eval_on_selector_all('img[src*="cdninstagram.com"], img[src*="fbcdn.net"]', 'els => els.map(e => e.src)')
                current_vids = page.eval_on_selector_all('video[src]', 'els => els.map(e => e.src)')
                for item in current_imgs + current_vids:
                    if "s150x150" not in item:
                        seen_items.add(item)
                page.keyboard.press("ArrowRight")
                time.sleep(1.2)
                if hl["id"] not in page.url and "/stories/highlights/" in page.url:
                    break
                    
            valid_urls = [u for u in (seen_items | set(captured_media)) if u and not u.startswith("blob:")]
            print(f"Captured {len(valid_urls)} items for {hl['name']}. Downloading in parallel...")
            
            tasks = []
            for idx, m_url in enumerate(valid_urls, 1):
                ext = ".mp4" if ".mp4" in m_url or "video" in m_url else ".jpg"
                out_path = os.path.join(hl_folder, f"Slide_{idx:02d}{ext}")
                tasks.append((m_url, out_path))
                
            with ThreadPoolExecutor(max_workers=8) as executor:
                results = list(executor.map(download_item, tasks))
                
            saved_count = sum(1 for r in results if r)
            print(f"Done {hl['name']}: {saved_count} items saved.")
            
        browser.close()

if __name__ == "__main__":
    run()
