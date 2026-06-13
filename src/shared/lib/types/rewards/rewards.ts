export interface RedeemUser {
  _id: string;
  phone: string;
  name?: string;
}

export interface RedeemEntry {
  _id: string;
  userId: RedeemUser;
  type: string;
  points: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface RedeemResponse {
  success: boolean;
  data: RedeemEntry[];
  pagination: PointsPagination;
}

export interface RewardsStats {
  totalIssued: number;
  totalUsed: number;
  activeUsers: number;
  redemptionsCount: number;
}

export interface RewardsStatsResponse {
  success: boolean;
  data: RewardsStats;
}

export interface PointsUser {
  _id: string;
  phone: string;
  name?: string;
  currentPoints: number;
  totalPointsEarned: number;
}

export interface PointsPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface RewardsPointsResponse {
  success: boolean;
  data: PointsUser[];
  pagination: PointsPagination;
}
