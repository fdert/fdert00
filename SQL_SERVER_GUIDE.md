# استخدام Microsoft SQL Server مع المشروع

## ✅ نعم، يمكنك استخدام SQL Server!

Prisma يدعم Microsoft SQL Server بشكل كامل. إليك كيفية إعداده:

---

## 🔧 الإعداد

### الخطوة 1: تحديث Prisma Schema

حدّث ملف `prisma/schema.prisma`:

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlserver"  // استخدم sqlserver بدلاً من sqlite
  url      = env("DATABASE_URL")
}

model Employee {
  id         String   @id @default(uuid())
  firstName  String
  lastName   String
  email      String   @unique
  department String
  role       String
  status     String   @default("Active")
  imageUrl   String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

---

## 🌐 خيارات SQL Server

### الخيار 1: Azure SQL Database (موصى به للإنتاج) ☁️

**المميزات:**
- ✅ مُدار بالكامل من Microsoft
- ✅ موثوق وآمن
- ✅ يعمل بشكل ممتاز مع Netlify
- ✅ نسخة مجانية متاحة

**الخطوات:**

1. **إنشاء حساب Azure**:
   - اذهب إلى https://azure.microsoft.com
   - سجل حساب مجاني (يعطيك $200 رصيد مجاني)

2. **إنشاء Azure SQL Database**:
   - اذهب إلى Azure Portal
   - اضغط "Create a resource"
   - ابحث عن "SQL Database"
   - اختر "Create"

3. **إعدادات قاعدة البيانات**:
   - **Subscription**: اختر Free Trial
   - **Resource Group**: أنشئ مجموعة جديدة
   - **Database name**: `employee-management`
   - **Server**: أنشئ server جديد
   - **Compute + storage**: اختر "Basic" (الأرخص)

4. **إعدادات الـ Server**:
   - **Server name**: اختر اسماً فريداً
   - **Location**: اختر المنطقة الأقرب
   - **Authentication**: SQL authentication
   - **Admin login**: اختر username
   - **Password**: اختر كلمة مرور قوية

5. **Firewall Settings**:
   - ✅ فعّل "Allow Azure services to access server"
   - ✅ أضف IP الخاص بك للوصول المحلي

6. **احصل على Connection String**:
   ```
   sqlserver://SERVER_NAME.database.windows.net:1433;database=DATABASE_NAME;user=USERNAME@SERVER_NAME;password=PASSWORD;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;
   ```

---

### الخيار 2: SQL Server محلي (للتطوير فقط) 💻

**للتطوير المحلي:**

1. **تثبيت SQL Server**:
   - حمّل SQL Server Express (مجاني)
   - أو استخدم SQL Server LocalDB

2. **Connection String**:
   ```
   sqlserver://localhost:1433;database=EmployeeDB;user=sa;password=YourPassword;encrypt=true;trustServerCertificate=true
   ```

⚠️ **تحذير**: لا يمكن استخدام SQL Server المحلي على Netlify!

---

### الخيار 3: خدمات SQL Server المُدارة الأخرى

#### Railway (سهل وسريع) 🚂
- https://railway.app
- يدعم SQL Server
- سهل الإعداد
- خطة مجانية محدودة

#### DigitalOcean Managed Databases 🌊
- https://www.digitalocean.com/products/managed-databases
- SQL Server مُدار
- موثوق وسريع

---

## 📝 تنسيق Connection String

### Azure SQL Database:
```env
DATABASE_URL="sqlserver://server-name.database.windows.net:1433;database=db-name;user=username;password=your-password;encrypt=true;trustServerCertificate=false"
```

### SQL Server المحلي:
```env
DATABASE_URL="sqlserver://localhost:1433;database=EmployeeDB;user=sa;password=YourPassword;encrypt=true;trustServerCertificate=true"
```

### مع Windows Authentication (محلي فقط):
```env
DATABASE_URL="sqlserver://localhost:1433;database=EmployeeDB;integratedSecurity=true;trustServerCertificate=true"
```

---

## 🚀 خطوات التطبيق

### 1. تحديث Schema

```bash
# عدّل prisma/schema.prisma
# غيّر provider إلى "sqlserver"
```

### 2. تحديث .env محلياً

```bash
# .env
DATABASE_URL="sqlserver://your-connection-string"
```

### 3. تشغيل Migration

```bash
# توليد Prisma Client
npx prisma generate

# تطبيق Schema على قاعدة البيانات
npx prisma db push

# (اختياري) فتح Prisma Studio
npx prisma studio
```

### 4. رفع التحديثات على GitHub

```bash
git add prisma/schema.prisma
git commit -m "chore: switch to SQL Server"
git push origin main
```

### 5. إضافة DATABASE_URL في Netlify

1. اذهب إلى Netlify Dashboard
2. Site settings > Environment variables
3. أضف:
   - **Key**: `DATABASE_URL`
   - **Value**: `sqlserver://your-azure-connection-string`

### 6. إعادة النشر

```bash
# في Netlify Dashboard
# Deploys > Trigger deploy > Deploy site
```

---

## 🔒 أمان Connection String

### ⚠️ لا تضع Connection String في الكود!

❌ **خطأ**:
```javascript
const connectionString = "sqlserver://...";
```

✅ **صحيح**:
```javascript
// استخدم متغيرات البيئة
const connectionString = process.env.DATABASE_URL;
```

### ملفات يجب حمايتها:

- ✅ `.env` - في `.gitignore`
- ✅ `DATABASE_URL` - في Netlify Environment Variables فقط
- ✅ كلمات المرور - لا ترفعها أبداً على GitHub

---

## 📊 مقارنة الخيارات

| الخيار | السعر | السهولة | الأداء | للإنتاج |
|--------|-------|---------|---------|----------|
| **Azure SQL** | مجاني/مدفوع | متوسط | ممتاز | ✅ نعم |
| **Neon (PostgreSQL)** | مجاني | سهل جداً | ممتاز | ✅ نعم |
| **Supabase (PostgreSQL)** | مجاني | سهل | جيد جداً | ✅ نعم |
| **PlanetScale (MySQL)** | مجاني | سهل | ممتاز | ✅ نعم |
| **SQL Server محلي** | مجاني | سهل | جيد | ❌ لا |

---

## 💡 التوصية

### للبدء السريع:
استخدم **Neon (PostgreSQL)** - أسهل وأسرع في الإعداد

### إذا كنت تفضل SQL Server:
استخدم **Azure SQL Database** - الخيار الأفضل للإنتاج

### للتطوير المحلي:
استخدم **SQL Server LocalDB** أو **Express**

---

## 🆘 استكشاف الأخطاء

### خطأ: "Login failed for user"
- تحقق من username و password
- تأكد من أن Firewall يسمح بالاتصال

### خطأ: "Cannot open server"
- تحقق من server name
- تأكد من أن SQL Server يعمل
- تحقق من port (عادة 1433)

### خطأ: "SSL connection error"
- أضف `encrypt=true` في connection string
- للمحلي: أضف `trustServerCertificate=true`

---

## 📚 موارد إضافية

- [Prisma SQL Server Docs](https://www.prisma.io/docs/concepts/database-connectors/sql-server)
- [Azure SQL Database](https://azure.microsoft.com/en-us/products/azure-sql/database/)
- [SQL Server Connection Strings](https://www.connectionstrings.com/sql-server/)

---

## ✅ الخلاصة

**نعم، يمكنك استخدام SQL Server!** 

الخطوات:
1. ✅ غيّر `provider` إلى `"sqlserver"` في schema.prisma
2. ✅ أنشئ قاعدة بيانات (Azure SQL أو محلي)
3. ✅ احصل على connection string
4. ✅ أضف `DATABASE_URL` في Netlify
5. ✅ شغّل `npx prisma db push`
6. ✅ انشر على Netlify

**للبدء السريع، أوصي بـ Neon (PostgreSQL) لأنه أسهل في الإعداد، لكن SQL Server يعمل بشكل ممتاز أيضاً!** 🚀
