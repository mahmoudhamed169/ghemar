export interface ActivationCodePackage {
  _id: string;
  name: string;
}

export interface ActivationCodeUser {
  _id: string;
  phone: string;
  name: string;
}

export interface ActivationCodeCreatedBy {
  _id: string;
  name: string;
}

export interface ActivationCode {
  _id: string;
  code: string;
  packageId: ActivationCodePackage | null;
  isUsed: boolean;
  createdBy: ActivationCodeCreatedBy | null;
  createdAt: string;
  updatedAt: string;
  usedAt?: string;
  usedBy?: ActivationCodeUser | null;
  __v: number;
}

export interface ActivationCodesPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ActivationCodesResponse {
  success: boolean;
  message: string;
  data: ActivationCode[];
  pagination: ActivationCodesPagination;
}

export interface ActivationCodesParams {
  page?: number;
  limit?: number;
  packageId?: string;
  isUsed?: boolean;
}
