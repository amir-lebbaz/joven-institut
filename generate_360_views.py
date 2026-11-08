import os
import time
import subprocess
import json
from playwright.sync_api import sync_playwright

MAPS_URL = "https://www.google.com/maps/place/JOVEN+institut+de+beaut%C3%A9+et+soins/@36.7501283,3.0210355,695m/data=!3m1!1e3!4m6!3m5!1s0x128fb38036d758d9:0x2a85e75626a7cbde!8m2!3d36.7499612!4d3.0206314!16s%2Fg%2F11jp04gkqb?hl=fr-DZ&entry=ttu"

OUT_360_DIR = r"C:\Users\amir\Desktop\صالون\02_Google_Maps\02_صور_وفيديوهات_360_درجة_360_Views"
FFMPEG = r"C:\Users\amir\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe"

os.makedirs(OUT_360_DIR, exist_ok=True)

def capture_360():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
            locale="fr-DZ",
            viewport={"width": 1920, "height": 1080}
        )
        page = context.new_page()
        print("Navigating to Google Maps...")
        page.goto(MAPS_URL, wait_until="domcontentloaded")
        time.sleep(5)
        
        # Click on the Street View button
        sv_btn = page.query_selector('button[aria-label*="Street View 1"], button.jtJMuf')
        if sv_btn:
            print("Clicking Street View 1...")
            sv_btn.click()
            time.sleep(5)
            
        print("Current URL in Street View:", page.url)
        
        # Hide Google Maps overlays/UI to get clean 360 imagery
        try:
            page.add_style_tag(content='''
                .app-viewcard-strip, #titlecard, .widget-scene-card, .scene-footer, 
                button[aria-label*="zoom"], button[aria-label*="Zoom"], #minimap,
                .app-controls, div[role="region"], div[aria-label*="boussole"],
                div[jsaction*="compass"] { display: none !important; opacity: 0 !important; }
            ''')
            time.sleep(1)
        except Exception as e:
            print("Style error:", e)
            
        # Capture 360 degree rotation (36 frames around a full circle)
        frames_dir = os.path.join(OUT_360_DIR, "frames_360_scene_1")
        os.makedirs(frames_dir, exist_ok=True)
        
        print("Capturing 360 degree frames...")
        num_frames = 36
        drag_step = 1920 // num_frames
        
        for i in range(num_frames):
            frame_path = os.path.join(frames_dir, f"frame_{i:03d}.png")
            page.screenshot(path=frame_path)
            
            # Drag mouse horizontally to pan 360 degrees
            page.mouse.move(960, 540)
            page.mouse.down()
            page.mouse.move(960 - 80, 540, steps=5)
            page.mouse.up()
            time.sleep(0.5)
            
        print("Saved 36 panoramic frames successfully!")
        
        # Capture high quality key panoramic perspectives
        perspectives = [
            ("01_واجهة_المدخل_الرئيسي_Entrance.jpg", 0),
            ("02_زاوية_الشارع_اليمين_Street_Right.jpg", 90),
            ("03_المنظر_المقابل_الخلفي_Opposite.jpg", 180),
            ("04_زاوية_الشارع_اليسار_Street_Left.jpg", 270)
        ]
        for name, angle in perspectives:
            p_path = os.path.join(OUT_360_DIR, name)
            page.screenshot(path=p_path)
            # rotate
            page.mouse.move(960, 540)
            page.mouse.down()
            page.mouse.move(960 - 240, 540, steps=5)
            page.mouse.up()
            time.sleep(0.5)
            
        browser.close()

    # Compile the 360 frames into an ultra-smooth high-definition rotating video (MP4)
    print("Compiling 360 rotating video with FFmpeg...")
    video_output = os.path.join(OUT_360_DIR, "فيديو_جولة_360_درجة_محيط_الصالون_JOVEN_360.mp4")
    cmd_ffmpeg = [
        FFMPEG, "-y",
        "-framerate", "12",
        "-i", os.path.join(OUT_360_DIR, "frames_360_scene_1", "frame_%03d.png"),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-vf", "scale=1920:1080",
        video_output
    ]
    res = subprocess.run(cmd_ffmpeg, capture_output=True, text=True)
    if res.returncode == 0:
        print("360 Degree rotating video created successfully:", video_output)
    else:
        print("FFmpeg error:", res.stderr[:200])

if __name__ == "__main__":
    capture_360()
