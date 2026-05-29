"use client";

import { useRef } from "react";
import Barcode from "react-barcode";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, X } from "lucide-react";

interface BarcodeBulkPrintModalProps {
  open: boolean;
  onClose: () => void;
  barcodes: string[];
}

export default function BarcodeBulkPrintModal({
  open,
  onClose,
  barcodes,
}: BarcodeBulkPrintModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;

    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>باركودات منشأة</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              background: #fff;
              padding: 16px;
              direction: rtl;
              font-family: sans-serif;
            }
            .grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
              gap: 12px;
            }
            .item {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 8px;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
            }
            @media print {
              body { padding: 0; }
              .item { break-inside: avoid; }
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
      <DialogContent className="rounded-2xl p-6 max-w-3xl w-full max-h-[85dvh] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#000709]">
            الباركودات المُنشأة ({barcodes.length})
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Scrollable barcode grid */}
        <div className="flex-1 overflow-y-auto">
          <div
            ref={printRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            {barcodes.map((code, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-3 border border-gray-100 rounded-xl bg-white"
              >
                <Barcode
                  value={code}
                  width={1.2}
                  height={60}
                  displayValue={true}
                  fontSize={10}
                  margin={0}
                  background="#ffffff"
                  lineColor="#000000"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-shrink-0">
          <Button
            onClick={handlePrint}
            className="flex-1 h-11 bg-[#0C6175] hover:bg-[#097188] text-white rounded-xl gap-2"
          >
            <Printer className="w-4 h-4" />
            طباعة الكل
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 h-11 border-gray-200 text-gray-600 rounded-xl"
          >
            إغلاق
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
