import DataTable from "@/shared/components/data-table";
import DataTablePagination from "@/shared/components/data-table/data-table-pagination";
import DataTableToolbar from "@/shared/components/data-table/data-table-toolbar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import type { DropdownOption } from "@/shared/lib/types/dropdown";
import type { FilterConfig } from "@/shared/lib/types/table";

// Branch Options
const branchOptions: DropdownOption[] = [
  { label: "Kathmandu Branchdsd asdsadsds", value: "kathmandu" },
  { label: "Pokhara Branchdasd sdsd sdasdas", value: "pokhara" },
  { label: "Biratnagar Branch", value: "biratnagar" },
  { label: "Butwal Branch", value: "butwal" },
  { label: "Dhangadhi Branch", value: "dhangadhi" },
  { label: "Chitwan Branch", value: "chitwan" },
  { label: "Lalitpur Branch", value: "lalitpur" },
  { label: "Birgunj Branch", value: "birgunj" },
];

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
      options: branchOptions,
      type: "select",
      multiple: true,
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
