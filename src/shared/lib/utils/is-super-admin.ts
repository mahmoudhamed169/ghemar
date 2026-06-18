// TODO: remove TEMP_SUPER_ADMIN_PHONE once backend fixes role in verify-otp response
const TEMP_SUPER_ADMIN_PHONE = "+966500000000";

export function checkIsSuperAdmin(role?: string | null, phone?: string | null): boolean {
  return role === "super_admin" || phone === TEMP_SUPER_ADMIN_PHONE;
}
