import type { ExpiredPolicy } from "@/modules/insurance/types/policies";
import { Checkbox } from "@/shared/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import ExpiredInsuranceActions from "./actions";
import ExpiredInsuranceStatusBadge from "./status-badge";

const expiredPolicyColumns: ColumnDef<ExpiredPolicy>[] = [
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
    accessorKey: "insuranceCompany",
    header: "Insurance Company",
  },
  {
    accessorKey: "sumInsured",
    header: "Sum Insured",
  },
  {
    accessorKey: "premium",
    header: "Premium",
  },
  {
    accessorKey: "daysLeft",
    header: "Days Left",
  },
  {
    accessorKey: "riskStartDate",
    header: "Risk Start Date",
  },
  {
    accessorKey: "riskMaturityDate",
    header: "Risk Maturity Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <ExpiredInsuranceStatusBadge status={row.original.status} />
    ),
    meta: {
      pin: "right",
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ExpiredInsuranceActions insurance={row.original} />,
    meta: {
      pin: "right",
    },
  },
];

export default expiredPolicyColumns;
