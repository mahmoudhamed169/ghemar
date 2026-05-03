const fields = [
  { label: "تاريخ الانضمام", value: "12 يناير 2026" },
  { label: "تاريخ آخر أوردر", value: "15 فبراير 2026" },
  { label: "عدد الأكياس الكلية", value: "5" },
  { label: "عدد الأكياس المتبقية", value: "2" },
  { label: "عدد الأكياس المستخدمة", value: "2" },
  { label: "عدد أكياس الكفالات", value: "1" },
  { label: "اجمالي الاتفاق", value: "100 ﷼", fullWidth: true },
];

export default function CustomerDetailsInfo() {
  return (
    <div className="  ">
      <div className="grid grid-cols-2 gap-3">
        {fields.map((field) => (
          <div
            key={field.label}
            className={`flex flex-col gap-2.5 bg-[#0069800D] border border-[#0C6175] rounded-lg py-4 px-3 min-h-[76px] ${
              field.fullWidth ? "col-span-2" : ""
            }`}
          >
            <span className=" text-[#6A7282]">{field.label}</span>
            <span className="font-bold text-[#000709] ">{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
