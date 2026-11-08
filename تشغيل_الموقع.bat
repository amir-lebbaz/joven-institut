@echo off
chcp 65001 >nul
echo ========================================================
echo    JOVEN Institut de Beauté et Soins (Hydra, Alger)
echo       معهد جوفان للتجميل والعناية الفائقة للسيدات
echo ========================================================
echo.
echo [1/2] جاري التحقق من الخادم وقاعدة البيانات SQLite...

set PORT=3001
if exist "data\active_port.txt" (
    set /p PORT=<data\active_port.txt
)

netstat -ano | findstr :%PORT% >nul
if %errorlevel% equ 0 (
    echo [OK] الخادم يعمل بالفعل على المنفذ %PORT%
) else (
    echo [START] جاري بدء تشغيل الخادم...
    start /B node server/index.js
    timeout /t 2 /nobreak >nul
    if exist "data\active_port.txt" (
        set /p PORT=<data\active_port.txt
    )
)

echo [2/2] جاري فتح الموقع في المتصفح...
start http://localhost:%PORT%

echo.
echo ✨ تم تشغيل الموقع بنجاح!
echo - واجهة الزبونة: http://localhost:%PORT%
echo - لوحة الإدارة وتعديل الأسعار: متوفرة عبر الشريط العلوي
echo.
pause
