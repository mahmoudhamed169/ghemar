import SecuritySettings from "./alerts";
import LogoutAllSessionsButton from "./logout-all-sessions-button";

export default function SecSettings() {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">اعدادات الأمان </h2>
      <div className="space-y-6">
        <SecuritySettings />
        <LogoutAllSessionsButton />
      </div>
    </section>
  );
}
