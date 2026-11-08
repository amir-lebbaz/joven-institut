import os
import json
import subprocess
import glob

REELS = [
    "https://www.instagram.com/joven_institut/reel/DfNgPc3uxAf/",
    "https://www.instagram.com/joven_institut/reel/DfHPPF0sd80/",
    "https://www.instagram.com/joven_institut/reel/DfFvI-SBXoO/",
    "https://www.instagram.com/joven_institut/reel/De-D6CSMoFz/",
    "https://www.instagram.com/joven_institut/reel/De-HcrCsBlL/",
    "https://www.instagram.com/joven_institut/reel/De2PXedsRKA/",
    "https://www.instagram.com/joven_institut/reel/Deuj6P3MxAr/",
    "https://www.instagram.com/joven_institut/reel/DepQwh1sd0A/",
    "https://www.instagram.com/joven_institut/reel/DecTdpKsOaN/",
    "https://www.instagram.com/joven_institut/reel/DeUyq_1sFQN/",
    "https://www.instagram.com/joven_institut/reel/DePa1mosP9J/",
    "https://www.instagram.com/joven_institut/reel/DeNPuQnstLh/",
    "https://www.instagram.com/joven_institut/reel/Db3zyIIMhV0/",
    "https://www.instagram.com/joven_institut/reel/DZVjdIys26V/",
    "https://www.instagram.com/joven_institut/reel/DZ4_IpfsP1u/"
]

YT_DLP = r"C:\Users\amir\AppData\Local\Python\pythoncore-3.14-64\Scripts\yt-dlp.exe"
DEST_ORIGINAL = r"C:\Users\amir\Desktop\صالون\01_Instagram\01_Reels_الفيديوهات_القصيرة\بدون_ترجمة_Original"

os.makedirs(DEST_ORIGINAL, exist_ok=True)

metadata_list = []

for idx, url in enumerate(REELS, 1):
    code = url.strip("/").split("/")[-1]
    print(f"[{idx}/{len(REELS)}] Fetching metadata for {code}...")
    
    # Dump json metadata
    cmd_info = [YT_DLP, "--dump-json", url]
    res = subprocess.run(cmd_info, capture_output=True, text=True, encoding="utf-8")
    
    meta = {}
    if res.returncode == 0:
        try:
            meta = json.loads(res.stdout)
        except Exception as e:
            print(f"JSON parse error for {code}: {e}")
            
    out_template = os.path.join(DEST_ORIGINAL, f"Reel_{idx:02d}_{code}.%(ext)s")
    print(f"Downloading Reel_{idx:02d}_{code}...")
    cmd_dl = [YT_DLP, "-f", "bestvideo+bestaudio/best", "-o", out_template, url]
    res_dl = subprocess.run(cmd_dl, capture_output=True, text=True, encoding="utf-8")
    
    # Save clean metadata
    item = {
        "index": idx,
        "code": code,
        "url": url,
        "title": meta.get("title", f"Reel {code}"),
        "description": meta.get("description", ""),
        "upload_date": meta.get("upload_date", ""),
        "duration": meta.get("duration", None),
        "view_count": meta.get("view_count", None),
        "like_count": meta.get("like_count", None),
        "comment_count": meta.get("comment_count", None),
        "resolution": f"{meta.get('width', '')}x{meta.get('height', '')}"
    }
    metadata_list.append(item)
    print(f"Finished {code}: {item['title'][:40]} | Resolution: {item['resolution']}")

with open("reels_metadata.json", "w", encoding="utf-8") as f:
    json.dump(metadata_list, f, ensure_ascii=False, indent=2)

print("All reels processed!")
