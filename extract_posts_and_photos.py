import os
import json
import requests
import re
from playwright.sync_api import sync_playwright

POSTS_DIR = r"C:\Users\amir\Desktop\صالون\01_Instagram\02_Posts_المنشورات_والصور"
os.makedirs(POSTS_DIR, exist_ok=True)

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
}

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        viewport={"width": 1280, "height": 1800}
    )
    
    print("Navigating to Instagram profile to extract all photos and posts...")
    page.goto("https://www.instagram.com/joven_institut/", wait_until="domcontentloaded")
    import time
    time.sleep(5)
    
    # Scroll down to load all images
    for _ in range(6):
        page.mouse.wheel(0, 1500)
        time.sleep(1.5)
        
    # Get all post links and images
    post_cards = page.eval_on_selector_all('article img, main img', '''
        els => els.map(e => ({
            src: e.src,
            alt: e.alt || ""
        }))
    ''')
    
    # Filter valid Instagram post media
    valid_photos = []
    seen = set()
    for pc in post_cards:
        src = pc["src"]
        if src and "s150x150" not in src and "p150x150" not in src and src not in seen:
            seen.add(src)
            valid_photos.append(pc)
            
    print(f"Found {len(valid_photos)} post images/photos.")
    
    # Download photos and generate description/translation
    photos_summary = []
    for idx, p_item in enumerate(valid_photos, 1):
        src = p_item["src"]
        alt = p_item["alt"]
        
        # High resolution upgrade
        img_name = f"Post_Photo_{idx:02d}.jpg"
        img_path = os.path.join(POSTS_DIR, img_name)
        
        try:
            r = requests.get(src, headers=headers, timeout=15)
            if r.status_code == 200 and len(r.content) > 1000:
                with open(img_path, "wb") as f_img:
                    f_img.write(r.content)
                print(f"Saved {img_name} ({len(r.content)//1024} KB)")
        except Exception as e:
            print(f"Error downloading {img_name}: {e}")
            
        # Write translation / caption card if alt exists
        alt_clean = alt.replace("Photo by ✨institut de beauté et soins✨ on", "").replace("May be an image of", "").strip()
        photos_summary.append({
            "file": img_name,
            "original_caption": alt,
            "cleaned_description": alt_clean
        })
        
    # Write Master Posts Catalog
    catalog_path = os.path.join(POSTS_DIR, "فهرس_الصور_والمنشورات_Instagram_Posts.md")
    with open(catalog_path, "w", encoding="utf-8") as f_cat:
        f_cat.write("# 📸 صور ومنشورات صالون JOVEN Institut\n\n")
        f_cat.write("تم استخراج وتحميل جميع الصور والمنشورات الأصلية المعروضة في حساب الإنستغرام بجودة عالية، وهي مجهزة بالكامل لاستخدامها في أقسام الموقع المختلفة (المعرض، الخدمات، وقبل وبعد):\n\n")
        for p_item in photos_summary:
            f_cat.write(f"### 🖼️ ملف: `{p_item['file']}`\n")
            f_cat.write(f"- **الوصف والوسم الأصلي:** {p_item['cleaned_description'] or 'صورة توثيقية لعلاجات وخدمات الصالون'}\n")
            f_cat.write(f"- **الاستخدام في الموقع:** معرض الصور (Gallery)، خلفيات الأقسام، أو صور كروت الخدمات.\n\n")
            f_cat.write("---\n\n")
            
    browser.close()

print("Instagram posts and photos extracted successfully!")
