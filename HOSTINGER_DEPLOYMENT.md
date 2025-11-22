# 🚀 دليل النشر على Hostinger - الدليل الكامل

## 📋 نظرة عامة

هذا الدليل الشامل لنشر تطبيق Employee Management System على استضافة Hostinger.

---

## ⚠️ ملاحظة مهمة جداً

**Hostinger لديها خطط مختلفة:**

### 1. Hostinger Web Hosting (Shared Hosting)
- ❌ **لا يدعم Next.js** مباشرة
- ✅ يدعم فقط PHP, HTML, WordPress
- ❌ **لا يمكن استخدامه لهذا المشروع**

### 2. Hostinger VPS Hosting
- ✅ **يدعم Next.js بالكامل**
- ✅ تحكم كامل بالسيرفر
- ✅ يمكن تثبيت Node.js
- ⭐ **هذا ما تحتاجه**

### 3. Hostinger Cloud Hosting
- ✅ **يدعم Next.js**
- ✅ أسهل من VPS
- ⭐ **خيار جيد أيضاً**

---

## 🎯 الخيارات المتاحة لك

### الخيار 1: Hostinger VPS (موصى به) ⭐

**المميزات:**
- ✅ تحكم كامل
- ✅ يدعم Next.js
- ✅ أداء ممتاز
- ⚠️ يحتاج معرفة تقنية

**السعر:** يبدأ من $4.99/شهر

### الخيار 2: استخدام Netlify (الأسهل) 🚀

**لماذا Netlify أفضل؟**
- ✅ **مجاني تماماً**
- ✅ سهل جداً
- ✅ مُحسّن لـ Next.js
- ✅ لا يحتاج إعداد معقد
- ✅ SSL مجاني
- ✅ CDN عالمي

**التكلفة:** $0 (مجاني)

### الخيار 3: Vercel (مُحسّن لـ Next.js) ⚡

**المميزات:**
- ✅ مجاني
- ✅ مصمم خصيصاً لـ Next.js
- ✅ أسرع نشر
- ✅ SSL تلقائي

---

## 📊 مقارنة الخيارات

| المنصة | السعر | السهولة | الأداء | التوصية |
|--------|-------|---------|---------|----------|
| **Netlify** | مجاني | ⭐⭐⭐⭐⭐ | ممتاز | ⭐ الأفضل |
| **Vercel** | مجاني | ⭐⭐⭐⭐⭐ | ممتاز | ⭐ ممتاز |
| **Hostinger VPS** | $4.99+ | ⭐⭐ | جيد | ✅ إذا كنت تريد VPS |
| **Hostinger Shared** | $2.99+ | - | - | ❌ لا يدعم Next.js |

---

## 🔧 الحل 1: النشر على Hostinger VPS

### المتطلبات:
- ✅ Hostinger VPS plan
- ✅ معرفة أساسية بـ Linux/SSH
- ✅ وقت للإعداد (30-60 دقيقة)

### الخطوات:

#### 1. شراء VPS من Hostinger
1. اذهب إلى https://www.hostinger.com/vps-hosting
2. اختر خطة VPS (KVM 1 أو أعلى)
3. أكمل عملية الشراء

#### 2. الوصول إلى VPS عبر SSH

```bash
# من PowerShell أو CMD
ssh root@your-vps-ip-address
# أدخل كلمة المرور
```

#### 3. تثبيت Node.js

```bash
# تحديث النظام
sudo apt update && sudo apt upgrade -y

# تثبيت Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# التحقق من التثبيت
node --version
npm --version
```

#### 4. تثبيت Git

```bash
sudo apt install git -y
```

#### 5. استنساخ المشروع

```bash
# إنشاء مجلد للمشروع
mkdir -p /var/www
cd /var/www

# استنساخ من GitHub
git clone https://github.com/fdert/fdert00.git employee-management
cd employee-management
```

#### 6. تثبيت التبعيات

```bash
npm install
```

#### 7. إعداد متغيرات البيئة

```bash
# إنشاء ملف .env
nano .env
```

أضف:
```env
DATABASE_URL="mysql://username:password@host/database?sslaccept=strict"
NODE_ENV=production
PORT=3000
```

احفظ بـ `Ctrl+X` ثم `Y` ثم `Enter`

#### 8. إعداد قاعدة البيانات

```bash
# توليد Prisma Client
npx prisma generate

# تطبيق Schema
npx prisma db push
```

#### 9. بناء المشروع

```bash
npm run build
```

#### 10. تثبيت PM2 (Process Manager)

```bash
# تثبيت PM2 عالمياً
sudo npm install -g pm2

# تشغيل التطبيق
pm2 start npm --name "employee-management" -- start

# جعل PM2 يبدأ تلقائياً عند إعادة التشغيل
pm2 startup
pm2 save
```

#### 11. إعداد Nginx (Reverse Proxy)

```bash
# تثبيت Nginx
sudo apt install nginx -y

# إنشاء ملف تكوين
sudo nano /etc/nginx/sites-available/employee-management
```

أضف:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# تفعيل الموقع
sudo ln -s /etc/nginx/sites-available/employee-management /etc/nginx/sites-enabled/

# اختبار التكوين
sudo nginx -t

# إعادة تشغيل Nginx
sudo systemctl restart nginx
```

#### 12. إعداد SSL (اختياري لكن موصى به)

```bash
# تثبيت Certbot
sudo apt install certbot python3-certbot-nginx -y

# الحصول على شهادة SSL
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

#### 13. إعداد Firewall

```bash
# السماح بـ HTTP و HTTPS
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

---

## 🚀 الحل 2: النشر على Netlify (الأسهل والمجاني)

### لماذا Netlify؟
- ✅ **مجاني تماماً**
- ✅ **إعداد في 10 دقائق**
- ✅ **لا يحتاج VPS أو SSH**
- ✅ **SSL تلقائي**
- ✅ **CDN عالمي**

### الخطوات (10 دقائق):

1. **أنشئ قاعدة بيانات** (PlanetScale - مجاني)
   - https://planetscale.com
   - احصل على `DATABASE_URL`

2. **اذهب إلى Netlify**
   - https://app.netlify.com
   - سجل دخول بحساب GitHub

3. **استورد المشروع**
   - Add new site > Import from GitHub
   - اختر المستودع `fdert/fdert00`

4. **أضف متغيرات البيئة**
   - Site settings > Environment variables
   - أضف `DATABASE_URL`

5. **انشر!**
   - اضغط Deploy
   - انتظر 2-3 دقائق
   - تم! 🎉

**راجع ملف `QUICK_START.md` للتفاصيل الكاملة**

---

## 📦 ملفات تم إنشاؤها للنشر

### 1. ملف `ecosystem.config.js` (لـ PM2 على VPS)

```javascript
module.exports = {
  apps: [{
    name: 'employee-management',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/employee-management',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

### 2. ملف `.htaccess` (لا يعمل مع Next.js على Shared Hosting)

⚠️ **ملاحظة**: Hostinger Shared Hosting لا يدعم Next.js!

---

## 🔒 الأمان

### على VPS:

1. **تغيير كلمة مرور root**
```bash
passwd
```

2. **إنشاء مستخدم جديد**
```bash
adduser deployuser
usermod -aG sudo deployuser
```

3. **تعطيل تسجيل دخول root عبر SSH**
```bash
sudo nano /etc/ssh/sshd_config
# غيّر: PermitRootLogin no
sudo systemctl restart sshd
```

4. **تحديث النظام بانتظام**
```bash
sudo apt update && sudo apt upgrade -y
```

---

## 📊 إدارة التطبيق على VPS

### أوامر PM2 المفيدة:

```bash
# عرض حالة التطبيقات
pm2 status

# عرض السجلات
pm2 logs employee-management

# إعادة تشغيل التطبيق
pm2 restart employee-management

# إيقاف التطبيق
pm2 stop employee-management

# حذف التطبيق من PM2
pm2 delete employee-management

# مراقبة الأداء
pm2 monit
```

### تحديث التطبيق:

```bash
cd /var/www/employee-management
git pull origin main
npm install
npm run build
pm2 restart employee-management
```

---

## 🆘 استكشاف الأخطاء

### على VPS:

#### المشكلة: التطبيق لا يعمل
```bash
# تحقق من السجلات
pm2 logs employee-management

# تحقق من حالة PM2
pm2 status

# تحقق من Nginx
sudo nginx -t
sudo systemctl status nginx
```

#### المشكلة: خطأ في قاعدة البيانات
```bash
# تحقق من .env
cat .env

# اختبر الاتصال
npx prisma db push
```

#### المشكلة: Port مستخدم
```bash
# ابحث عن العملية
sudo lsof -i :3000

# أوقف العملية
sudo kill -9 PID
```

---

## 💰 التكاليف المقارنة

| الخدمة | التكلفة الشهرية | الإعداد | الصيانة |
|--------|-----------------|---------|---------|
| **Netlify** | $0 | سهل جداً | لا شيء |
| **Vercel** | $0 | سهل جداً | لا شيء |
| **Hostinger VPS** | $4.99+ | متوسط | متوسط |
| **Hostinger Shared** | $2.99+ | - | ❌ لا يدعم |

---

## ✅ التوصية النهائية

### للمبتدئين والبدء السريع:
**استخدم Netlify** 🚀
- مجاني
- سهل
- لا يحتاج خبرة تقنية
- جاهز في 10 دقائق

### إذا كنت تريد VPS:
**استخدم Hostinger VPS** 💻
- تحكم كامل
- يحتاج خبرة تقنية
- تكلفة شهرية

### للأداء الأفضل مع Next.js:
**استخدم Vercel** ⚡
- مجاني
- مُحسّن لـ Next.js
- أسرع نشر

---

## 📚 الملفات المرجعية

- **`QUICK_START.md`** - دليل Netlify السريع
- **`MYSQL_GUIDE.md`** - دليل قاعدة البيانات
- **`DEPLOYMENT.md`** - دليل النشر العام

---

## 🎯 الخلاصة

**لنشر على Hostinger:**
- ✅ تحتاج **VPS** (ليس Shared Hosting)
- ✅ تحتاج معرفة Linux/SSH
- ✅ التكلفة: $4.99+/شهر

**البديل الأفضل:**
- ⭐ **Netlify** - مجاني وسهل
- ⭐ **Vercel** - مجاني ومُحسّن لـ Next.js

**توصيتي: استخدم Netlify أو Vercel - أسهل وأسرع ومجاني!** 🚀

---

**إذا كنت تريد المتابعة مع Hostinger VPS، اتبع الخطوات أعلاه.**
**إذا كنت تريد الطريقة الأسهل، راجع `QUICK_START.md` للنشر على Netlify.**
