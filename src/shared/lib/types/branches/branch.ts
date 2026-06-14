export interface BranchAreaCity {
  _id: string;
  name: string;
  nameAr: string;
  code: string;
}

export interface BranchArea {
  _id: string;
  cityId: BranchAreaCity;
  areaCode: string;
}

export interface Branch {
  _id: string;
  name: string;
  nameAr: string;
  code: string;
  areas: BranchArea[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BranchesResponse {
  success: boolean;
  data: Branch[];
}

export interface BranchResponse {
  success: boolean;
  data: Branch;
}

export interface BranchAreaInput {
  cityId: string;
  areaCode: string;
}

export interface CreateBranchInput {
  name: string;
  nameAr: string;
  code: string;
  areas: BranchAreaInput[];
}

export type UpdateBranchInput = Partial<CreateBranchInput>;
