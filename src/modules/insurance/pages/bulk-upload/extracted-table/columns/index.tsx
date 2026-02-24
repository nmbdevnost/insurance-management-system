import type { InsuranceBulkUploadRow } from "@/shared/lib/types/insurance";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

const extractedColumns: ColumnDef<InsuranceBulkUploadRow>[] = [
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
