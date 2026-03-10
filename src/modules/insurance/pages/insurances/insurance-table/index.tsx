import DataTable from "@/shared/components/data-table";
import DataTableActionBar from "@/shared/components/data-table/data-table-action-bar";
import DataTablePagination from "@/shared/components/data-table/data-table-pagination";
import DataTableToolbar from "@/shared/components/data-table/data-table-toolbar";
import { Card, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { DEFAULT_TABLE_PARAMS } from "@/shared/lib/constants/data-table";
import type { FilterConfig } from "@/shared/lib/types/table";
import { generateQueryParams } from "@/shared/lib/utils/query-params";
import {
  DataTableProvider,
  type TableParams,
} from "@/shared/providers/data-table-provider";
import { useMemo, useState } from "react";
import InsuranceBulkApply from "./bulk-actions/insurance-bulk-apply";
import InsuranceBulkDelete from "./bulk-actions/insurance-bulk-delete";
import insuranceColumns from "./columns";

const InsuranceTable = () => {
  const [tableParams, setTableParams] =
    useState<TableParams>(DEFAULT_TABLE_PARAMS);

  const queryParams = useMemo(
    () => generateQueryParams(tableParams),
    [tableParams]
  );

  console.log("🚀 ~ ExpiredIsurancePage ~ queryParams:", queryParams);

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
  ];

  return (
    <>
      <DataTableProvider
        data={[]}
        columns={insuranceColumns}
        tableParams={tableParams}
        onTableParamsChange={setTableParams}
        enableRowSelection
      >
        <Card className="gap-0 p-0">
          <CardHeader className="p-2">
            <DataTableToolbar filters={filters} />
          </CardHeader>

          <DataTable className="rounded-none border-x-0" />

          <CardFooter className="bg-card border-t-0 p-2">
            <DataTablePagination className="w-full" />
          </CardFooter>
        </Card>

        <DataTableActionBar>
          <InsuranceBulkApply />

          <InsuranceBulkDelete />
        </DataTableActionBar>
      </DataTableProvider>
    </>
  );
};

export default InsuranceTable;
