#!/bin/bash

# سكريبت تحديث التطبيق على VPS
# استخدام: ./update-vps.sh

echo "======================================"
echo "تحديث Employee Management System"
echo "======================================"
echo ""

# الانتقال إلى مجلد المشروع
cd /var/www/employee-management || exit

echo "[1/6] جلب آخر التحديثات من GitHub..."
git pull origin main

echo ""
echo "[2/6] تثبيت/تحديث التبعيات..."
npm install

echo ""
echo "[3/6] توليد Prisma Client..."
npx prisma generate

echo ""
echo "[4/6] تطبيق تغييرات قاعدة البيانات..."
npx prisma db push

echo ""
echo "[5/6] بناء المشروع..."
npm run build

echo ""
echo "[6/6] إعادة تشغيل التطبيق..."
pm2 restart employee-management

echo ""
echo "======================================"
echo "✅ تم التحديث بنجاح!"
echo "======================================"
echo ""
echo "للتحقق من حالة التطبيق:"
echo "  pm2 status"
echo ""
echo "لعرض السجلات:"
echo "  pm2 logs employee-management"
echo ""
