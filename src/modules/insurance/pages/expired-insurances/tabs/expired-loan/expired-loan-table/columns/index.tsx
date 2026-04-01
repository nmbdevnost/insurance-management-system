import InsuranceStatusBadge from "@/shared/components/status-badge";
import type { ExpiredLoan } from "@/shared/lib/types/loans";
import type { FormattedExpiredPolicy } from "@/shared/lib/types/policies";
import { formatDate } from "@/shared/lib/utils/format";
import type { ColumnDef } from "@tanstack/react-table";
import ExpiredLoanActions from "./actions";

const expiredLoanColumns: ColumnDef<FormattedExpiredPolicy>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => <DataTableSelect variant="multiple" table={table} />,
  //   cell: ({ row }) => <DataTableSelect variant="single" row={row} />,
  //   size: 30,
  // },
  {
    accessorKey: "referenceNumber",
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
    cell: ({ row }) => (
      <ExpiredLoanActions rowData={row.original as unknown as ExpiredLoan} />
    ),
    meta: {
      pin: "right",
    },
  },
];

export default expiredLoanColumns;
