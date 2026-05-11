"use client";

import { useState } from "react";
import AddCodeFields from "./add-code-fields";
import AddCodeActions from "./add-code-actions";

interface AddCodeFormProps {
  onClose: () => void;
}

interface FormState {
  code: string;
  value: string;
  maxUsage: string;
  expiryDate: string;
}

const INITIAL_STATE: FormState = {
  code: "",
  value: "",
  maxUsage: "",
  expiryDate: "",
};

export default function AddCodeForm({ onClose }: AddCodeFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: استدعاء الـ API هنا
      console.log("Saving code:", form);
      setForm(INITIAL_STATE);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setForm(INITIAL_STATE);
    onClose();
  };

  return (
    <div className="flex flex-col gap-6">
      <AddCodeFields
        code={form.code}
        value={form.value}
        maxUsage={form.maxUsage}
        expiryDate={form.expiryDate}
        onChange={handleChange}
      />
      <AddCodeActions
        onCancel={handleCancel}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </div>
  );
}