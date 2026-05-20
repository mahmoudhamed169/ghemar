"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Barcode,
  Info,
  Download,
  CheckCircle2,
  Loader2,
  Package,
  Tag,
} from "lucide-react";

const PACKAGES = [
  { id: "pkg-1", label: "باكيج A" },
  { id: "pkg-2", label: "باكيج B" },
  { id: "pkg-3", label: "باكيج C" },
];

const NAMING_OPTIONS = [
  { value: "default", label: "الافتراضي (BG-XXXX)" },
  { value: "custom-1", label: "تسمية مخصصة 1" },
  { value: "custom-2", label: "تسمية مخصصة 2" },
];

function generateBarcodeSVG(code: string): string {
  const bars: string[] = [];
  let x = 10;
  for (let i = 0; i < code.length; i++) {
    const c = code.charCodeAt(i);
    const w = (c % 3) + 1;
    if (c % 2 === 0)
      bars.push(
        `<rect x="${x}" y="10" width="${w}" height="60" fill="black"/>`,
      );
    x += w + 1;
  }
  const W = x + 10;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="100" viewBox="0 0 ${W} 100">
    <rect width="${W}" height="100" fill="white"/>
    ${bars.join("\n    ")}
    <text x="${W / 2}" y="90" font-size="10" text-anchor="middle" font-family="monospace">${code}</text>
  </svg>`;
}

function printBarcodes(codes: string[]) {
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(`
    <html><head><title>طباعة الباركودات</title>
    <style>
      body { font-family: sans-serif; direction: rtl; padding: 20px; }
      .grid { display: flex; flex-wrap: wrap; gap: 16px; }
      .item { text-align: center; }
      @media print { body { padding: 0; } }
    </style></head><body>
    <h2>الباركودات المُنشأة</h2>
    <div class="grid">
      ${codes.map((c, i) => `<div class="item"><p>${i + 1}. ${c}</p>${generateBarcodeSVG(c)}</div>`).join("")}
    </div>
    <script>window.onload=()=>{window.print();}<\/script>
    </body></html>`);
  win.document.close();
}

type BarcodeType = "single" | "package";

export default function AddBages() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(3);
  const [barcodeType, setBarcodeType] = useState<BarcodeType>("single");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [namingType, setNamingType] = useState("default");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const prefix =
    namingType === "default" ? "BG" : namingType === "custom-1" ? "C1" : "C2";

  const canSubmit =
    status === "idle" &&
    count >= 1 &&
    (barcodeType === "single" || selectedPackage !== "");

  const handleCreate = async () => {
    if (!canSubmit) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    const codes = Array.from(
      { length: count },
      (_, i) => `${prefix}-${String(i + 1).padStart(4, "0")}`,
    );
    setStatus("done");
    setTimeout(() => {
      setStatus("idle");
      setOpen(false);
      printBarcodes(codes);
    }, 1200);
  };

  return (
    <>
      {/* Trigger */}
      <Button
        onClick={() => setOpen(true)}
        className="mt-4 bg-[#0C6175] text-white w-full sm:w-[288px] h-[52px] sm:h-[55px] rounded-xl text-sm sm:text-base flex items-center gap-2 justify-center hover:bg-[#097188] transition-colors"
      >
        <Barcode className="w-5 h-5" />
        إنشاء باركود
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        {/*
          Mobile  → bottom-sheet: full width, rounded top corners, slides from bottom
          Desktop → centered dialog: max-w-[460px], fully rounded
        */}
        <DialogContent className="p-0 gap-0 flex flex-col overflow-hidden w-[calc(100%-2rem)] max-w-[460px] max-h-[90dvh] rounded-2xl">
          {/* Header */}
          <DialogHeader className="px-4 sm:px-6 py-3 sm:py-5 border-b border-border/60 flex-shrink-0">
            <div className="flex flex-col  gap-0.5 mt-4">
              <h1 className="text-[15px] sm:text-[17px] font-medium">
                إنشاء باركود جديد
              </h1>
              <p className="text-[12px] sm:text-[13px] text-muted-foreground">
                أدخل البيانات لتوليد الباركودات
              </p>
            </div>
          </DialogHeader>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 sm:py-5 flex flex-col gap-4 sm:gap-5">
            {/* عدد الباركودات */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-[12px] sm:text-[13px] font-medium text-muted-foreground text-right">
                عدد الباركودات
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  min={1}
                  max={500}
                  value={count}
                  onChange={(e) =>
                    setCount(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="text-right pr-4 pl-10 h-10 sm:h-[42px] bg-muted/50 border-border/60 text-sm sm:text-base"
                />
                <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* نوع الباركود */}
            <div className="flex flex-col gap-2">
              <Label className="text-[12px] sm:text-[13px] font-medium text-muted-foreground text-right">
                نوع الباركود
              </Label>
              <div className="flex flex-col gap-2">
                {(["single", "package"] as BarcodeType[]).map((type) => {
                  const isActive = barcodeType === type;
                  const label = type === "single" ? "فردي" : "باكيج";
                  const sub =
                    type === "single"
                      ? "باركود مستقل لكل منتج"
                      : "مجموعة منتجات في باكيج واحد";
                  const Icon = type === "single" ? Tag : Package;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBarcodeType(type)}
                      className={cn(
                        "w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4 rounded-xl border text-right transition-all duration-150 cursor-pointer",
                        isActive
                          ? "border-[#1D9E75] border-2 bg-[#E1F5EE]"
                          : "border-border/60 bg-muted/40 active:bg-muted/80 hover:bg-muted/80",
                      )}
                    >
                      {/* Radio dot */}
                      <div
                        className={cn(
                          "w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0",
                          isActive
                            ? "border-[#1D9E75]"
                            : "border-muted-foreground/40",
                        )}
                      >
                        {isActive && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#1D9E75]" />
                        )}
                      </div>
                      {/* Icon badge */}
                      <div
                        className={cn(
                          "w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                          isActive ? "bg-[#1D9E75]/15" : "bg-muted",
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-4 h-4 sm:w-5 sm:h-5",
                            isActive
                              ? "text-[#1D9E75]"
                              : "text-muted-foreground",
                          )}
                        />
                      </div>
                      {/* Text */}
                      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                        <span
                          className={cn(
                            "text-[13px] sm:text-[14px] font-medium",
                            isActive ? "text-[#085041]" : "text-foreground",
                          )}
                        >
                          {label}
                        </span>
                        <span
                          className={cn(
                            "text-[11px] sm:text-[12px] leading-snug",
                            isActive
                              ? "text-[#0F6E56]"
                              : "text-muted-foreground",
                          )}
                        >
                          {sub}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* اختيار الباكيج */}
            {barcodeType === "package" && (
              <div className="flex flex-col gap-1.5">
                <Label className="text-[12px] sm:text-[13px] font-medium text-muted-foreground text-right">
                  اختر الباكيج
                </Label>
                <Select
                  value={selectedPackage}
                  onValueChange={setSelectedPackage}
                >
                  <SelectTrigger className="text-right h-10 sm:h-[42px] bg-muted/50 border-border/60 text-sm">
                    <SelectValue placeholder="-- اختر باكيج --" />
                  </SelectTrigger>
                  <SelectContent>
                    {PACKAGES.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.id}>
                        {pkg.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* نوع التسمية */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-[12px] sm:text-[13px] font-medium text-muted-foreground text-right">
                نوع التسمية
              </Label>
              <Select value={namingType} onValueChange={setNamingType}>
                <SelectTrigger className="text-right h-10 sm:h-[42px] bg-muted/50 border-border/60 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {NAMING_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Info banner */}
            <div className="flex items-center  gap-2 px-3 py-2 sm:py-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
              <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />

              <span className="text-[12px] sm:text-[13px] text-blue-700 dark:text-blue-300">
                سيتم إنشاء {count} باركود{count > 1 ? "ات" : ""} جديد
                {count > 1 ? "ة" : ""}
              </span>
            </div>

            {/* CTA */}
            <div>
              <Button
                onClick={handleCreate}
                disabled={!canSubmit}
                className={cn(
                  "w-full h-11 sm:h-12 rounded-xl text-sm sm:text-[15px] font-medium flex items-center justify-center gap-2 transition-all duration-200 text-white",
                  status === "done"
                    ? "bg-[#1D9E75] hover:bg-[#1D9E75]"
                    : "bg-[#0C6175] hover:bg-[#097188]",
                )}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري الإنشاء...
                  </>
                ) : status === "done" ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    تم الإنشاء بنجاح!
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    إنشاء وتحميل
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
