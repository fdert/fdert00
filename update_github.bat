@echo off
echo ====================================
echo تحديث الملفات على GitHub
echo ====================================
echo.

echo [1/4] إضافة جميع الملفات الجديدة والمحدثة...
git add .

echo.
echo [2/4] عرض الملفات التي سيتم رفعها...
git status

echo.
echo [3/4] عمل Commit...
git commit -m "Update: Add Netlify deployment configuration and documentation"

echo.
echo [4/4] رفع التحديثات إلى GitHub...
git push origin main

echo.
echo ====================================
echo تم تحديث الملفات على GitHub بنجاح!
echo ====================================
echo.
pause
