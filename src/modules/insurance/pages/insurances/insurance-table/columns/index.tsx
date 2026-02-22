import InsuranceStatusBadge from "@/shared/components/status-badge";
import { Checkbox } from "@/shared/components/ui/checkbox";
import type { Insurance } from "@/shared/lib/types/insurance";
import type { ColumnDef } from "@tanstack/react-table";
import InsuranceActions from "./actions";
const insuranceColumns: ColumnDef<Insurance>[] = [
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
    cell: ({ row }) => <InsuranceStatusBadge status={row.getValue("status")} />,
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
