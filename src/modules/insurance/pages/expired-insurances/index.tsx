import DataTable from "@/components/data-table";
import DataTablePagination from "@/components/data-table/data-table-pagination";
import DataTableToolbar from "@/components/data-table/data-table-toolbar";
import { Card } from "@/components/ui/card";
import { DEFAULT_TABLE_PARAMS } from "@/lib/constants/data-table";
import type { Insurance } from "@/lib/types/insurance";
import type { FilterConfig } from "@/lib/types/table";
import { generateQueryParams } from "@/lib/utils/query-params";
import {
  DataTableProvider,
  type TableParams,
} from "@/providers/data-table-provider";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import expiredInsuranceColumns from "./columns";
import StatCard from "./stat-card";

const expiredInsurances: Insurance[] = [
  {
    id: "1adi213-asdalskd-sdljashdas",
    loan_number: "L4928",
    customer: "Ramesh Karki",
    insurance_expiry_date: "2026-02-04",
    days_left: 2,
    status: "auto-deduct in 2d",
    policy: "POL-784512",
  },
];

const ExpiredInsurancesPage = () => {
  const [tableParams, setTableParams] =
    useState<TableParams>(DEFAULT_TABLE_PARAMS);

  const queryParams = useMemo(
    () => generateQueryParams(tableParams),
    [tableParams],
  );
  console.log("🚀 ~ ExpiredInsurancesPage ~ queryParams:", queryParams);

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
    {
      id: "branch",
      label: "Branch",
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-heading">Expired Insurances</h1>
          <p className="text-muted-foreground text-sm">
            Kathmandu Branch &bull; Last Updated:{" "}
            {format(new Date(), "PPP hh:mm a")}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <StatCard
          title="Urgent (<= 7 days)"
          value="10"
          className="border-l-4 border-red-500"
        />
        <StatCard
          title="Reminder (8-30 days)"
          value="10"
          className="border-l-4 border-yellow-500"
        />
        <StatCard
          title="Expired (> 30 days)"
          value="10"
          className="border-l-4 border-green-500"
        />
      </div>

      <DataTableProvider
        data={expiredInsurances}
        columns={expiredInsuranceColumns}
        pageCount={5}
        tableParams={tableParams}
        onTableParamsChange={setTableParams}
      >
        <Card className="p-4">
          <DataTableToolbar filters={filters} />
        </Card>

        <DataTable />

        <DataTablePagination />
      </DataTableProvider>
    </>
  );
};

export default ExpiredInsurancesPage;
