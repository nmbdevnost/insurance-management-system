import InsuranceStatusBadge from "@/shared/components/status-badge";
import { Checkbox } from "@/shared/components/ui/checkbox";
import type { ExpiredLoan } from "@/shared/lib/types/loans";
import { formatDate } from "@/shared/lib/utils/format";
import type { ColumnDef } from "@tanstack/react-table";
import ExpiredLoanActions from "./actions";

const expiredLoanColumns: ColumnDef<ExpiredLoan>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div>
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    size: 30,
  },
  {
    accessorKey: "referenceNo",
    header: "Reference No",
  },
  {
    accessorKey: "policyNumber",
    header: "Policy Number",
  },
  {
    accessorKey: "cifId",
    header: "CIFID",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "accountNo",
    header: "Account No",
  },
  {
    accessorKey: "accountStatus",
    header: "Account Status",
  },
  {
    accessorKey: "accountClosedDate",
    header: "Account Closed Date",
    cell: ({ row }) => {
      const formattedDate = formatDate(
        row.getValue("accountClosedDate"),
        "PPP"
      );
      return <>{formattedDate}</>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <InsuranceStatusBadge status={row.getValue("status")} />,
    meta: {
      pin: "right",
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ExpiredLoanActions rowData={row.original} />,
    meta: {
      pin: "right",
    },
  },
];

export default expiredLoanColumns;
