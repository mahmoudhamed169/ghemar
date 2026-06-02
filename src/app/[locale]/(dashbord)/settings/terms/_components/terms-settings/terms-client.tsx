"use client";

import { useState } from "react";
import { TermsSettings } from "@/shared/lib/types/settings/terms-settings";
import { useUpdateTermsSettings } from "@/shared/lib/hooks/settings/use-update-terms-settings";
import TermCard from "./term-card";
import TermsActions from "./terms-actions";

type SectionKey = "introduction" | "serviceUsage" | "userResponsibilities" | "cancellationPolicy" | "privacy" | "legalLiability";

const SECTIONS: SectionKey[] = [
  "introduction",
  "serviceUsage",
  "userResponsibilities",
  "cancellationPolicy",
  "privacy",
  "legalLiability",
];

interface TermsClientProps {
  initialData: TermsSettings;
}

export default function TermsClient({ initialData }: TermsClientProps) {
  const [data, setData] = useState<TermsSettings>(initialData);
  const { mutate: updateTerms, isPending } = useUpdateTermsSettings();

  const handleChange = (field: keyof TermsSettings, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  return (
    <div>
      <div className="flex flex-col gap-6">
        {SECTIONS.map((key) => (
          <TermCard
            key={key}
            sectionKey={key}
            valueAr={data[`${key}Ar` as keyof TermsSettings]}
            valueEn={data[key]}
            onChangeAr={(v) => handleChange(`${key}Ar` as keyof TermsSettings, v)}
            onChangeEn={(v) => handleChange(key, v)}
          />
        ))}
      </div>

      <TermsActions
        onSave={() => updateTerms(data)}
        onCancel={() => setData(initialData)}
        loading={isPending}
      />
    </div>
  );
}
