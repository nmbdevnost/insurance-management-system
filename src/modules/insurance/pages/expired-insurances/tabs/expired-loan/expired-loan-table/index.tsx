import DataTable from "@/shared/components/data-table";
import DataTablePagination from "@/shared/components/data-table/data-table-pagination";
import DataTableToolbar from "@/shared/components/data-table/data-table-toolbar";
import { Card, CardFooter, CardHeader } from "@/shared/components/ui/card";
import type { FilterConfig } from "@/shared/lib/types/table";

const ExpiredLoanTable = () => {
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
    },
  ];

  return (
    <>
      <Card className="gap-0 p-0">
        <CardHeader className="p-2">
          <DataTableToolbar filters={filters} />
        </CardHeader>

        <DataTable className="rounded-none border-x-0" />

        <CardFooter className="bg-background border-t-0 p-2">
          <DataTablePagination className="w-full" />
        </CardFooter>
      </Card>
    </>
  );
};

export default ExpiredLoanTable;
