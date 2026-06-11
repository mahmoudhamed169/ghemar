"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  Loader2,
  Package,
  Tag,
} from "lucide-react";
import { usePackages } from "@/shared/lib/hooks/packages/use-packages";
import {
  useGeneratePackageBarcodes,
  useGenerateSingleBags,
} from "@/shared/lib/hooks/bags/use-generate-barcodes";
import BarcodeBulkPrintModal from "./barcode-bulk-print-modal";

type BarcodeType = "single" | "package";

function extractCodes(res: unknown, kind: BarcodeType): string[] {
  if (!res) return [];
  const r = res as Record<string, unknown>;
  const primaryField = kind === "package" ? "code" : "barcode";

  // find an array anywhere in the response
  const tryArray = (arr: unknown[]): string[] =>
    arr
      .map((b) => {
        if (typeof b === "string") return b;
        if (b && typeof b === "object") {
          const o = b as Record<string, unknown>;
          return (o[primaryField] ?? o.barcode ?? o.code ?? o.value ?? o._id) as string | undefined;
        }
        return undefined;
      })
      .filter(Boolean) as string[];

  // Pattern 1: { data: [...] }
  if (Array.isArray(r.data)) return tryArray(r.data);

  // Pattern 2: { data: { bags|barcodes|codes|items|result: [...] } }
  if (r.data && typeof r.data === "object" && !Array.isArray(r.data)) {
    const d = r.data as Record<string, unknown>;
    for (const key of ["bags", "barcodes", "codes", "items", "result", "list"]) {
      if (Array.isArray(d[key])) return tryArray(d[key] as unknown[]);
    }
  }

  // Pattern 3: top-level { bags|barcodes|codes: [...] }
  for (const key of ["bags", "barcodes", "codes", "items", "result", "list"]) {
    if (Array.isArray(r[key])) return tryArray(r[key] as unknown[]);
  }

  return [];
}

export default function AddBages() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(3);
  const [barcodeType, setBarcodeType] = useState<BarcodeType>("single");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [generatedBarcodes, setGeneratedBarcodes] = useState<string[]>([]);
  const [printType, setPrintType] = useState<BarcodeType>("single");
  const [printOpen, setPrintOpen] = useState(false);

  const { data: packagesData, isLoading: packagesLoading } = usePackages();
  const packages = packagesData?.data ?? [];

  const { mutateAsync: generatePackage, isPending: pendingPackage } =
    useGeneratePackageBarcodes();
  const { mutateAsync: generateSingle, isPending: pendingSingle } =
    useGenerateSingleBags();

  const isPending = pendingPackage || pendingSingle;

  const canSubmit =
    !isPending &&
    count >= 1 &&
    (barcodeType === "single" || selectedPackage !== "");

  const handleCreate = async () => {
    if (!canSubmit) return;

    let codes: string[] = [];

    try {
      if (barcodeType === "package") {
        const res = await generatePackage({ packageId: selectedPackage, count });
        console.log("=== [AddBages] package raw response ===", res);
        codes = extractCodes(res, "package");
      } else {
        const res = await generateSingle({ count });
        console.log("=== [AddBages] single raw response ===", res);
        codes = extractCodes(res, "single");
      }
      console.log("[AddBages] extracted codes:", codes.length, codes);
    } catch (err) {
      console.error("[AddBages] handleCreate error:", err);
      return;
    }

    setGeneratedBarcodes(codes);
    setPrintType(barcodeType);
    setOpen(false);
    setPrintOpen(true);
    router.refresh();
  };

  return (
    <>
      <BarcodeBulkPrintModal
        open={printOpen}
        onClose={() => setPrintOpen(false)}
        barcodes={generatedBarcodes}
        type={printType}
      />

      <Button
        onClick={() => setOpen(true)}
        className="mt-4 bg-[#0C6175] text-white w-full sm:w-72 h-13 sm:h-13.75 rounded-xl text-sm sm:text-base flex items-center gap-2 justify-center hover:bg-[#097188] transition-colors"
      >
        <Barcode className="w-5 h-5" />
        إنشاء باركود
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 gap-0 flex flex-col overflow-hidden w-[calc(100%-2rem)] max-w-115 max-h-[90dvh] rounded-2xl">
          <DialogHeader className="px-4 sm:px-6 py-3 sm:py-5 border-b border-border/60 shrink-0">
            <div className="flex flex-col gap-0.5 mt-4">
              <h1 className="text-[15px] sm:text-[17px] font-medium">
                إنشاء باركود جديد
              </h1>
              <p className="text-[12px] sm:text-[13px] text-muted-foreground">
                أدخل البيانات لتوليد الباركودات
              </p>
            </div>
          </DialogHeader>

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
                  className="text-right pr-4 pl-10 h-10 sm:h-10.5 bg-muted/50 border-border/60 text-sm sm:text-base"
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
                      <div
                        className={cn(
                          "w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0",
                          isActive
                            ? "border-[#1D9E75]"
                            : "border-muted-foreground/40",
                        )}
                      >
                        {isActive && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#1D9E75]" />
                        )}
                      </div>
                      <div
                        className={cn(
                          "w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0",
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
                  disabled={packagesLoading}
                >
                  <SelectTrigger className="text-right h-10 sm:h-10.5 bg-muted/50 border-border/60 text-sm">
                    <SelectValue
                      placeholder={
                        packagesLoading ? "جاري التحميل..." : "-- اختر باكيج --"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {packages.map((pkg) => (
                      <SelectItem key={pkg._id} value={pkg._id}>
                        {pkg.nameAr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Info banner */}
            <div className="flex items-center gap-2 px-3 py-2 sm:py-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
              <Info className="w-4 h-4 text-blue-500 shrink-0" />
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
                className="w-full h-11 sm:h-12 rounded-xl text-sm sm:text-[15px] font-medium flex items-center justify-center gap-2 transition-all duration-200 text-white bg-[#0C6175] hover:bg-[#097188]"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري الإنشاء...
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
