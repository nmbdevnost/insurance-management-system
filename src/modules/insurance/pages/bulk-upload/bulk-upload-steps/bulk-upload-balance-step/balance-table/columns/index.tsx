import type { BalanceCheckResult } from "@/modules/insurance/lib/types/insurances";
import StatusBadge from "@/shared/components/status-badge";
import type { ColumnDef } from "@tanstack/react-table";

const balanceColumns: ColumnDef<BalanceCheckResult>[] = [
  {
    accessorKey: "reference_number",
    header: "Reference Number",
  },
  {
    accessorKey: "debit_account_number",
    header: "Account Number",
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
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => row.original.amount?.toLocaleString(),
  },
  {
    accessorKey: "balanceInfo.availablE_BALANCE",
    header: "Available Balance",
    cell: ({ row }) =>
      row.original.balanceInfo.availablE_BALANCE.toLocaleString(),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge
        status={row.original.hasEnoughBalance ? "Available" : "Insufficient"}
      />
    ),
  },
];

export default balanceColumns;
