import time
import json
import os
import requests
from playwright.sync_api import sync_playwright

MAPS_URL = "https://www.google.com/maps/place/JOVEN+institut+de+beaut%C3%A9+et+soins/@36.7501283,3.0210355,695m/data=!3m1!1e3!4m6!3m5!1s0x128fb38036d758d9:0x2a85e75626a7cbde!8m2!3d36.7499612!4d3.0206314!16s%2Fg%2F11jp04gkqb?hl=fr-DZ&entry=ttu"

def inspect():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
            locale="fr-DZ"
        )
        page = context.new_page()
        print("Navigating to Google Maps...")
        page.goto(MAPS_URL, wait_until="domcontentloaded")
        time.sleep(5)
        
        # Check for consent dialog
        try:
            reject_btn = page.query_selector('button[aria-label*="Tout refuser" i], button:has-text("Tout refuser"), button:has-text("Refuser tout")')
            if reject_btn:
                reject_btn.click()
                time.sleep(2)
        except Exception as e:
            print("Consent check:", e)
            
        print("Page title:", page.title())
        
        # Extract main metadata (name, rating, address, hours, phone)
        data = {}
        try:
            name_el = page.query_selector('h1')
            data['name'] = name_el.inner_text() if name_el else "JOVEN institut de beauté et soins"
        except:
            pass
            
        # Get all text details in the side panel
        items = page.query_selector_all('button[data-item-id], div[data-item-id]')
        details = []
        for it in items:
            txt = it.inner_text().strip()
            if txt:
                details.append(txt)
        data['details'] = details
        print("Details extracted:", len(details))
        for d in details[:10]:
            print(" - ", d.replace('\n', ' | '))
            
        # Look for photos button or gallery
        photo_btn = page.query_selector('button[aria-label*="Photos" i], button[aria-label*="photo" i], div.m6QErb button:has-text("Photos")')
        if not photo_btn:
            photo_btn = page.query_selector('button[jsaction*="photo"], img[src*="googleusercontent.com"]')
            
        if photo_btn:
            print("Clicking photo gallery button...")
            try:
                photo_btn.click()
                time.sleep(4)
            except Exception as e:
                print("Click error:", e)
                
        # Screenshot the current view
        page.screenshot(path="maps_gallery.png")
        print("Saved maps_gallery.png")
        
        # Look for category tabs (e.g. "Tous", "Visite virtuelle et 360°", "Vidéos", "Intérieur", etc.)
        tabs = page.query_selector_all('button[role="tab"]')
        tab_names = [t.inner_text() for t in tabs]
        print("Available photo tabs:", tab_names)
        
        browser.close()

if __name__ == "__main__":
    inspect()
