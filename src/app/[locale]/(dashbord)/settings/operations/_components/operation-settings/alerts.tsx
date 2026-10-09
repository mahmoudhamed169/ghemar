"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { OperationalSettings } from "@/shared/lib/types/settings/operational-settings";
import { useUpdateOperationalSettings } from "@/shared/lib/hooks/settings/use-update-operational-settings";
import { toggleAutoAssignAction } from "@/shared/lib/actions/settings/toggle-auto-assign";

const cardStyle: React.CSSProperties = {
  backgroundColor: "#F9FAFB",
  borderRadius: "16px",
  padding: "20px",
  minHeight: "94px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  border: "1px solid #F3F4F6",
};

interface OperationalFormProps {
  initialData: OperationalSettings;
}

export default function OperationalForm({ initialData }: OperationalFormProps) {
  const t = useTranslations("Settings.operations.operationalSettings");

  // barcode scanning is a draft saved with the button below
  const [barcodeScanning, setBarcodeScanning] = useState(
    initialData.mandatoryBarcodeScanning,
  );
  const { mutate: updateSettings, isPending: isSaving } = useUpdateOperationalSettings();

  // auto-assign is saved the moment it is switched, through its own endpoint;
  // this always holds the value the server last confirmed (or the one in flight)
  const [autoAssign, setAutoAssign] = useState(initialData.autoAssignDrivers);
  const [isToggling, startToggle] = useTransition();

  const handleAutoAssignChange = (enabled: boolean) => {
    const previous = autoAssign;
    setAutoAssign(enabled);
    startToggle(async () => {
      try {
        const result = await toggleAutoAssignAction(enabled);
        if (!result.success || !result.data) throw new Error("toggle failed");
        setAutoAssign(result.data.autoAssignDrivers);
        toast.success(
          t(result.data.autoAssignDrivers ? "autoAssignDrivers.enabled" : "autoAssignDrivers.disabled"),
        );
      } catch {
        setAutoAssign(previous);
        toast.error(t("autoAssignDrivers.error"));
      }
    });
  };

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div style={cardStyle}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <h3 style={{ color: "#000709", fontWeight: 500, fontSize: "14px" }}>
              {t("mandatoryBarcodeScanning.title")}
            </h3>
            <p style={{ color: "#6A7282", fontSize: "13px" }}>
              {t("mandatoryBarcodeScanning.description")}
            </p>
          </div>
          <Switch
            checked={barcodeScanning}
            onCheckedChange={setBarcodeScanning}
            disabled={isSaving}
          />
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <h3 style={{ color: "#000709", fontWeight: 500, fontSize: "14px" }}>
              {t("autoAssignDrivers.title")}
            </h3>
            <p style={{ color: "#6A7282", fontSize: "13px", lineHeight: 1.7 }}>
              {t(autoAssign ? "autoAssignDrivers.descriptionOn" : "autoAssignDrivers.descriptionOff")}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isToggling && (
              <Loader2 className="w-4 h-4 animate-spin text-gray-400" aria-hidden />
            )}
            <Switch
              checked={autoAssign}
              onCheckedChange={handleAutoAssignChange}
              disabled={isToggling || isSaving}
              aria-busy={isToggling}
              aria-label={t("autoAssignDrivers.title")}
            />
          </div>
        </div>
      </div>

      <div
        style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #F3F4F6" }}
        className="flex items-center gap-4"
      >
        <button
          // this endpoint replaces every operational setting at once, so
          // auto-assign goes along with the value the server last confirmed
          onClick={() =>
            updateSettings({
              mandatoryBarcodeScanning: barcodeScanning,
              autoAssignDrivers: autoAssign,
            })
          }
          disabled={isSaving || isToggling}
          style={{ backgroundColor: "#0F766E" }}
          className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition disabled:opacity-60"
        >
          {isSaving ? t("saving") : t("save")}
        </button>
        <button
          onClick={() => setBarcodeScanning(initialData.mandatoryBarcodeScanning)}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
        >
          {t("cancel")}
        </button>
      </div>
    </>
  );
}
