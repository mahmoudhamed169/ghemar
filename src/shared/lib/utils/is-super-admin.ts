export function checkIsSuperAdmin(role?: string | null): boolean {
  return role === "super_admin";
}
