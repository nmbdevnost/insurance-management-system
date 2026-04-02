import type { ExtractedRow } from "@/modules/insurance/lib/types/bulk-transaction";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

const extractedColumns: ColumnDef<ExtractedRow>[] = [
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
    accessorKey: "amount",
    header: "Amount",
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
    cell: ({ row }) => {
      const date = new Date(row.original.uploaded_date);
      return format(date, "PPP");
    },
  },
];

export default extractedColumns;
