import { Suspense } from "react";
import { getContactInfo } from "@/shared/lib/services/content/get-contact";
import { getSocialLinks } from "@/shared/lib/services/settings/get-social-links";
import ContactSettingsForm from "./_components/contact-settings-form";
import SocialLinksForm from "./_components/social-links-form";
import { Phone, Share2 } from "lucide-react";

async function ContactSettingsSection() {
  const contact = await getContactInfo();

  if (!contact) {
    return (
      <p className="text-sm text-gray-400">تعذّر تحميل بيانات التواصل</p>
    );
  }

  return <ContactSettingsForm initialData={contact} />;
}

const EMPTY_SOCIAL: Parameters<typeof SocialLinksForm>[0]["initialData"] = {
  facebook: "", instagram: "", twitter: "", snapchat: "",
  tiktok: "", youtube: "", linkedin: "", whatsapp: "",
};

async function SocialLinksSection() {
  const social = await getSocialLinks();
  return <SocialLinksForm initialData={social ?? EMPTY_SOCIAL} />;
}

export default function ContactSettingsPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold">بيانات التواصل</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
          <Phone className="w-5 h-5 text-[#0C6175]" />
          <h2 className="text-lg font-semibold text-gray-800">
            معلومات الدعم
          </h2>
          <span className="text-xs text-gray-400 mr-auto">
            تظهر هذه البيانات في تطبيق الجوال
          </span>
        </div>

        <Suspense fallback={<p className="text-sm text-gray-400">جارٍ التحميل...</p>}>
          <ContactSettingsSection />
        </Suspense>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
          <Share2 className="w-5 h-5 text-[#0C6175]" />
          <h2 className="text-lg font-semibold text-gray-800">
            روابط التواصل الاجتماعي
          </h2>
          <span className="text-xs text-gray-400 mr-auto">
            تظهر هذه الروابط في تطبيق الجوال
          </span>
        </div>

        <Suspense fallback={<p className="text-sm text-gray-400">جارٍ التحميل...</p>}>
          <SocialLinksSection />
        </Suspense>
      </div>
    </main>
  );
}
