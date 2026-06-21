"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Phone,
  Globe,
  Camera,
  AtSign,
  MessageCircle,
  Music,
  Play,
  Link,
  Loader2,
} from "lucide-react";
import type { SocialLinks } from "@/shared/lib/services/settings/get-social-links";
import { updateSocialLinksAction } from "@/shared/lib/actions/settings/update-social-links";

const schema = z.object({
  facebook:  z.string(),
  instagram: z.string(),
  twitter:   z.string(),
  snapchat:  z.string(),
  tiktok:    z.string(),
  youtube:   z.string(),
  linkedin:  z.string(),
  whatsapp:  z.string(),
});

type FormData = z.infer<typeof schema>;

const FIELDS: {
  key: keyof FormData;
  icon: React.ElementType;
  type?: string;
}[] = [
  { key: "whatsapp",  icon: Phone,         type: "tel" },
  { key: "facebook",  icon: Globe,         type: "url" },
  { key: "instagram", icon: Camera,        type: "url" },
  { key: "twitter",   icon: AtSign,        type: "url" },
  { key: "snapchat",  icon: MessageCircle, type: "url" },
  { key: "tiktok",    icon: Music,         type: "url" },
  { key: "youtube",   icon: Play,          type: "url" },
  { key: "linkedin",  icon: Link,          type: "url" },
];

export default function SocialLinksForm({ initialData }: { initialData: SocialLinks }) {
  const t = useTranslations("Settings.contact.social");

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => updateSocialLinksAction(data),
    onSuccess: (result) => {
      if (result.success) toast.success(t("saveSuccess"));
      else toast.error(result.message ?? t("saveError"));
    },
    onError: () => toast.error(t("saveError")),
  });

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} dir="rtl" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FIELDS.map(({ key, icon: Icon, type = "text" }) => (
          <div key={key} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              {t(key)}
            </label>
            <div className="relative">
              <Icon className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-gray-400" />
              <input
                {...register(key)}
                type={type}
                dir="ltr"
                placeholder={type === "tel" ? "+966xxxxxxxxx" : "https://"}
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-start">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 bg-[#0C6175] hover:bg-[#0a5464] text-white text-sm font-medium px-10 py-3 rounded-xl transition disabled:opacity-60"
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {t("save")}
        </button>
      </div>
    </form>
  );
}
