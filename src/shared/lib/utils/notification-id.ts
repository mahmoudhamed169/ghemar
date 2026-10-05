// Stored notifications have a Mongo ObjectId. Live alerts (ids starting with
// new_ / exp_ / dlv_ / ovr_) are not stored, so they can't be marked as read.
export function isStoredNotificationId(id: string): boolean {
  return /^[a-f\d]{24}$/i.test(id);
}
