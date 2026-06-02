"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ImagePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Banner, CreateBannerInput } from "@/shared/lib/types/settings/banner";
import { useCreateBanner } from "@/shared/lib/hooks/settings/use-banner-mutations";

interface AddBannerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (banner: Banner) => void;
}

const INITIAL = {
  title: "",
  link: "",
  sortOrder: 1,
  isActive: true,
  image: null as File | null,
};

export default function AddBannerModal({
  open,
  onOpenChange,
  onCreated,
}: AddBannerModalProps) {
  const t = useTranslations("Settings.general.banners.addModal");
  const [form, setForm] = useState(INITIAL);
  const fileRef = useRef<HTMLInputElement>(null);
  const { mutate: createBanner, isPending } = useCreateBanner();

  const isValid = !!form.title.trim() && !!form.image;

  const handleSubmit = () => {
    if (!isValid) return;
    const input: CreateBannerInput = {
      title: form.title.trim(),
      link: form.link.trim() || undefined,
      sortOrder: form.sortOrder,
      isActive: form.isActive,
      image: form.image!,
    };
    createBanner(input, {
      onSuccess: ({ data }) => {
        onCreated(data);
        setForm(INITIAL);
        onOpenChange(false);
      },
    });
  };

  const handleClose = () => {
    setForm(INITIAL);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-[#000709] mt-2">
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>{t("bannerTitle")} *</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className="h-11 bg-[#F5F5F5] border-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>{t("link")}</Label>
            <Input
              value={form.link}
              dir="ltr"
              onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))}
              className="h-11 bg-[#F5F5F5] border-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>{t("sortOrder")}</Label>
              <Input
                type="number"
                min={1}
                value={form.sortOrder}
                onChange={(e) =>
                  setForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))
                }
                className="h-11 bg-[#F5F5F5] border-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>{t("isActive")}</Label>
              <div className="h-11 flex items-center">
                <Switch
                  checked={form.isActive}
                  onCheckedChange={(v) => setForm((p) => ({ ...p, isActive: v }))}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>{t("image")} *</Label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setForm((p) => ({ ...p, image: file }));
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="h-24 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-[#0C6175] hover:bg-[#0C6175]/5 transition flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-[#0C6175]"
            >
              <ImagePlus className="w-6 h-6" />
              <span className="text-xs">
                {form.image ? form.image.name : t("chooseImage")}
              </span>
            </button>
          </div>

          <div className="flex gap-3 mt-2">
            <Button
              onClick={handleSubmit}
              disabled={isPending || !isValid}
              className="flex-1 h-11 bg-[#0C6175] hover:bg-[#097188] text-white rounded-xl"
            >
              {isPending ? t("saving") : t("save")}
            </Button>
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 h-11 rounded-xl"
            >
              {t("cancel")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
