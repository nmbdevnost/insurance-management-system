import { Checkbox } from "@/components/ui/checkbox";
import type { Insurance } from "@/lib/types/insurance";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import ExpiredInsuranceActions from "./actions";
import ExpiredInsuranceStatusBadge from "./status-badge";

const expiredInsuranceColumns: ColumnDef<Insurance>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "loan_number",
    header: "Loan#",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "insurance_expiry",
    header: "Insurance Expiry",
    cell: ({ row }) => (
      <div>
        <p>{format(new Date(row.original.insurance_expiry_date), "PPP")}</p>
        <p className="text-muted-foreground text-sm">
          Policy: {row.original.policy}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "days_left",
    header: "Days Left",
    cell: ({ row }) => (
      <>
        <p>
          {row.original.days_left} {row.original.days_left > 1 ? "days" : "day"}
        </p>
      </>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <ExpiredInsuranceStatusBadge status={row.original.status} />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ExpiredInsuranceActions insurance={row.original} />,
  },
];

export default expiredInsuranceColumns;
