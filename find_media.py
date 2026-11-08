import time
from playwright.sync_api import sync_playwright

MAPS_URL = "https://www.google.com/maps/place/JOVEN+institut+de+beaut%C3%A9+et+soins/@36.7501283,3.0210355,695m/data=!3m1!1e3!4m6!3m5!1s0x128fb38036d758d9:0x2a85e75626a7cbde!8m2!3d36.7499612!4d3.0206314!16s%2Fg%2F11jp04gkqb?hl=fr-DZ&entry=ttu"

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        locale="fr-DZ"
    )
    page.goto(MAPS_URL, wait_until="domcontentloaded")
    time.sleep(5)
    
    # Click photo section directly (the hero photo / photo cards)
    # Let's find all clickable elements in the header / media area
    imgs = page.query_selector_all('button[aria-label*="Photo"], button[jsaction*="heroHeaderImage"], div[jsaction*="pane.heroHeaderImage"]')
    print("Found hero photo elements:", len(imgs))
    
    # Let's inspect all buttons with text or aria-label
    all_btns = page.eval_on_selector_all('button', 'els => els.map(e => ({aria: e.getAttribute("aria-label"), text: e.innerText, cls: e.className}))')
    for b in all_btns:
        if b['aria'] and any(k in b['aria'].lower() for k in ['photo', 'image', 'street', '360', 'avis', 'review']):
            print("Btn matching:", b)
            
    # Also find Street View / 360 specifically
    street_view_el = page.query_selector('button[aria-label*="Street View" i], button[aria-label*="360" i], a[href*="streetview"]')
    print("Street view element:", street_view_el)
    
    browser.close()
