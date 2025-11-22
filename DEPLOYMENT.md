# نظام إدارة الموظفين - Employee Management System

نظام ويب متكامل لإدارة سجلات الموظفين مبني باستخدام Next.js و Prisma.

## 🚀 النشر على Netlify

### المتطلبات الأساسية
- حساب على [Netlify](https://netlify.com)
- حساب GitHub (لربط المشروع)
- قاعدة بيانات PostgreSQL (موصى بها للإنتاج)

### خطوات النشر

#### 1. إعداد قاعدة البيانات

بما أن SQLite لا تعمل بشكل جيد على Netlify (بسبب نظام الملفات المؤقت)، يُنصح باستخدام قاعدة بيانات خارجية:

**خيارات قاعدة البيانات الموصى بها:**
- [Neon](https://neon.tech) - PostgreSQL مجاني
- [PlanetScale](https://planetscale.com) - MySQL مجاني
- [Supabase](https://supabase.com) - PostgreSQL مجاني
- [Railway](https://railway.app) - PostgreSQL

**مثال لاستخدام Neon:**
1. سجل حساب على [Neon](https://neon.tech)
2. أنشئ مشروع جديد
3. احصل على DATABASE_URL
4. حدّث `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // بدلاً من sqlite
  url      = env("DATABASE_URL")
}
```

#### 2. رفع المشروع إلى GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

#### 3. ربط المشروع مع Netlify

1. سجل دخول إلى [Netlify](https://app.netlify.com)
2. اضغط على "Add new site" > "Import an existing project"
3. اختر GitHub وحدد المستودع الخاص بك
4. ستكتشف Netlify تلقائياً إعدادات Next.js من ملف `netlify.toml`

#### 4. إعداد متغيرات البيئة في Netlify

في لوحة تحكم Netlify:
1. اذهب إلى Site settings > Environment variables
2. أضف المتغيرات التالية:

```
DATABASE_URL=<your-database-url>
```

#### 5. تشغيل Migration على قاعدة البيانات

بعد إعداد قاعدة البيانات، قم بتشغيل:

```bash
# محلياً مع DATABASE_URL الخاص بالإنتاج
npx prisma db push
```

أو استخدم Prisma Migrate:

```bash
npx prisma migrate deploy
```

#### 6. النشر

اضغط على "Deploy site" في Netlify. سيتم:
- تثبيت التبعيات
- توليد Prisma Client
- بناء المشروع
- نشر الموقع

### 🔧 التطوير المحلي

```bash
# تثبيت التبعيات
npm install

# إعداد قاعدة البيانات
npx prisma db push

# تشغيل السيرفر
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

## 📝 ملاحظات مهمة

### قاعدة البيانات
- **التطوير المحلي**: يمكن استخدام SQLite (ملف محلي)
- **الإنتاج (Netlify)**: يجب استخدام قاعدة بيانات خارجية (PostgreSQL/MySQL)

### الصور
- تم تعطيل تحسين الصور في Next.js (`unoptimized: true`) لتوافق أفضل مع Netlify
- إذا كنت تريد استخدام تحسين الصور، استخدم Netlify Image CDN

### Environment Variables
تأكد من إضافة جميع متغيرات البيئة في:
- `.env` للتطوير المحلي
- Netlify Dashboard للإنتاج

## 🛠️ التقنيات المستخدمة

- **Framework**: Next.js 14
- **Database ORM**: Prisma
- **Styling**: Tailwind CSS
- **Database**: SQLite (dev) / PostgreSQL (production)
- **Hosting**: Netlify

## 📚 الموارد المفيدة

- [Netlify Next.js Documentation](https://docs.netlify.com/frameworks/next-js/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## 🐛 استكشاف الأخطاء

### خطأ في البناء (Build Error)
- تحقق من أن جميع متغيرات البيئة مضافة في Netlify
- تأكد من أن DATABASE_URL صحيح

### خطأ في قاعدة البيانات
- تأكد من تشغيل `prisma db push` أو `prisma migrate deploy`
- تحقق من صلاحيات الاتصال بقاعدة البيانات

### خطأ في Prisma Client
- تأكد من أن `postinstall` script يعمل بشكل صحيح
- يمكنك إضافة `prisma generate` يدوياً في build command

## 📄 الترخيص

هذا المشروع مفتوح المصدر.
