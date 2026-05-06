import OpSettings from "./_components/operation-settings/index";
import SecSettings from "./_components/security-settings";

export default function page() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold"> اعدادات التشغيل </h1>
      <OpSettings />
      <SecSettings />
    </main>
  );
}
