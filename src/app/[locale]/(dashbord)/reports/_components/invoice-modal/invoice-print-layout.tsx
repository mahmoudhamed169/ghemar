import { type InvoiceData } from "./invoice-modal";

interface InvoicePrintLayoutProps {
  invoice: InvoiceData;
}

export default function InvoicePrintLayout({
  invoice,
}: InvoicePrintLayoutProps) {
  const vat =
    ((invoice.baseAmount - invoice.discount) * invoice.vatPercent) / 100;

  return (
    <div
      id="invoice-print-area"
      style={{
        display: "none",
        fontFamily: "'IBM Plex Sans Arabic', sans-serif",
        width: 620,
        background: "#ffffff",
        color: "#000709",

        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap');`}</style>

      {/* ── Header ── */}
      <div
        style={{
          background: "#0C6175",
          padding: "28px 36px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo + Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img
            src="/images/logo.webp"
            alt="غمار"
            style={{
              width: 60,
              height: 60,
              borderRadius: 12,
              background: "#fff",
              padding: 4,
              objectFit: "contain",
            }}
          />
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: 1,
              }}
            >
              غـمار
            </div>
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.72)",
                marginTop: 3,
              }}
            >
              خدمات الغسيل والتنظيف
            </div>
          </div>
        </div>

        {/* Invoice title */}
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#ffffff" }}>
            فاتورة
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.72)",
              marginTop: 4,
            }}
          >
            #{invoice.invoiceId}
          </div>
        </div>
      </div>

      {/* ── Accent stripe ── */}
      <div
        style={{
          height: 4,
          background:
            "linear-gradient(90deg,#0C6175 0%,#4db8d4 50%,#0C6175 100%)",
        }}
      />

      {/* ── Meta bar ── */}
      <div
        style={{
          background: "#eaf6f9",
          padding: "12px 36px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #c5e8ef",
        }}
      >
        {[
          { label: "تاريخ الإصدار", value: invoice.date },
          {
            label: "حالة الفاتورة",
            value: "✓ مدفوعة",
            valueStyle: {
              background: "#d1fae5",
              color: "#065f46",
              padding: "2px 14px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
            },
          },
          { label: "رقم الطلب", value: String(invoice.orderNumber) },
        ].map(({ label, value, valueStyle }) => (
          <div
            key={label}
            style={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <span
              style={{
                fontSize: 10,
                color: "#0C6175",
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#000709",
                ...(valueStyle as React.CSSProperties),
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "28px 36px" }}>
        {/* Section title */}
        <SectionTitle>بيانات العميل</SectionTitle>

        {/* Info grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {[
            { label: "اسم العميل", value: invoice.clientName },
            { label: "رقم الطلب", value: String(invoice.orderNumber) },
            { label: "السائق المسؤول", value: invoice.driverName },
            { label: "تاريخ الخدمة", value: invoice.date },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                border: "1px dashed #9dd4df",
                borderRadius: 10,
                padding: "11px 16px",
                background: "#f5fbfc",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: "#0C6175",
                  marginBottom: 5,
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#000709" }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Section title */}
        <SectionTitle>تفاصيل المبالغ</SectionTitle>

        {/* Amounts */}
        <div
          style={{
            background: "#f5fbfc",
            borderRadius: 12,
            padding: "16px 20px",
            border: "1px solid #c5e8ef",
          }}
        >
          {[
            {
              label: "المبلغ الأساسي",
              value: `﷼ ${invoice.baseAmount.toFixed(2)}`,
              accent: false,
            },
            { label: "الخصم", value: `− ﷼ ${invoice.discount}`, accent: true },
            {
              label: `ضريبة القيمة المضافة (%${invoice.vatPercent})`,
              value: `﷼ ${vat.toFixed(2)}`,
              accent: false,
            },
          ].map(({ label, value, accent }) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px dashed #c5e8ef",
                fontSize: 13,
              }}
            >
              <span style={{ color: "#4a7a85", fontWeight: 500 }}>{label}</span>
              <span
                style={{
                  fontWeight: 700,
                  color: accent ? "#c0392b" : "#000709",
                }}
              >
                {value}
              </span>
            </div>
          ))}

          {/* Total */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 14,
              padding: "14px 20px",
              background: "#0C6175",
              borderRadius: 10,
            }}
          >
            <span style={{ fontSize: 22, fontWeight: 700, color: "#ffffff" }}>
              ﷼ {invoice.total}
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              الإجمالي المستحق
            </span>
          </div>
        </div>

        {/* Note */}
        <div
          style={{
            marginTop: 20,
            background: "#fffbf0",
            border: "1px dashed #e6c84a",
            borderRadius: 10,
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "#9b7f1a",
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            ملاحظة
          </div>
          <div style={{ fontSize: 13, color: "#5a4510", fontWeight: 500 }}>
            شكراً لثقتكم بخدمات غمار — نسعى دائماً لتقديم أفضل تجربة غسيل
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 28,
            paddingTop: 16,
            borderTop: "1px solid #c5e8ef",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0C6175" }}>
              شكراً لتعاملكم معنا
            </div>
            <div style={{ fontSize: 11, color: "#4a7a85", marginTop: 2 }}>
              غمار — خدمات الغسيل المنزلي
            </div>
          </div>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: "2px dashed #0C6175",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: 9,
                color: "#0C6175",
                fontWeight: 700,
                textAlign: "center",
                lineHeight: 1.4,
              }}
            >
              مدفوع
              <br />
              بالكامل
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Helper component ── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 11,
        fontWeight: 700,
        color: "#0C6175",
        letterSpacing: 0.8,
        marginBottom: 12,
      }}
    >
      {children}
      <div style={{ flex: 1, height: 1, background: "#c5e8ef" }} />
    </div>
  );
}
