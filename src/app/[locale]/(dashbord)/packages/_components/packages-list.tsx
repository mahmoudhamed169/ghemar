import PackageCard from "./package-card";

async function getPackages() {
  return [
    {
      id: 1,
      name: "الحقيبة الأساسية",
      price: 99,
      bags: 2,
      description: "الباقة تشمل غسيل وي",
    },
    {
      id: 2,
      name: "الحقيبة الفضية",
      price: 199,
      bags: 2,
      description: "الباقة تشمل غسيل وي",
    },
    {
      id: 3,
      name: "الحقيبة الذهبية",
      price: 299,
      bags: 2,
      description: "الباقة تشمل غسيل وي",
    },
    {
      id: 4,
      name: "الحقيبة البلاتينية",
      price: 399,
      bags: 2,
      description: "الباقة تشمل غسيل وي",
    },
  ];
}

export default async function PackagesList() {
  const packages = await getPackages();

  return (
    <div className="grid grid-cols-2 gap-4">
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} {...pkg} />
      ))}
    </div>
  );
}
