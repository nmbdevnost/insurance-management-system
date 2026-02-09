import type { ScheduledNotification } from "@/shared/lib/types/notifications";
import { DataTableProvider } from "@/shared/providers/data-table-provider";
import ScheduledNotificationsTable from "./schedule-notifications-table";
import scheduleNotificationColumns from "./schedule-notifications-table/columns";

export const scheduledNotifications: ScheduledNotification[] = [
  {
    policy_number: "POL-001",
    cif_id: "CIF1001",
    username: "john.doe",
    expiry_date: "2024-12-31",
    scheduled_date: "2024-11-15",
    type: "Monthly Reminder",
    status: "pending",
  },
  {
    policy_number: "POL-002",
    cif_id: "CIF1002",
    username: "jane.smith",
    expiry_date: "2024-10-15",
    scheduled_date: "2024-09-30",
    type: "Weekly Reminder",
    status: "on-hold",
  },
  {
    policy_number: "POL-003",
    cif_id: "CIF1003",
    username: "robert.j",
    expiry_date: "2025-03-20",
    scheduled_date: "2025-02-01",
    type: "Daily Reminder",
    status: "pending",
  },
  {
    policy_number: "POL-004",
    cif_id: "CIF1004",
    username: "sarah.w",
    expiry_date: "2024-08-10",
    scheduled_date: "2024-07-25",
    type: "Auto-Renewal",
    status: "on-hold",
  },
  {
    policy_number: "POL-005",
    cif_id: "CIF1005",
    username: "mike.c",
    expiry_date: "2025-01-05",
    scheduled_date: "2024-12-20",
    type: "Weekly Reminder",
    status: "pending",
  },
];

const ScheduleNotificationPage = () => {
  return (
    <>
      <div>
        <h1 className="page-heading">Scheduled Notifications</h1>

        <p className="text-muted-foreground">
          Manage and monitor scheduled notifications for policy renewals and
          reminders.
        </p>
      </div>

      <DataTableProvider
        columns={scheduleNotificationColumns}
        data={scheduledNotifications}
        className="gap-2"
      >
        <ScheduledNotificationsTable />
      </DataTableProvider>
    </>
  );
};

export default ScheduleNotificationPage;
