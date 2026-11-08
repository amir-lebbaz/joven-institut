import os
from playwright.sync_api import sync_playwright

HTML_PATH = os.path.abspath("salon_report.html")
PDF_DEST = r"C:\Users\amir\Desktop\صالون\04_التقرير_الشامل_PDF\دليل_الملفات_الشامل_JOVEN_Institut.pdf"

os.makedirs(os.path.dirname(PDF_DEST), exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page()
    page.goto(f"file:///{HTML_PATH.replace(os.sep, '/')}", wait_until="networkidle")
    page.pdf(
        path=PDF_DEST,
        format="A4",
        print_background=True,
        margin={"top": "12mm", "bottom": "15mm", "left": "12mm", "right": "12mm"}
    )
    browser.close()

print("PDF successfully generated at:", PDF_DEST)
