import time
from playwright.sync_api import sync_playwright

MAPS_URL = "https://www.google.com/maps/place/JOVEN+institut+de+beaut%C3%A9+et+soins/@36.7501283,3.0210355,695m/data=!3m1!1e3!4m6!3m5!1s0x128fb38036d758d9:0x2a85e75626a7cbde!8m2!3d36.7499612!4d3.0206314!16s%2Fg%2F11jp04gkqb?hl=fr-DZ&entry=ttu"

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        locale="fr-DZ",
        viewport={"width": 1920, "height": 1080}
    )
    page.goto(MAPS_URL, wait_until="domcontentloaded")
    time.sleep(5)
    
    btns = page.query_selector_all("button.jtJMuf")
    print("Found button.jtJMuf:", len(btns))
    for i, b in enumerate(btns):
        aria = b.get_attribute("aria-label")
        print(f"Button {i}: aria={aria}")
        b.click()
        time.sleep(5)
        print(f"URL after click {i}:", page.url)
        page.screenshot(path=f"sv_click_{i}.png")
        page.goto(MAPS_URL, wait_until="domcontentloaded")
        time.sleep(4)
    browser.close()
