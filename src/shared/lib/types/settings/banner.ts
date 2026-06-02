export interface Banner {
  _id: string;
  title: string;
  imageUrl: string;
  link: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BannersResponse {
  success: boolean;
  data: Banner[];
}

export interface BannerResponse {
  success: boolean;
  data: Banner;
}

export interface CreateBannerInput {
  title: string;
  link?: string;
  isActive?: boolean;
  sortOrder?: number;
  image: File;
}

export interface UpdateBannerInput {
  id: string;
  title?: string;
  link?: string;
  isActive?: boolean;
  sortOrder?: number;
  image?: File;
}
