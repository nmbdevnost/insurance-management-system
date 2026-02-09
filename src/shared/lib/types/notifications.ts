export type ScheduledNotification = {
  policy_number: string;
  cif_id: string;
  username: string;
  expiry_date: string;
  scheduled_date: string;
  type: string;
  status: "pending" | "on-hold";
};
