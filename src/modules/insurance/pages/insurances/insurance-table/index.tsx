import { DEFAULT_TABLE_PARAMS } from "@/shared/lib/constants/data-table";
import type { Insurance } from "@/shared/lib/types/insurance";
import { generateQueryParams } from "@/shared/lib/utils/query-params";
import {
  DataTableProvider,
  type TableParams,
} from "@/shared/providers/data-table-provider";
import { useMemo, useState } from "react";
import insuranceColumns from "./columns";
import DataTable from "@/shared/components/data-table";
import { Card, CardFooter, CardHeader } from "@/shared/components/ui/card";
import DataTableToolbar from "@/shared/components/data-table/data-table-toolbar";
import DataTablePagination from "@/shared/components/data-table/data-table-pagination";
import type { FilterConfig } from "@/shared/lib/types/table";

const insuranceMockData: Insurance[] = [
  {
    id: "INS-001",
    policy_number: "POL-2023-3001",
    cif_id: "CIF70001",
    type: "Loan Insurance",
    segment: "Retail",
    branch: "Kathmandu Main Branch",
    province: "Bagmati",
    insurance_company: "Nepal Insurance Co.",
    sum_insured: 1500000,
    total_premium: 18000,
    risk_start_date: "2023-01-15",
    maturity_end_date: "2024-01-14",
    status: "active",
  },
  {
    id: "INS-002",
    policy_number: "POL-2023-3002",
    cif_id: "CIF70002",
    type: "Property Insurance",
    segment: "Corporate",
    branch: "Lalitpur Branch",
    province: "Bagmati",
    insurance_company: "Shikhar Insurance",
    sum_insured: 3000000,
    total_premium: 25000,
    risk_start_date: "2023-02-10",
    maturity_end_date: "2024-02-09",
    status: "active",
  },
  {
    id: "INS-003",
    policy_number: "POL-2023-3003",
    cif_id: "CIF70003",
    type: "Vehicle Insurance",
    segment: "SME",
    branch: "Pokhara Branch",
    province: "Gandaki",
    insurance_company: "IME General Insurance",
    sum_insured: 800000,
    total_premium: 12000,
    risk_start_date: "2023-03-15",
    maturity_end_date: "2024-03-14",
    status: "active",
  },
  {
    id: "INS-004",
    policy_number: "POL-2023-3004",
    cif_id: "CIF70004",
    type: "Machinery Insurance",
    segment: "Corporate",
    branch: "Biratnagar Branch",
    province: "Koshi",
    insurance_company: "Sagarmatha Insurance",
    sum_insured: 2000000,
    total_premium: 22000,
    risk_start_date: "2023-04-05",
    maturity_end_date: "2024-04-04",
    status: "active",
  },
  {
    id: "INS-005",
    policy_number: "POL-2023-3005",
    cif_id: "CIF70005",
    type: "Business Stock Insurance",
    segment: "SME",
    branch: "Chitwan Branch",
    province: "Madhesh Pradesh",
    insurance_company: "United Insurance",
    sum_insured: 1200000,
    total_premium: 16000,
    risk_start_date: "2023-05-20",
    maturity_end_date: "2024-05-19",
    status: "active",
  },
];

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
        data={insuranceMockData}
        columns={insuranceColumns}
        pageCount={5}
        tableParams={tableParams}
        onTableParamsChange={setTableParams}
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
      </DataTableProvider>
    </>
  );
};

export default InsuranceTable;
