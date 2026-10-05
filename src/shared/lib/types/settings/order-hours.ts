export interface ClosedWindow {
  _id?: string;
  /** 24-hour "HH:mm" */
  from: string;
  /** 24-hour "HH:mm" — may be earlier than `from` when the window crosses midnight */
  to: string;
  isActive: boolean;
  note?: string;
}

export interface OrderHours {
  timezone: string;
  closedWindows: ClosedWindow[];
  isClosedNow: boolean;
  /** "HH:mm" when isClosedNow is true */
  reopensAt: string | null;
}

export interface OrderHoursResponse {
  success: boolean;
  data: OrderHours;
}

export type ClosedWindowInput = Omit<ClosedWindow, "_id">;

export interface UpdateOrderHoursResult {
  success: boolean;
  message?: string;
  data?: OrderHours;
}
