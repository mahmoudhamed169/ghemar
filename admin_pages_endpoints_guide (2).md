# دليل ربط واجهات لوحة التحكم (Admin Panel) مع الـ Endpoints

هذا الدليل يوضح التفاصيل التقنية لكل Endpoint تحتاجه صفحات الفرونت إند، بما في ذلك ما يجب إرساله (Request) وما سيتم استقباله (Response) لضمان الربط السليم 100%.

جميع الـ Endpoints هنا تتطلب إرسال الـ Token الخاص بالأدمن في الـ `Headers`:
`Authorization: Bearer <Admin_Token>`

---

## 1. صفحة لوحة التحكم (Dashboard / `board`)

### 1️⃣ `GET /api/admin/analytics/overview`
- **الوظيفة:** جلب الأرقام العلوية (الطلبات النشطة، الإيرادات هذا الشهر، إلخ).
- **الـ Request:** `?cityId=123` (اختياري للفلترة بمدينة معينة).
- **الـ Response:**
```json
{
  "success": true,
  "data": {
    "totalOrders": 150,
    "activeOrders": 12,
    "revenue": 5000,
    "activeDrivers": 5
  }
}
```

---

## 2. إدارة العملاء (`clients`)

### 1️⃣ `GET /api/admin/users`
- **الوظيفة:** جلب قائمة العملاء لملء الجدول الرئيسي والبحث.
- **الـ Request:** `?page=1&limit=25&search=050123` (الـ search يبحث في الهاتف أو الاسم).
- **الـ Response:**
```json
{
  "success": true,
  "data": [
    { "_id": "...", "name": "أحمد", "phone": "0501234567", "isActive": true, "currentPoints": 100 }
  ],
  "pagination": { "page": 1, "limit": 25, "total": 100, "pages": 4 }
}
```

### 2️⃣ `PUT /api/admin/users/:id/status`
- **الوظيفة:** تغيير حالة العميل (مفتاح الـ Toggle نشط/موقوف في الجدول، أو زر "حظر المستخدم").
- **الـ Request:** يرسل الـ `id` في الرابط فقط، ولا يحتاج Body.
- **الـ Response:**
```json
{
  "success": true,
  "data": { "isActive": false },
  "message": "User status updated"
}
```

### 3️⃣ `GET /api/admin/users/:id`
- **الوظيفة:** جلب تفاصيل العميل للمودال "عرض التفاصيل".
- **الـ Request:** الـ `id` في الرابط.
- **الـ Response:** 
```json
{
  "success": true,
  "data": {
    "user": {
      "createdAt": "2026-01-12T00:00:00Z",
      "availableBags": 2,
      "totalPointsEarned": 100
      // بقية البيانات كالموقع الجغرافي
    },
    "recentOrders": []
  }
}
```

### 4️⃣ `POST /api/admin/notifications/send`
- **الوظيفة:** زر "إرسال إشعار" لإرسال إشعار مخصص للعميل.
- *(مذكور بالتفصيل في قسم الإشعارات رقم 11)*

### 5️⃣ `GET /api/admin/orders?clientId={id}`
- **الوظيفة:** زر "سجل الأوردرات" لفتح مودال الأوردرات الخاصة بالعميل.
- *(مذكور بالتفصيل في قسم إدارة الأوردرات رقم 4، فقط أضف `clientId` للـ Query)*

---

## 3. إدارة السائقين (`drivers`)

### 1️⃣ `GET /api/admin/drivers`
- **الوظيفة:** جلب السائقين للجدول مع إمكانية الفلترة.
- **الـ Request:** `?page=1&limit=20&activityStatus=at_laundry` 
  *(activityStatus يفلتر السائقين بناءً على حالة الأوردرات التي يعملون عليها حالياً. القيم: available, at_laundry, driver_assigned)*
- **الـ Response:**
```json
{
  "success": true,
  "data": [ { "_id": "...", "name": "محسن", "phone": "...", "status": "active", "isOnline": true } ]
}
```

### 2️⃣ `POST /api/admin/drivers`
- **الوظيفة:** إضافة سائق جديد (عبر مودال "إضافة سائق").
- **الـ Request Body:** يجب إرسال `assignedAreas` لدعم اختيار (المناطق المتاح بها).
```json
{
  "name": "محسن أحمد",
  "phone": "0509999999",
  "cityId": "...",
  "assignedAreas": ["حي النزهة", "حي العقيق", "وسط المدينة"],
  "vehicleType": "van",
  "vehiclePlate": "ABC 123",
  "nationalId": "1020304050"
}
```

### 3️⃣ `PUT /api/admin/drivers/:id/status`
- **الوظيفة:** تغيير حالة السائق الإدارية (متاح، في المغسلة، أو "حظر المستخدم").
- **الـ Request Body:**
```json
{ "status": "suspended" } // active, suspended, deactivated
```

### 4️⃣ `GET /api/admin/drivers/:id`
- **الوظيفة:** جلب تفاصيل السائق (مودال "تفاصيل السائق").
- **الـ Request:** إرسال الـ `id` في الرابط.
- **الـ Response:**
```json
{
  "success": true,
  "data": {
    "createdAt": "2026-01-12T00:00:00Z",
    "assignedAreas": ["حي النزهة", "حي العقيق"],
    "performanceMetrics": { "totalDeliveries": 5 }
  }
}
```

### 5️⃣ `PUT /api/admin/drivers/:id`
- **الوظيفة:** زر "تعديل" لتحديث بيانات السائق الأساسية أو مناطقه.
- **الـ Request Body:** نفس شكل بيانات الإنشاء `POST`.

### 6️⃣ `POST /api/admin/notifications/send`
- **الوظيفة:** زر "ارسال اشعار" لإرسال إشعار للسائق.
- *(مذكور بالتفصيل في قسم الإشعارات رقم 11)*

### 7️⃣ `GET /api/admin/orders?driverId={id}`
- **الوظيفة:** زر "سجل الأوردرات" لفتح جدول خاص بأوردرات السائق.
- *(مذكور بالتفصيل في قسم الأوردرات، يدعم الفلترة بـ `driverId`)*

---

## 4. إدارة الأوردرات (`orders`)

### 1️⃣ `GET /api/admin/orders`
- **الوظيفة:** جلب الأوردرات حسب التابات (جاري/مكتمل) وفلتر المستعجل.
- **الـ Request:** `?status=pending&isExpressWash=true&dateFrom=...&dateTo=...`
- **الـ Response:** مصفوفة من الأوردرات مدمج معها بيانات العميل والسائق.

### 2️⃣ `PUT /api/admin/orders/:id/status`
- **الوظيفة:** تغيير حالة الأوردر بشكل جبري من القائمة المنسدلة.
- **الـ Request Body:**
```json
{ "status": "completed" }
```

### 3️⃣ `POST /api/admin/orders/:id/sort`
- **الوظيفة:** عند ضغط المغسلة على زر "بدأ الفرز" وإدخال تفاصيل القطع.
- **الـ Request Body:** (اختياري) إرسال مصفوفة بأنواع القطع كما في المودال.
```json
{
  "items": [
    { "itemType": "قميص", "count": 2 },
    { "itemType": "سروال", "count": 1 }
  ]
}
```
- **الـ Response:** 
```json
{ "success": true, "data": { "status": "at_laundry", "sortedItems": [...] }, "message": "Sorting started successfully" }
```

### 4️⃣ `GET /api/admin/orders/:id`
- **الوظيفة:** زر تفاصيل الأوردر لجلب تفاصيل ومسار (تتبع) الأوردر بالكامل.
- **الـ Request:** الـ `id` بالرابط.
- **الـ Response:** كائن الأوردر مع الـ `logs` والـ `sortedItems` إذا وجدت.

### 5️⃣ `PUT /api/admin/orders/:id/assign`
- **الوظيفة:** مودال "تعيين سائق" لتعيين سائق للأوردر يدوياً.
- **الـ Request Body:**
```json
{ "driverId": "65d..." }
```

### 💡 ملاحظة لصفحة "أوردرات العملاء الجدد":
يمكنك استخدام نفس الـ `GET /api/admin/orders` مع إضافة فلتر خاص إذا رغبت، أو الاعتماد على البيانات المرجعة في كل أوردر للتمييز بين العميل الجديد والقديم. 
*(تمت إضافة دعم الفلترة بـ `clientId` و `driverId` في المسار الرئيسي).*

---

## 5. إدارة الباقات (`paket`)

### 1️⃣ `GET /api/admin/packages/stats`
- **الوظيفة:** جلب الإحصائيات العلوية لصفحة الباقات (الكروت الأربعة بالأعلى).
- **الـ Response:**
```json
{
  "success": true,
  "data": {
    "totalPackages": 4,
    "activePackages": 4,
    "activeSubscriptions": 284,
    "revenue": 28450
  }
}
```

### 2️⃣ `GET /api/admin/packages`
- **الوظيفة:** جلب قائمة الباقات لعرضها في الكروت.
- **الـ Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65d...",
      "name": "الحقيبة الذهبية",
      "price": 299,
      "bagCount": 3,
      "isActive": true
    }
  ]
}
```

### 3️⃣ `POST /api/admin/packages`
- **الوظيفة:** إنشاء باقة جديدة (مودال "إنشاء باقة").
- **الـ Request Body:**
```json
{
  "name": "الباقة البلاتينية",
  "nameAr": "الباقة البلاتينية",
  "price": 399,
  "bagCount": 5,
  "description": "توصيل سريع وغسيل فاخر",
  "isActive": true
}
```

### 4️⃣ `PUT /api/admin/packages/:id`
- **الوظيفة:** تعديل بيانات باقة (مودال "تعديل").
- **الـ Request Body:** (أرسل الحقول المراد تعديلها فقط).

### 5️⃣ `DELETE /api/admin/packages/:id`
- **الوظيفة:** حذف باقة (مودال التأكيد). يتم الحذف بشكل ناعم (Soft Delete).
- **الـ Response:**
```json
{ "success": true, "message": "Package deleted successfully" }
```

---

## 6. أكواد الخصم (`codes`)

### 1️⃣ `GET /api/admin/promo-codes/stats`
- **الوظيفة:** إحصائيات الأكواد.
- **الـ Response:**
```json
{ "success": true, "data": { "totalPromoCodes": 10, "activePromoCodes": 5, "totalUsage": 581, "expiredPromoCodes": 2 } }
```

### 2️⃣ `GET /api/admin/promo-codes`
- **الوظيفة:** جلب الجدول الخاص بالأكواد.

### 3️⃣ `POST /api/admin/promo-codes`
- **الوظيفة:** إنشاء كود.
- **الـ Request Body:**
```json
{
  "code": "WINTER24",
  "discountType": "percentage",
  "discountValue": 20,
  "usageLimit": 100,
  "expiryDate": "2025-01-12T00:00:00.000Z"
}
```

### 4️⃣ `PUT /api/admin/promo-codes/:id/toggle`
- **الوظيفة:** زر الإيقاف والتشغيل (Toggle).

---

## 7. إدارة الباركود وحقائب الغسيل (`barcodes`)

### 1️⃣ `GET /api/admin/bags`
- **الوظيفة:** جلب قائمة الباركودات مع الفلترة والبحث (الجدول الرئيسي).
- **الـ Request:** `?status=in_laundry&search=محمد&dateFrom=...&page=1`
- **الـ Response:**
```json
{
  "success": true,
  "data": [
    {
      "barcode": "BG-2299",
      "status": "in_laundry",
      "assignedTo": { "name": "ماريهان رضوان", "phone": "051..." },
      "currentOrderId": { 
        "orderNumber": "AaB32", 
        "status": "processing",
        "driver": { "name": "احمد محمد" }
      },
      "createdAt": "2025-01-12T..."
    }
  ]
}
```

### 2️⃣ `POST /api/admin/bags/generate`
- **الوظيفة:** إنشاء باركودات جديدة (مودال "انشاء باركود جديد").
- **الـ Request Body:**
```json
{
  "count": 100,
  "namingType": "BG-XXXX",
  "packageId": "65d..."
}
```

### 3️⃣ `PUT /api/admin/bags/:barcode/replace`
- **الوظيفة:** زر "استبدال" لتعيين باركود جديد مكان التالف.
- **الـ Request Body:** `{ "newBarcode": "BG-9999" }`

---

## 8. التقارير المالية والفواتير (`reports`)

### 1️⃣ `GET /api/admin/invoices/stats`
- **الوظيفة:** جلب الإحصائيات العلوية لصفحة التقارير (إجمالي الإيرادات، الفواتير المدفوعة، إلخ).
- **الـ Response:**
```json
{
  "success": true,
  "data": {
    "totalRevenue": 38550,
    "invoicesThisMonth": 15,
    "paidInvoices": 8,
    "unpaidInvoices": 7
  }
}
```

### 2️⃣ `GET /api/admin/invoices`
- **الوظيفة:** جلب جدول الفواتير مع البحث والفلترة بالتاريخ.
- **الـ Request:** `?fromDate=2024-01-01&toDate=2024-02-01&search=أحمد&status=completed`
- **الـ Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65d...",
      "user": { "name": "أحمد", "phone": "050..." },
      "packageId": { "name": "الذهبية" },
      "amount": 115,
      "discountAmount": 10,
      "status": "completed",
      "createdAt": "2024-01-12T..."
    }
  ]
}
```

### 3️⃣ `GET /api/admin/invoices/:id`
- **الوظيفة:** جلب تفاصيل فاتورة محددة (مودال "فاتورة #INV-xxx").
- **الـ Response:** كائن الفاتورة يحتوي على تفاصيل العميل، الباقة، المبلغ الأساسي، الضريبة (14%)، والخصم.

---

## 9. المكافآت والنقاط (`rewards`)

### 1️⃣ `GET /api/admin/rewards/stats`
- **الوظيفة:** الإحصائيات العلوية للمكافآت.
- **الـ Response:**
```json
{
  "success": true,
  "data": { "totalIssued": 124850, "totalUsed": 48320, "activeUsers": 2341, "redemptionsCount": 863 }
}
```

### 2️⃣ `GET /api/admin/rewards/points`
- **الوظيفة:** جدول "النقاط" (أرصدة العملاء الحالية والمتبقية).
- **الـ Request:** `?page=1&limit=25`
- **الـ Response:** مصفوفة Users تحتوي على حقول `currentPoints` و `totalPointsEarned`.

---

## 10. الإعدادات الشاملة (`setting`)

هذا القسم يغطي كل ما هو موجود داخل مجلد `pages/setting` في الفرونت إند.

### 10.1 الإعدادات العامة والتشغيل (`General & Operational`)

#### 1️⃣ `GET /api/admin/settings`
- **الوظيفة:** جلب بيانات الإعدادات العلوية وتنبيهات الـ Push/SMS وإعدادات التشغيل (مثل الباركود والتعيين التلقائي).
- **الـ Response:**
```json
{
  "success": true,
  "data": {
    "appName": "غِمار",
    "appLogo": "https://...",
    "supportEmail": "support@ghimar.com",
    "supportPhone": "920001234",
    "currency": "SAR",
    "expressWashFee": 15,
    "notifications": {
      "smsEnabled": true,
      "emailEnabled": false,
      "pushEnabled": true,
      "driverAlerts": true,
      "delayAlerts": true
    },
    "operational": {
      "mandatoryBarcodeScanning": true,
      "autoAssignDrivers": false
    },
    "security": {
      "twoFactorAuth": false
    }
  }
}
```

#### 2️⃣ `PUT /api/admin/settings`
- **الوظيفة:** حفظ التعديلات على الإعدادات أو التنبيهات أو التشغيل.
- **الـ Request Body:** يُرسل نفس الهيكل الموجود في الـ Response.

---

### 10.2 بنرات العروض الخاصة (`Banners`)

#### 1️⃣ `GET /api/admin/settings/banners`
- **الوظيفة:** جلب بنرات العروض الخاصة بأسفل الصفحة.
- **الـ Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65d...",
      "title": "ارسل حقيبتك ونرجعها لك نظيفة",
      "imageUrl": "https://...",
      "link": "/offers/1",
      "isActive": true
    }
  ]
}
```

#### 2️⃣ `POST /api/admin/settings/banners`
- **الوظيفة:** إضافة بنر جديد.
- **الـ Request Body:**
```json
{ "title": "بنر الخصم", "imageUrl": "https://...", "link": "/offer", "isActive": true }
```

---

### 10.3 المشرفين والأدوار (`Admins & Roles`)

#### 1️⃣ `GET /api/admin/admins`
- **الوظيفة:** جلب قائمة المشرفين والأدوار لعرضها في الجدول.
- **الـ Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65d...",
      "name": "ماريهان رضوان",
      "phone": "+966512345678",
      "role": "operations_manager",
      "isActive": true,
      "createdAt": "2025-01-12T..."
    }
  ]
}
```

#### 2️⃣ `POST /api/admin/admins`
- **الوظيفة:** إضافة مشرف جديد (مودال "إضافة دور").
- **الـ Request Body:**
```json
{
  "name": "محمد أحمد",
  "phone": "+966...",
  "role": "operations_manager",
  "permissions": [
    "orders_view", "orders_edit", "orders_delete",
    "drivers_assign", "barcode_manage",
    "zones_manage", "settings_edit"
  ]
}
```
> [!TIP]
> الصلاحيات المتاحة (Permissions) تتبع ما في المودال: `orders_view`, `orders_edit`, `orders_delete`, `drivers_assign`, `barcode_manage`, `zones_manage`, `settings_edit`.

#### 3️⃣ `PATCH /api/admin/admins/:id/status`
- **الوظيفة:** تفعيل/تعطيل حساب مشرف (Toggle).

---

### 10.4 مناطق التوصيل والمدن (`Zones & Cities`)

#### 1️⃣ `GET /api/admin/cities`
- **الوظيفة:** جلب المدن والمناطق لعرضها في جدول "مناطق التوصيل".
- **الـ Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65d...",
      "name": "الرياض",
      "areas": [
        {
          "name": "حي الزهور",
          "code": "ZHR",
          "driversCount": 2,
          "ordersCount": 7,
          "deliveryAvailable": true
        }
      ]
    }
  ]
}
```

#### 2️⃣ `POST /api/admin/cities/:id/areas`
- **الوظيفة:** إضافة منطقة جديدة لمدينة معينة وتعيين سائقين لها.
- **الـ Request Body:**
```json
{
  "name": "حي النزهة",
  "nameAr": "حي النزهة",
  "code": "NZH",
  "coordinates": { "lat": 24.1, "lng": 46.2 },
  "driverIds": ["65d1...", "65d2..."]
}
```

#### 3️⃣ `PUT /api/admin/cities/:id/areas/:areaCode`
- **الوظيفة:** تعديل بيانات المنطقة أو تحديث قائمة السائقين المعينين لها.
- **الـ Request Body:** (نفس شكل الـ POST).

#### 4️⃣ `GET /api/admin/cities/areas/:areaCode/drivers`
- **الوظيفة:** جلب قائمة السائقين المعينين لمنطقة معينة (لمودال "تعيين سائق لحي...").
- **الـ Response:** مصفوفة من السائقين.

---

## 11. الإشعارات (`notification`)

### 1️⃣ `POST /api/admin/notifications/send`
- **الوظيفة:** إرسال إشعار.
- **الـ Request Body:**
```json
{
  "recipientId": "all",
  "recipientRole": "client",
  "title": "خصم جديد",
  "body": "استخدم كود WIN للحصول على 20%",
  "type": "promotion"
}
```

### 2️⃣ `GET /api/admin/notifications`
- **الوظيفة:** جلب أرشيف الإشعارات لملء الجدول.

---


