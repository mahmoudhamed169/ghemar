"use client";
import { useTranslations } from "next-intl";
import { DriverDetail } from "@/shared/lib/types/drivers/driver";

export default function DriverDetailsLocation({ driver }: { driver: DriverDetail }) {
  const t = useTranslations("drivers.details");

  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.0!2d46.6!3d24.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzAwLjAiTiA0NsKwMzYnMDAuMCJF!5e0!3m2!1sen!2ssa!4v1`;

  return (
    <div className="border border-[#00000014] rounded-xl p-4 flex flex-col gap-3">
      <h3 className="font-semibold text-[#000709]">{t("location")}</h3>
      <p className="text-sm text-gray-500">
        {driver.cityId?.name || "—"}
      </p>
      <div className="w-full h-40 rounded-xl overflow-hidden">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title={t("location")}
        />
      </div>
    </div>
  );
}