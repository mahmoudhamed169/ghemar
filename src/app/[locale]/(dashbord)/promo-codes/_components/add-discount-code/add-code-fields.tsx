import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { City } from "@/shared/lib/types/cities/city";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

interface AddCodeFieldsProps {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: string;
  usageLimit: string;
  expiryDate: string;
  applicableCities: string[];
  cities: City[];
  citiesLoading: boolean;
  citiesError: boolean;
  getCityName: (city: City) => string;
  onChange: (field: string, val: string) => void;
  onToggleCity: (cityId: string) => void;
}

export default function AddCodeFields({
  code,
  discountType,
  discountValue,
  usageLimit,
  expiryDate,
  applicableCities,
  cities,
  citiesLoading,
  citiesError,
  getCityName,
  onChange,
  onToggleCity,
}: AddCodeFieldsProps) {
  const t = useTranslations("PromoCodes.form.fields");

  return (
    <div className="flex flex-col gap-5">
      {/* Code + Discount Type */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-[#000709]">
            {t("code")}
          </Label>
          <Input
            placeholder="SAVE20"
            value={code}
            onChange={(e) => onChange("code", e.target.value.toUpperCase())}
            className="h-11 bg-[#F5F5F5] border-none tracking-widest font-semibold placeholder:font-normal placeholder:tracking-normal"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-[#000709]">
            {t("discountType")}
          </Label>
          <Select
            value={discountType}
            onValueChange={(val) => onChange("discountType", val)}
          >
            <SelectTrigger className="h-11 bg-[#F5F5F5] border-none w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">{t("percentage")}</SelectItem>
              <SelectItem value="fixed">{t("fixed")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Value + Usage Limit */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-[#000709]">
            {t("value")} {discountType === "percentage" ? "(%)" : "(ريال)"}
          </Label>
          <Input
            type="number"
            placeholder={discountType === "percentage" ? "20" : "50"}
            value={discountValue}
            min={1}
            max={discountType === "percentage" ? 100 : undefined}
            onChange={(e) => onChange("discountValue", e.target.value)}
            className="h-11 bg-[#F5F5F5] border-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-[#000709]">
            {t("usageLimit")}
          </Label>
          <Input
            type="number"
            placeholder="100"
            value={usageLimit}
            min={1}
            onChange={(e) => onChange("usageLimit", e.target.value)}
            className="h-11 bg-[#F5F5F5] border-none"
          />
        </div>
      </div>

      {/* Expiry Date */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-sm font-medium text-[#000709]">
          {t("expiryDate")}
        </Label>
        <Input
          type="date"
          value={expiryDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => onChange("expiryDate", e.target.value)}
          className="h-11 bg-[#F5F5F5] border-none"
        />
      </div>

      {/* Cities */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-[#000709]">
            {t("cities")}
          </Label>
          <span className="text-xs text-gray-400">{t("citiesHint")}</span>
        </div>

        {citiesLoading ? (
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-9 w-24 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : citiesError ? (
          <p className="text-sm text-red-500">{t("citiesError")}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => {
              const selected = applicableCities.includes(city._id);
              return (
                <button
                  key={city._id}
                  type="button"
                  onClick={() => onToggleCity(city._id)}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                    border transition-all duration-150
                    ${
                      selected
                        ? "bg-[#0C6175] text-white border-[#0C6175]"
                        : "bg-[#F5F5F5] text-gray-600 border-transparent hover:border-[#0C6175]/30"
                    }
                  `}
                >
                  {selected && <X className="w-3 h-3" />}
                  {getCityName(city)}
                </button>
              );
            })}
          </div>
        )}

        {applicableCities.length > 0 && (
          <p className="text-xs text-[#0C6175]">
            {applicableCities.length}{" "}
            {applicableCities.length === 1
              ? t("cityCount_one")
              : t("cityCount_other")}{" "}
            {t("selected")}
          </p>
        )}
      </div>
    </div>
  );
}
