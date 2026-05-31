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
