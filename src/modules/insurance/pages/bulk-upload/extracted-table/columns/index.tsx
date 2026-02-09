import InsuranceStatusBadge from "@/shared/components/status-badge";
import type { ExcelExtractedRow } from "@/shared/lib/types/insurance";
import type { ColumnDef } from "@tanstack/react-table";

const extractedColumns: ColumnDef<ExcelExtractedRow>[] = [
  {
    accessorKey: "Customer Name",
    header: "Customer Name",
  },
  {
    accessorKey: "Customer Email",
    header: "Customer Email",
  },
  {
    accessorKey: "Customer Phone",
    header: "Phone",
  },
  {
    accessorKey: "Customer ID Number",
    header: "ID Number",
  },
  {
    accessorKey: "Reference Identifier",
    header: "Reference ID",
  },
  {
    accessorKey: "Proposed Date Time",
    header: "Proposed Date Time",
  },
  {
    accessorKey: "Scheduled Date Time",
    header: "Scheduled Date Time",
  },
  {
    accessorKey: "Purpose",
    header: "Purpose",
  },
  {
    accessorKey: "Location",
    header: "Location",
  },
  {
    accessorKey: "Assigned Staff",
    header: "Assigned Staff",
  },
  {
    accessorKey: "Customer TimeZone",
    header: "Customer TimeZone",
  },
  {
    accessorKey: "Agent TimeZone",
    header: "Agent TimeZone",
  },
  {
    accessorKey: "Remarks",
    header: "Remarks",
  },
  {
    accessorKey: "Cancellation Reason",
    header: "Cancellation Reason",
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      pin: "right",
    },
    cell: ({ row }) => (
      <InsuranceStatusBadge status={row.original.status || ""} />
    ),
  },
];

export default extractedColumns;
