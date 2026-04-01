import DataTableSelect from "@/shared/components/data-table/data-table-select";
import type { FormattedExpiredPolicy } from "@/shared/lib/types/policies";
import { formatDate } from "@/shared/lib/utils/format";
import type { ColumnDef } from "@tanstack/react-table";
import ExpiredInsuranceStatusBadge from "../../../../../../../../shared/components/status-badge";
import LoanNotExpiredActions from "./actions";

const loanNotExpiredColumns: ColumnDef<FormattedExpiredPolicy>[] = [
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
      const formattedDate = formatDate(row.getValue("riskStartDate"));
      return <>{formattedDate}</>;
    },
  },
  {
    accessorKey: "riskMaturityDate",
    header: "Risk Maturity Date",
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue("riskMaturityDate"));
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
    accessorKey: "createdBy",
    header: "Created By",
  },
  {
    accessorKey: "createdDate",
    header: "Created Date",
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue("createdDate"));
      return <>{formattedDate}</>;
    },
  },
  {
    accessorKey: "apiResponse",
    header: "API Response",
  },
  {
    accessorKey: "debitAccountNo",
    header: "Debit Account No",
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
    cell: ({ row }) => <LoanNotExpiredActions rowData={row.original} />,
    meta: {
      pin: "right",
    },
  },
];

export default loanNotExpiredColumns;
