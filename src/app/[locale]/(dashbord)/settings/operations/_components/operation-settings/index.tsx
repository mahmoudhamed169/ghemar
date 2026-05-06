import React from "react";
import Alerts from "./alerts";
import OperationSettings from "./alerts";

export default function opSettings() {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        اعدادات التشغيل{" "}
      </h2>
      <OperationSettings />
    </section>
  );
}
