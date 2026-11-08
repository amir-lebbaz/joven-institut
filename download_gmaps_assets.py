import os
import json
import requests
import re
import time
from playwright.sync_api import sync_playwright

GMAPS_DIR = r"C:\Users\amir\Desktop\صالون\02_Google_Maps"
PHOTOS_DIR = os.path.join(GMAPS_DIR, "01_الصور_العامة_Photos")
VIEWS_360_DIR = os.path.join(GMAPS_DIR, "02_صور_وفيديوهات_360_درجة_360_Views")
INFO_DIR = os.path.join(GMAPS_DIR, "03_بيانات_الصالون_والمراجعات_Info_Reviews")

os.makedirs(PHOTOS_DIR, exist_ok=True)
os.makedirs(VIEWS_360_DIR, exist_ok=True)
os.makedirs(INFO_DIR, exist_ok=True)

# 1. Download Google Maps Photos from gmaps_photos.json
if os.path.exists("gmaps_photos.json"):
    with open("gmaps_photos.json", encoding="utf-8") as f:
        photos = json.load(f)
        
    print(f"Downloading {len(photos)} Google Maps photos...")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
    }
    
    downloaded_photos = []
    for i, p_info in enumerate(photos, 1):
        url = p_info[1] if isinstance(p_info, (list, tuple)) else p_info
        # make sure it is high res
        high_url = re.sub(r'=w\d+-h\d+.*', '=s2048', url)
        high_url = re.sub(r'=s\d+.*', '=s2048', high_url)
        
        file_name = f"Photo_{i:02d}.jpg"
        file_path = os.path.join(PHOTOS_DIR, file_name)
        try:
            r = requests.get(high_url, headers=headers, timeout=20)
            if r.status_code == 200 and len(r.content) > 1000:
                with open(file_path, "wb") as img_f:
                    img_f.write(r.content)
                print(f"Saved {file_name} ({len(r.content)//1024} KB)")
                downloaded_photos.append({"file": file_name, "url": high_url, "size_kb": len(r.content)//1024})
        except Exception as e:
            print(f"Error downloading {file_name}: {e}")
            
    with open(os.path.join(INFO_DIR, "photos_inventory.json"), "w", encoding="utf-8") as inv_f:
        json.dump(downloaded_photos, inv_f, ensure_ascii=False, indent=2)

print("Google Maps photos downloaded successfully!")
