"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ==============================
// Send OTP
// ==============================
export async function sendOtpAction(phone: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const res = await fetch(`${API_URL}/api/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: `+966${phone}` }),
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: json?.message ?? "حدث خطأ، حاول مرة أخرى",
      };
    }

    return { success: true, message: json.message ?? "تم إرسال الرمز" };
  } catch {
    return { success: false, message: "تعذّر الاتصال بالخادم" };
  }
}

// ==============================
// Verify OTP  — بنرجع البيانات للـ client عشان يعملها signIn
// ==============================
export async function verifyOtpAction(
  phone: string,
  code: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: `+966${phone}`, code }),
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      return {
        success: false,
        message: json?.message ?? "الرمز غير صحيح أو منتهي",
      };
    }

    return { success: true, message: json.message ?? "تم التحقق بنجاح" };
  } catch {
    return { success: false, message: "تعذّر الاتصال بالخادم" };
  }
}
