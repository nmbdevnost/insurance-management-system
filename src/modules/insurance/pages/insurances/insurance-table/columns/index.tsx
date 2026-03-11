import DataTableSelect from "@/shared/components/data-table/data-table-select";
import StatusBadge from "@/shared/components/status-badge";
import type { Insurance } from "@/shared/lib/types/insurance";
import type { ColumnDef } from "@tanstack/react-table";
import InsuranceActions from "./actions";
const insuranceColumns: ColumnDef<Insurance>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableSelect variant="multiple" table={table} />,
    cell: ({ row }) => <DataTableSelect variant="single" row={row} />,
    size: 30,
  },
  {
    accessorKey: "policy_number",
    header: "Policy Number",
  },
  {
    accessorKey: "cif_id",
    header: "Customer CIF ID",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "segment",
    header: "Segment",
  },
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "province",
    header: "Province",
  },
  {
    accessorKey: "insurance_company",
    header: "Insurance Company",
  },
  {
    accessorKey: "sum_insured",
    header: "Sum Insured",
  },
  {
    accessorKey: "total_premium",
    header: "Premium",
  },
  {
    accessorKey: "risk_start_date",
    header: "Risk Start Date",
  },
  {
    accessorKey: "maturity_end_date",
    header: "Maturity End Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    meta: {
      pin: "right",
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <InsuranceActions rowData={row.original} />,
    meta: {
      pin: "right",
    },
  },
];

export default insuranceColumns;
