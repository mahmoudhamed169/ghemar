"use client";

import { Printer, Loader2 } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { type InvoiceData } from "./invoice-modal";

export default function InvoiceActions({
  invoice,
}: {
  invoiceId?: string;
  invoice: InvoiceData;
}) {
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Reports.invoice");

  const handlePrint = () => {
    setLoading(true);

    const vat = ((invoice.baseAmount - invoice.discount) * invoice.vatPercent) / 100;

    const html = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8" />
  <title>فاتورة #${invoice.invoiceId}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'IBM Plex Sans Arabic', sans-serif;
      color: #000709;
      background: #f0f0f0;
      display: flex;
      justify-content: center;
      padding: 32px 16px;
    }

    .invoice {
      background: #fff;
      width: 620px;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #dde8ea;
      box-shadow: 0 4px 24px rgba(12,97,117,0.10);
    }

    /* ── Header ── */
    .header {
      background: #0C6175;
      padding: 26px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }
    /* يسار: فاتورة + رقم */
    .header-right { text-align: left; }
    .header-right .inv-title { font-size: 30px; font-weight: 700; color: #fff; line-height: 1; }
    .header-right .inv-num   { font-size: 13px; color: rgba(255,255,255,0.72); margin-top: 5px; }

    /* يمين: لوجو + اسم الشركة */
    .header-left { display: flex; align-items: center; gap: 12px; }
    .header-left img {
      width: 58px; height: 58px; border-radius: 12px;
      background: #fff; padding: 3px; object-fit: contain;
    }
    .brand-name { font-size: 21px; font-weight: 700; color: #fff; letter-spacing: 0.5px; }
    .brand-sub  { font-size: 11px; color: rgba(255,255,255,0.70); margin-top: 3px; }

    /* ── Stripe ── */
    .stripe { height: 4px; background: linear-gradient(90deg, #0C6175 0%, #4db8d4 50%, #0C6175 100%); }

    /* ── Meta bar ── */
    .meta-bar {
      background: #eaf6f9;
      padding: 13px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #c5e8ef;
      flex-direction: row;
    }
    .meta-item { display: flex; flex-direction: column; gap: 3px; }
    .meta-item.center { align-items: center; }
    .meta-item.end    { align-items: flex-end; }
    .meta-label { font-size: 10px; color: #0C6175; font-weight: 600; letter-spacing: 0.4px; }
    .meta-value { font-size: 13px; font-weight: 700; color: #000709; }
    .badge-paid {
      background: #d1fae5; color: #065f46;
      padding: 2px 14px; border-radius: 20px;
      font-size: 12px; font-weight: 600;
    }

    /* ── Body ── */
    .body { padding: 24px 32px 28px; }

    .section-title {
      display: flex; align-items: center; gap: 8px;
      font-size: 11px; font-weight: 700; color: #0C6175;
      letter-spacing: 0.6px; margin-bottom: 12px;
    }
    /* الخط بعد العنوان يمتد لليسار */
    .section-title::after { content: ''; flex: 1; height: 1px; background: #c5e8ef; }

    /* ── Info grid ── */
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; margin-bottom: 22px; }
    .info-card {
      border: 1px dashed #9dd4df; border-radius: 10px;
      padding: 10px 14px; background: #f5fbfc; text-align: right;
    }
    .info-card .lbl { font-size: 10px; color: #0C6175; font-weight: 600; margin-bottom: 4px; }
    .info-card .val { font-size: 14px; font-weight: 700; color: #000709; }

    /* ── Amounts ── */
    .amounts-box {
      background: #f5fbfc; border-radius: 12px;
      padding: 4px 20px 0; border: 1px solid #c5e8ef;
    }
    .amt-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 0; border-bottom: 1px dashed #c5e8ef; font-size: 13px;
    }
    .amt-row:last-of-type { border-bottom: none; }
    .amt-lbl { color: #4a7a85; font-weight: 500; }
    .amt-val { font-weight: 700; color: #000709; }
    .amt-val.disc { color: #c0392b; }

    .total-row {
      display: flex; justify-content: space-between; align-items: center;
      margin: 12px 0; padding: 14px 20px;
      background: #0C6175; border-radius: 10px;
    }
    .total-lbl { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.88); }
    .total-val { font-size: 22px; font-weight: 700; color: #fff; }

    /* ── Note ── */
    .note {
      margin-top: 18px; background: #fffbf0;
      border: 1px dashed #e6c84a; border-radius: 10px; padding: 11px 15px;
      text-align: right;
    }
    .note .lbl { font-size: 10px; color: #9b7f1a; font-weight: 700; margin-bottom: 4px; }
    .note .val  { font-size: 13px; color: #5a4510; font-weight: 500; }

    /* ── Footer ── */
    .footer {
      margin-top: 24px; padding-top: 16px;
      border-top: 1px solid #c5e8ef;
      display: flex; justify-content: space-between; align-items: center;
      flex-direction: row;
    }
    /* يمين: نص الشكر */
    .footer-text { text-align: right; }
    .footer-name { font-size: 13px; font-weight: 700; color: #0C6175; }
    .footer-sub  { font-size: 11px; color: #4a7a85; margin-top: 2px; }
    /* يسار: ختم */
    .stamp {
      width: 52px; height: 52px; border-radius: 50%;
      border: 2px dashed #0C6175;
      display: flex; align-items: center; justify-content: center;
    }
    .stamp span { font-size: 9px; color: #0C6175; font-weight: 700; text-align: center; line-height: 1.4; }

    @media print {
      body { background: #fff; padding: 0; }
      .invoice { border-radius: 0; border: none; box-shadow: none; width: 100%; }
    }
  </style>
</head>
<body>
<div class="invoice">

  <!-- Header RTL: أول عنصر = يمين، ثاني عنصر = يسار -->
  <div class="header">
    <!-- يمين: لوجو + اسم الشركة -->
    <div class="header-left">
      <img src="/images/logo.webp" alt="غمار" />
      <div>
        <div class="brand-name">غـمار</div>
        <div class="brand-sub">خدمات الغسيل والتنظيف</div>
      </div>
    </div>
    <!-- يسار: فاتورة + رقم -->
    <div class="header-right">
      <div class="inv-title">فاتورة</div>
      <div class="inv-num">#${invoice.invoiceId}</div>
    </div>
  </div>

  <div class="stripe"></div>

  <!-- Meta bar RTL: تاريخ يمين | حالة وسط | رقم الطلب يسار -->
  <div class="meta-bar">
    <div class="meta-item">
      <span class="meta-label">تاريخ الإصدار</span>
      <span class="meta-value">${invoice.date}</span>
    </div>
    <div class="meta-item center">
      <span class="meta-label">حالة الفاتورة</span>
      <span class="badge-paid">✓ مدفوعة</span>
    </div>
    <div class="meta-item end">
      <span class="meta-label">رقم الطلب</span>
      <span class="meta-value">${invoice.orderNumber}</span>
    </div>
  </div>

  <div class="body">

    <div class="section-title">بيانات العميل</div>
    <div class="info-grid">
      <div class="info-card"><div class="lbl">اسم العميل</div><div class="val">${invoice.clientName}</div></div>
      <div class="info-card"><div class="lbl">رقم الطلب</div><div class="val">${invoice.orderNumber}</div></div>
      <div class="info-card"><div class="lbl">السائق المسؤول</div><div class="val">${invoice.driverName}</div></div>
      <div class="info-card"><div class="lbl">تاريخ الخدمة</div><div class="val">${invoice.date}</div></div>
    </div>

    <div class="section-title">تفاصيل المبالغ</div>
    <div class="amounts-box">
      <div class="amt-row">
        <span class="amt-lbl">المبلغ الأساسي</span>
        <span class="amt-val">﷼ ${invoice.baseAmount.toFixed(2)}</span>
      </div>
      <div class="amt-row">
        <span class="amt-lbl">الخصم</span>
        <span class="amt-val disc">− ﷼ ${invoice.discount}</span>
      </div>
      <div class="amt-row">
        <span class="amt-lbl">ضريبة القيمة المضافة (%${invoice.vatPercent})</span>
        <span class="amt-val">﷼ ${vat.toFixed(2)}</span>
      </div>
    </div>

    <div class="total-row">
      <span class="total-lbl">الإجمالي المستحق</span>
      <span class="total-val">﷼ ${invoice.total}</span>
    </div>

    <div class="note">
      <div class="lbl">ملاحظة</div>
      <div class="val">شكراً لثقتكم بخدمات غمار — نسعى دائماً لتقديم أفضل تجربة غسيل</div>
    </div>

    <div class="footer">
      <div class="footer-text">
        <div class="footer-name">شكراً لتعاملكم معنا</div>
        <div class="footer-sub">غمار — خدمات الغسيل المنزلي</div>
      </div>
      <div class="stamp"><span>مدفوع<br/>بالكامل</span></div>
    </div>

  </div>
</div>

<script>
  document.fonts.ready.then(function () {
    window.print();
    window.onafterprint = function () { window.close(); };
  });
</script>
</body>
</html>`;

    const printWindow = window.open("", "_blank", "width=720,height=950");
    if (!printWindow) {
      alert("يرجى السماح بالنوافذ المنبثقة في المتصفح");
      setLoading(false);
      return;
    }

    printWindow.document.write(html);
    printWindow.document.close();
    setLoading(false);
  };

  return (
    <div className="pt-2 border-t border-gray-100">
      <Button
        className="w-full gap-2 bg-gray-900 hover:bg-gray-800 text-white"
        onClick={handlePrint}
        disabled={loading}
      >
        {loading ? <Loader2 size={15} className="animate-spin" /> : <Printer size={15} />}
        {t("printPdf")}
      </Button>
    </div>
  );
}
