export function checkIsSuperAdmin(role?: string | null, isBranchAdmin?: boolean | null): boolean {
  if (isBranchAdmin === false) return true;
  return role === "super_admin";
}
