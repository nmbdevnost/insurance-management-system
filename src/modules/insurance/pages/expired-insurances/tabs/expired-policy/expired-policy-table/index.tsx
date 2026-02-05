import DataTable from "@/shared/components/data-table";
import DataTablePagination from "@/shared/components/data-table/data-table-pagination";
import DataTableToolbar from "@/shared/components/data-table/data-table-toolbar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import type { FilterConfig } from "@/shared/lib/types/table";

const ExpiredPolicyTable = () => {
  const filters: FilterConfig[] = [
    {
      id: "status",
      label: "Status",
      options: [
        { label: "Auto-Deduct", value: "auto-deduct" },
        { label: "Manual-Deduct", value: "manual-deduct" },
        { label: "No-Deduct", value: "no-deduct" },
      ],
      type: "select",
      disableSearch: true,
    },
    {
      id: "branch",
      label: "Branch",
      options: [
        { label: "Auto-Deduct", value: "auto-deduct" },
        { label: "Manual-Deduct", value: "manual-deduct" },
        { label: "No-Deduct", value: "no-deduct" },
      ],
      type: "select",
      disableSearch: true,
    },
  ];

  return (
    <>
      <Card className="gap-0 p-0">
        <CardHeader className="p-2">
          <DataTableToolbar filters={filters} />
        </CardHeader>

        <CardContent className="p-0">
          <DataTable className="rounded-none border-x-0" />
        </CardContent>

        <CardFooter className="bg-background border-t-0 p-2">
          <DataTablePagination className="w-full" />
        </CardFooter>
      </Card>
    </>
  );
};

export default ExpiredPolicyTable;
