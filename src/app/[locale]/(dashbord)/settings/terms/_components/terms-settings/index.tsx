"use client";

import { useState } from "react";
import { mockTerms } from "./mock";
import type { TermSection } from "./types";
import TermCard from "./term-card";
import TermsActions from "./terms-actions";

export default function TermsSettings() {
  const [terms, setTerms] = useState<TermSection[]>(mockTerms);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setTerms((prev) =>
      prev.map((t) => (t.key === key ? { ...t, content: value } : t)),
    );
  };

  const handleSave = async () => {
    setLoading(true);
    // TODO: استبدل بـ API call
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    console.log("Saved terms:", terms);
  };

  const handleCancel = () => {
    setTerms(mockTerms);
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >
        {terms.map((term) => (
          <TermCard
            key={term.key}
            title={term.title}
            content={term.content}
            onChange={(value) => handleChange(term.key, value)}
          />
        ))}
      </div>

      <TermsActions
        onSave={handleSave}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
}
