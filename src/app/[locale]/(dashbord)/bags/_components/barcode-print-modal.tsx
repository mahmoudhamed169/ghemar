"use client";

import { useRef } from "react";
import Barcode from "react-barcode";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useTranslations } from "next-intl";

interface BarcodePrintModalProps {
  open: boolean;
  onClose: () => void;
  barcode: string;
}

export default function BarcodePrintModal({
  open,
  onClose,
  barcode,
}: BarcodePrintModalProps) {
  const t = useTranslations("Bags.print");
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;

    const printWindow = window.open("", "_blank", "width=400,height=300");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Barcode - ${barcode}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background: #fff;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          ${content.innerHTML}
          <script>
            window.onload = () => {
              window.print();
              window.onafterprint = () => window.close();
            };
          <\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-2xl rounded-2xl p-8">
        <div className="flex flex-col gap-6">

          {/* Title */}
          <h2 className="text-xl font-bold text-[#000709]">
            {t("title")}
          </h2>

          {/* Barcode Preview */}
          <div
            ref={printRef}
            className="flex flex-col items-center p-5 border border-gray-100 rounded-xl bg-white"
          >
            <Barcode
              value={barcode}
              width={1.8}
              height={90}
              displayValue={true}
              fontSize={12}
              margin={0}
              background="#ffffff"
              lineColor="#000000"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handlePrint}
              className="flex-1 h-11 bg-[#0C6175] hover:bg-[#097188] text-white rounded-xl gap-2"
            >
              <Printer className="w-4 h-4" />
              {t("print")}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-11 border-gray-200 text-gray-600 rounded-xl"
            >
              {t("cancel")}
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}