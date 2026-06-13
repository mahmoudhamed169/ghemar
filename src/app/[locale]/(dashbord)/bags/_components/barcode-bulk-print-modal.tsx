"use client";

import { useRef } from "react";
import Barcode from "react-barcode";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, X, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface BarcodeBulkPrintModalProps {
  open: boolean;
  onClose: () => void;
  barcodes: string[];
  type?: "single" | "package";
}

export default function BarcodeBulkPrintModal({
  open,
  onClose,
  barcodes,
  type = "single",
}: BarcodeBulkPrintModalProps) {
  const t = useTranslations("Bags.print");
  const printRef = useRef<HTMLDivElement>(null);

  const label = type === "package" ? t("packageLabel") : t("singleLabel");
  const title = type === "package" ? t("packageTitle") : t("singleTitle");

  const handlePrint = () => {
    if (!barcodes.length || !printRef.current) return;

    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) return;

    win.document.open();
    win.document.write(`<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8" />
  <title>${title} منشأة</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #fff;
      font-family: sans-serif;
      direction: rtl;
      padding: 24px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px 12px;
      border: 1px solid #d1d5db;
      border-radius: 10px;
      break-inside: avoid;
      background: #fff;
    }
    .item svg {
      max-width: 100%;
      height: auto;
    }
    @media print {
      body { padding: 12px; }
      .grid { gap: 14px; }
      .item { border-color: #9ca3af; padding: 12px 8px; }
    }
  </style>
</head>
<body>
  <div class="grid">
    ${printRef.current.innerHTML}
  </div>
  <script>setTimeout(function(){ window.print(); window.close(); }, 300);<\/script>
</body>
</html>`);
    win.document.close();
    onClose();
  };

  return (
    <>
      {/* Hidden off-screen barcodes — rendered so SVGs are real DOM nodes */}
      <div
        ref={printRef}
        style={{ position: "fixed", left: "-9999px", top: 0, visibility: "hidden" }}
        aria-hidden
      >
        {barcodes.map((code, i) => (
          <div key={i} className="item">
            <Barcode
              value={code}
              width={1.5}
              height={70}
              displayValue
              fontSize={11}
              margin={4}
              background="#ffffff"
              lineColor="#000000"
            />
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="rounded-2xl p-6 max-w-sm w-full flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#000709]">
              {t("readyTitle")}
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 hover:bg-gray-100 transition-colors text-gray-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col items-center gap-3 py-2">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-green-500" />
            </div>
            <p className="text-center text-sm text-gray-600 leading-relaxed">
              {t("successMessage", { count: barcodes.length, label })}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handlePrint}
              disabled={!barcodes.length}
              className="flex-1 h-10 bg-[#0C6175] hover:bg-[#097188] text-white rounded-xl gap-2 text-sm"
            >
              <Printer className="w-4 h-4" />
              {t("printNow")}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-10 border-gray-200 text-gray-600 rounded-xl text-sm"
            >
              {t("later")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
