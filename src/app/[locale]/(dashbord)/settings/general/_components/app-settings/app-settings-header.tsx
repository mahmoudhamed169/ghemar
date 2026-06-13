"use client";

import Image from "next/image";
import { Upload, ZoomIn } from "lucide-react";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";

interface AppSettingsHeaderProps {
  initialLogo?: string;
  onLogoChange: (file: File) => void;
}

export default function AppSettingsHeader({ initialLogo, onLogoChange }: AppSettingsHeaderProps) {
  const t = useTranslations("Settings.general.appSettings");
  const [preview, setPreview] = useState(false);
  const [localLogo, setLocalLogo] = useState(initialLogo ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalLogo(URL.createObjectURL(file));
      onLogoChange(file);
    }
    e.target.value = "";
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("title")}</h2>

        <div className="flex items-center gap-5">
          <div className="relative group">
            <div
              className="relative w-24 h-24 rounded-2xl overflow-hidden border border-gray-200 shadow-sm cursor-pointer bg-gray-50"
              onClick={() => localLogo ? setPreview(true) : undefined}
            >
              {localLogo && <Image src={localLogo} alt={t("logoLabel")} fill className="object-cover" />}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn size={20} className="text-white" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-[#000709] font-medium">{t("logoLabel")}</span>
            <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
            <button
              onClick={() => inputRef.current?.click()}
              className="flex items-center justify-center gap-3 border border-[#0000001F] h-8 py-2 px-3 rounded-xl text-xs text-gray-500 hover:text-teal-600 hover:border-teal-400 transition-colors"
            >
              <Upload size={11} />
              <span>{t("uploadLogo")}</span>
            </button>
          </div>
        </div>
      </div>

      {preview && localLogo && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
          onClick={() => setPreview(false)}
        >
          <div className="relative w-64 h-64 rounded-3xl overflow-hidden shadow-2xl">
            <Image src={localLogo} alt={t("logoLabel")} fill className="object-cover" />
          </div>
        </div>
      )}
    </>
  );
}
