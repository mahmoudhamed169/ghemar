"use client";

import { useState } from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import CodeStatusBadge, { type CodeStatus } from "./code-status-badge";

type DiscountCode = {
  serial: number;
  id: number;
  code: string;
  value: string;
  maxLimit: string;
  usage: string;
  expiryDate: string;
  active: boolean;
};

function getInitialCodes(): DiscountCode[] {
  return Array.from({ length: 7 }, (_, i) => ({
    serial: i + 1,
    id: 66788,
    code: "AaB32",
    value: "%20",
    maxLimit: "100 استخدام",
    usage: "48 من 100",
    expiryDate: "12 يناير 2025",
    active: i < 4,
  }));
}

export default function CodesTableBody() {
  const [codes, setCodes] = useState<DiscountCode[]>(getInitialCodes());

  const toggleStatus = (serial: number) => {
    setCodes((prev) =>
      prev.map((code) =>
        code.serial === serial ? { ...code, active: !code.active } : code
      )
    );
  };

  return (
    <TableBody>
      {codes.map((code) => {
        const status: CodeStatus = code.active ? "نشط" : "موقوف";

        return (
          <TableRow
            key={code.serial}
            className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
          >
            {/* الرقم التسلسلي */}
            <TableCell className="text-center text-sm text-gray-500">
              {code.serial}
            </TableCell>

            {/* ID */}
            <TableCell className="text-center font-medium">
              {code.id}
            </TableCell>

            {/* كود الخصم */}
            <TableCell className="text-center font-medium">
              {code.code}
            </TableCell>

            {/* القيمة */}
            <TableCell className="text-center font-medium">
              {code.value}
            </TableCell>

            {/* الحد الأقصى */}
            <TableCell className="text-center text-gray-600">
              {code.maxLimit}
            </TableCell>

            {/* الاستخدام */}
            <TableCell className="text-center text-gray-600">
              {code.usage}
            </TableCell>

            {/* تاريخ الانتهاء */}
            <TableCell className="text-center text-gray-600">
              {code.expiryDate}
            </TableCell>

            {/* الحالة */}
            <TableCell className="text-center">
              <CodeStatusBadge status={status} />
            </TableCell>

            {/* إجراءات - Switch */}
            <TableCell className="text-center">
              <Switch
                checked={code.active}
                onCheckedChange={() => toggleStatus(code.serial)}
                aria-label={`تبديل حالة الكود ${code.serial}`}
                className={
                  code.active
                    ? "data-[state=checked]:bg-green-500"
                    : "data-[state=unchecked]:bg-gray-300"
                }
              />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}