export type AdminRole = "super_admin" | "admin";

export interface Admin {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  role: AdminRole;
  branchId?: string;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminsResponse {
  success: boolean;
  message: string;
  data: Admin[];
}

export interface CreateAdminPayload {
  name: string;
  phone: string;
  role: AdminRole;
  branchId: string;
  permissions: string[];
}

export type UpdateAdminPayload = Partial<Pick<CreateAdminPayload, "name" | "phone" | "branchId">>;
