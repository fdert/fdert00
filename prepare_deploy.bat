@echo off
echo ====================================
echo تجهيز المشروع للنشر على Netlify
echo ====================================
echo.

echo [1/4] تثبيت التبعيات...
call npm install
if errorlevel 1 (
    echo خطأ في تثبيت التبعيات!
    pause
    exit /b 1
)

echo.
echo [2/4] توليد Prisma Client...
call npx prisma generate
if errorlevel 1 (
    echo خطأ في توليد Prisma Client!
    pause
    exit /b 1
)

echo.
echo [3/4] بناء المشروع...
call npm run build
if errorlevel 1 (
    echo خطأ في بناء المشروع!
    pause
    exit /b 1
)

echo.
echo [4/4] اختبار البناء...
echo تم بناء المشروع بنجاح!
echo.
echo ====================================
echo المشروع جاهز للنشر على Netlify!
echo ====================================
echo.
echo الخطوات التالية:
echo 1. ارفع المشروع إلى GitHub
echo 2. اربط المستودع مع Netlify
echo 3. أضف متغيرات البيئة في Netlify
echo 4. انشر المشروع
echo.
echo راجع ملف DEPLOYMENT.md للمزيد من التفاصيل
echo.
pause
