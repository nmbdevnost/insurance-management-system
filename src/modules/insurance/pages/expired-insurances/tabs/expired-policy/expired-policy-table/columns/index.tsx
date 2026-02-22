import type { ExpiredPolicy } from "@/shared/lib/types/policies";
import { Checkbox } from "@/shared/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import ExpiredInsuranceActions from "./actions";
import ExpiredInsuranceStatusBadge from "../../../../../../../../shared/components/status-badge";
import { formatDate } from "@/shared/lib/utils/format";

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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "branchName",
    header: "Branch Name",
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
    accessorKey: "initiationType",
    header: "Initiation Type",
  },
  {
    accessorKey: "policyIssuedDate",
    header: "Policy Issued Date",
  },
  {
    accessorKey: "riskStartDate",
    header: "Risk Start Date",
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue("riskStartDate"), "PPP");
      return <>{formattedDate}</>;
    },
  },
  {
    accessorKey: "riskMaturityDate",
    header: "Risk Maturity Date",
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue("riskMaturityDate"), "PPP");
      return <>{formattedDate}</>;
    },
  },
  {
    accessorKey: "termDays",
    header: "Term Days",
  },
  {
    accessorKey: "assetType",
    header: "Asset Type",
  },
  {
    accessorKey: "sumInsured",
    header: "Sum Insured",
  },
  {
    accessorKey: "totalPremium",
    header: "Total Premium",
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
    accessorKey: "createdBy",
    header: "Created By",
  },
  {
    accessorKey: "createdDate",
    header: "Created Date",
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue("createdDate"), "PPP");
      return <>{formattedDate}</>;
    },
  },
  {
    accessorKey: "apiResponse",
    header: "API Response",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ExpiredInsuranceActions policy={row.original} />,
    meta: {
      pin: "right",
    },
  },
];

export default expiredPolicyColumns;
