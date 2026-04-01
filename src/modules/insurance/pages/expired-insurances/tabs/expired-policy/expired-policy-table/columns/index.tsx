import DataTableSelect from "@/shared/components/data-table/data-table-select";
import type { FormattedExpiredPolicy } from "@/shared/lib/types/policies";
import { formatDate } from "@/shared/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import ExpiredInsuranceStatusBadge from "../../../../../../../../shared/components/status-badge";
import ExpiredInsuranceActions from "./actions";

const expiredPolicyColumns: ColumnDef<FormattedExpiredPolicy>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableSelect variant="multiple" table={table} />,
    cell: ({ row }) => <DataTableSelect variant="single" row={row} />,
    size: 30,
  },
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
    accessorKey: "initiationTypeId",
    header: "Initiation Type",
  },
  {
    accessorKey: "policyIssueDate",
    header: "Policy Issued Date",
    cell: ({ row }) => {
      const formattedDate = formatDate(row.original.policyIssueDate);
      return <>{formattedDate}</>;
    },
  },
  // {
  //   accessorKey: "riskStartDate",
  //   header: "Risk Start Date",
  //   cell: ({ row }) => {
  //     const formattedDate = formatDate(row.getValue("riskStartDate"), "PPP");
  //     return <>{formattedDate}</>;
  //   },
  // },
  // {
  //   accessorKey: "riskMaturityDate",
  //   header: "Risk Maturity Date",
  //   cell: ({ row }) => {
  //     const formattedDate = formatDate(row.getValue("riskMaturityDate"), "PPP");
  //     return <>{formattedDate}</>;
  //   },
  // },
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
  // {
  //   accessorKey: "createdBy",
  //   header: "Created By",
  // },
  // {
  //   accessorKey: "createdDate",
  //   header: "Created Date",
  //   cell: ({ row }) => {
  //     const formattedDate = formatDate(row.getValue("createdDate"), "PPP");
  //     return <>{formattedDate}</>;
  //   },
  // },
  {
    accessorKey: "insuranceApiResponseReceived",
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
