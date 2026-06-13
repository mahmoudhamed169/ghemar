import { Suspense } from "react";
import { getContactInfo } from "@/shared/lib/services/content/get-contact";
import ContactSettingsForm from "./_components/contact-settings-form";
import { Phone } from "lucide-react";

async function ContactSettingsSection() {
  const contact = await getContactInfo();

  if (!contact) {
    return (
      <p className="text-sm text-gray-400">تعذّر تحميل بيانات التواصل</p>
    );
  }

  return <ContactSettingsForm initialData={contact} />;
}

export default function ContactSettingsPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">بيانات التواصل</h1>

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
    </main>
  );
}
