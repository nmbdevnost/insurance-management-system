import type { EnrichedRow } from "@/modules/insurance/lib/types/bulk-transaction";
import DataTableSelect from "@/shared/components/data-table/data-table-select";
import StatusBadge from "@/shared/components/status-badge";
import { formatCurrency } from "@/shared/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

const enrichedColumns: ColumnDef<EnrichedRow>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableSelect variant="multiple" table={table} />,
    cell: ({ row }) => <DataTableSelect variant="single" row={row} />,
  },
  {
    accessorKey: "reference_number",
    header: "Reference Number",
  },
  {
    accessorKey: "cif_id",
    header: "CIF ID",
  },
  {
    accessorKey: "policy_number",
    header: "Policy Number",
  },
  {
    accessorKey: "debit_account_number",
    header: "Debit Account Number",
  },
  {
    accessorKey: "credit_account_number",
    header: "Credit Account Number",
  },
  {
    accessorKey: "tran_particular",
    header: "Transaction Particular",
  },
  {
    accessorKey: "tran_remarks",
    header: "Transaction Remarks",
  },
  {
    accessorKey: "uploaded_by",
    header: "Uploaded By",
  },
  {
    accessorKey: "uploaded_date",
    header: "Uploaded Date",
    cell: ({ row }) => format(new Date(row.original.uploaded_date), "PPP"),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrency(row.original.amount),
    meta: {
      pin: "right",
    },
  },
  {
    accessorKey: "availableBalance",
    header: "Available Balance",
    cell: ({ row }) => formatCurrency(row.original.availableBalance),
    meta: {
      pin: "right",
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
    meta: {
      pin: "right",
    },
  },
];

export default enrichedColumns;
