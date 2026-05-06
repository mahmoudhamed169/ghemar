import { Switch } from "@/components/ui/switch";

const notificationItems = [
  {
    key: "sms",
    title: "الإشعارات برسائل SMS",
    description: "إرسال رسائل نصية عند تغيير حالة الطلب",
  },
  {
    key: "email",
    title: "الإشعارات بالبريد الإلكتروني",
    description: "إرسال بريد إلكتروني عند تغيير حالة الطلب",
  },
  {
    key: "driver",
    title: "تنبيهات السائقين",
    description: "إشعار السائق عند تعيين طلب جديد له",
  },
  {
    key: "push",
    title: "الإشعارات الفورية (Push)",
    description: "إرسال إشعارات فورية للتطبيق",
  },
  {
    key: "delay",
    title: "تنبيهات التأخر",
    description: "تنبيه عند تأخر التوصيل عن الوقت المحدد",
  },
];

export default function NotificationSettings() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
      }}
    >
      {notificationItems.map((item) => (
        <div
          key={item.key}
          style={{
            backgroundColor: "#F9FAFB",
            borderRadius: "16px",
            padding: "20px",
            minHeight: "94px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #F3F4F6",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <h3 style={{ color: "#000709", fontWeight: 500, fontSize: "14px" }}>
              {item.title}
            </h3>
            <p style={{ color: "#6A7282", fontSize: "13px" }}>
              {item.description}
            </p>
          </div>
          <Switch />
        </div>
      ))}
    </div>
  );
}
