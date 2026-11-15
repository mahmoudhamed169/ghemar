"use client";

import { useTranslations } from "next-intl";
import { Gift, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Package, SavingsType } from "@/shared/lib/types/packages/package";
import { PackageExtrasBody } from "@/shared/lib/types/packages/package-mutation";

export interface PackageFormState {
  name: string;
  nameAr: string;
  price: string;
  bagCount: string;
  description: string;
  descriptionAr: string;
  isMostPopular: boolean;
  /** "" = no savings */
  savingsValue: string;
  savingsType: SavingsType;
  freeGift: string;
  freeGiftAr: string;
}

export const EMPTY_PACKAGE_FORM: PackageFormState = {
  name: "",
  nameAr: "",
  price: "",
  bagCount: "",
  description: "",
  descriptionAr: "",
  isMostPopular: false,
  savingsValue: "",
  savingsType: "amount",
  freeGift: "",
  freeGiftAr: "",
};

export function packageToFormState(pkg: Package): PackageFormState {
  return {
    name: pkg.name ?? "",
    nameAr: pkg.nameAr ?? "",
    price: String(pkg.price),
    bagCount: String(pkg.bagCount),
    description: pkg.description ?? "",
    descriptionAr: pkg.descriptionAr ?? "",
    isMostPopular: !!pkg.isMostPopular,
    // 0 hides the badge exactly like null, so show both as an empty input
    savingsValue: pkg.savingsValue ? String(pkg.savingsValue) : "",
    savingsType: pkg.savingsType ?? "amount",
    freeGift: pkg.freeGift ?? "",
    freeGiftAr: pkg.freeGiftAr ?? "",
  };
}

/** the savings input's problem, if any: "invalid" or "overHundred" */
export function getSavingsError(form: PackageFormState): "invalid" | "overHundred" | null {
  const raw = form.savingsValue.trim();
  if (!raw) return null;
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) return "invalid";
  if (form.savingsType === "percent" && value > 100) return "overHundred";
  return null;
}

/** the optional fields as the API expects them, for create and update */
export function formToExtrasBody(form: PackageFormState): PackageExtrasBody {
  const savings = form.savingsValue.trim();
  return {
    description: form.description.trim(),
    descriptionAr: form.descriptionAr.trim(),
    isMostPopular: form.isMostPopular,
    savingsValue: savings ? Number(savings) : null,
    savingsType: form.savingsType,
    freeGift: form.freeGift.trim(),
    freeGiftAr: form.freeGiftAr.trim(),
  };
}

const FIELD = "h-11 bg-[#F5F5F5] border-none";
const LABEL = "text-sm font-medium text-[#000709]";

interface PackageFormProps {
  mode: "add" | "edit";
  form: PackageFormState;
  onChange: (patch: Partial<PackageFormState>) => void;
}

export default function PackageForm({ mode, form, onChange }: PackageFormProps) {
  const t = useTranslations("Packages.modal");
  const savingsError = getSavingsError(form);

  return (
    <div className="flex flex-col gap-5">
      {/* Name AR + EN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className={LABEL}>{t("nameAr")}</Label>
          <Input
            placeholder="تنظيف أساسي"
            value={form.nameAr}
            onChange={(e) => onChange({ nameAr: e.target.value })}
            className={FIELD}
            dir="rtl"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className={LABEL}>{t("nameEn")}</Label>
          <Input
            placeholder="Basic Clean"
            value={form.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className={FIELD}
            dir="ltr"
          />
        </div>
      </div>

      {/* Price + bag count (bags are set on create only) */}
      <div className={`grid gap-4 ${mode === "add" ? "grid-cols-2" : "grid-cols-1"}`}>
        <div className="flex flex-col gap-1.5">
          <Label className={LABEL}>{t("price")} (SAR)</Label>
          <Input
            type="number"
            placeholder="99.99"
            value={form.price}
            min={0}
            onChange={(e) => onChange({ price: e.target.value })}
            className={FIELD}
            dir="ltr"
          />
        </div>
        {mode === "add" && (
          <div className="flex flex-col gap-1.5">
            <Label className={LABEL}>{t("bagCount")}</Label>
            <Input
              type="number"
              placeholder="5"
              value={form.bagCount}
              min={1}
              onChange={(e) => onChange({ bagCount: e.target.value })}
              className={FIELD}
              dir="ltr"
            />
          </div>
        )}
      </div>

      {/* Description AR + EN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className={LABEL}>
            {t("descriptionAr")} <span className="text-gray-400 font-normal">{t("optional")}</span>
          </Label>
          <Textarea
            placeholder={t("descriptionArPlaceholder")}
            value={form.descriptionAr}
            onChange={(e) => onChange({ descriptionAr: e.target.value })}
            className="min-h-20 bg-[#F5F5F5] border-none"
            dir="rtl"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className={LABEL}>
            {t("descriptionEn")} <span className="text-gray-400 font-normal">{t("optional")}</span>
          </Label>
          <Textarea
            placeholder="Weekly pickup for the whole family"
            value={form.description}
            onChange={(e) => onChange({ description: e.target.value })}
            className="min-h-20 bg-[#F5F5F5] border-none"
            dir="ltr"
          />
        </div>
      </div>

      {/* Most requested */}
      <div className="flex flex-col gap-1.5 rounded-xl bg-[#F5F5F5] p-3">
        <label className="flex items-center justify-between gap-3 cursor-pointer">
          <span className={LABEL}>{t("mostPopular")}</span>
          <Switch
            checked={form.isMostPopular}
            onCheckedChange={(checked) => onChange({ isMostPopular: checked })}
            aria-label={t("mostPopular")}
          />
        </label>
        <p className="flex items-start gap-1.5 text-xs text-gray-500">
          <Info className="w-3.5 h-3.5 mt-px shrink-0" />
          {t("mostPopularHint")}
        </p>
      </div>

      {/* Savings */}
      <div className="flex flex-col gap-1.5">
        <Label className={LABEL}>
          {t("savings")} <span className="text-gray-400 font-normal">{t("optional")}</span>
        </Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder={form.savingsType === "percent" ? "20" : "30"}
            value={form.savingsValue}
            min={0}
            max={form.savingsType === "percent" ? 100 : undefined}
            onChange={(e) => onChange({ savingsValue: e.target.value })}
            className={`${FIELD} flex-1`}
            aria-invalid={!!savingsError}
            dir="ltr"
          />
          <div
            role="radiogroup"
            aria-label={t("savingsType")}
            className="flex shrink-0 rounded-lg bg-[#F5F5F5] p-1"
          >
            {(["amount", "percent"] as const).map((type) => (
              <button
                key={type}
                type="button"
                role="radio"
                aria-checked={form.savingsType === type}
                onClick={() => onChange({ savingsType: type })}
                className={`px-3 rounded-md text-sm font-medium transition-colors ${
                  form.savingsType === type
                    ? "bg-[#0C6175] text-white shadow-sm"
                    : "text-gray-500 hover:text-[#0C6175]"
                }`}
              >
                {type === "amount" ? t("savingsAmount") : "%"}
              </button>
            ))}
          </div>
        </div>
        {savingsError ? (
          <p className="text-xs text-red-500">
            {savingsError === "overHundred" ? t("savingsOverHundred") : t("savingsInvalid")}
          </p>
        ) : (
          <p className="text-xs text-gray-400">{t("savingsHint")}</p>
        )}
      </div>

      {/* Free gift AR + EN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className={LABEL}>
            <Gift className="w-3.5 h-3.5 text-[#0C6175]" />
            {t("freeGiftAr")} <span className="text-gray-400 font-normal">{t("optional")}</span>
          </Label>
          <Input
            placeholder="بطانية مجاناً"
            value={form.freeGiftAr}
            onChange={(e) => onChange({ freeGiftAr: e.target.value })}
            className={FIELD}
            dir="rtl"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className={LABEL}>
            <Gift className="w-3.5 h-3.5 text-[#0C6175]" />
            {t("freeGiftEn")} <span className="text-gray-400 font-normal">{t("optional")}</span>
          </Label>
          <Input
            placeholder="Free blanket"
            value={form.freeGift}
            onChange={(e) => onChange({ freeGift: e.target.value })}
            className={FIELD}
            dir="ltr"
          />
        </div>
      </div>
    </div>
  );
}
