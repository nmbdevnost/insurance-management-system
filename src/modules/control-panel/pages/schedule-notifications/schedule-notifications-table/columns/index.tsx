import InsuranceStatusBadge from "@/shared/components/status-badge";
import { Badge } from "@/shared/components/ui/badge";
import type { ScheduledNotification } from "@/shared/lib/types/notifications";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import ScheduledNotificationViewAction from "./actions/view-action";

const scheduleNotificationColumns: ColumnDef<ScheduledNotification>[] = [
  {
    accessorKey: "policy_number",
    header: "Policy Number",
  },
  {
    accessorKey: "cif_id",
    header: "CIF ID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "expiry_date",
    header: "Expiry Date",
    cell: ({ row }) => {
      const date = row.getValue("expiry_date");
      if (!date) return "-";
      return format(new Date(date as string), "PPP");
    },
  },
  {
    accessorKey: "scheduled_date",
    header: "Scheduled Date",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type");
      if (!type) return "-";
      return (
        <Badge
          className="text-primary border-primary bg-primary/10 capitalize"
          variant="outline"
        >
          {type as string}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      if (!status) return "-";
      return <InsuranceStatusBadge status={status as string} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <>
        <ScheduledNotificationViewAction rowData={row.original} />
      </>
    ),
  },
];

export default scheduleNotificationColumns;
