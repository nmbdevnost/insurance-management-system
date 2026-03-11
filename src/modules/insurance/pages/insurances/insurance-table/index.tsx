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

  const data = [
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
    {
      id: "INS-006",
      policy_number: "POL-2023-3006",
      cif_id: "CIF70006",
      type: "Health Insurance",
      segment: "Retail",
      branch: "Butwal Branch",
      province: "Lumbini",
      insurance_company: "National Life Insurance",
      sum_insured: 500000,
      total_premium: 8000,
      risk_start_date: "2023-06-01",
      maturity_end_date: "2024-05-31",
      status: "active",
    },
    {
      id: "INS-007",
      policy_number: "POL-2023-3007",
      cif_id: "CIF70007",
      type: "Travel Insurance",
      segment: "Retail",
      branch: "Bhairahawa Branch",
      province: "Lumbini",
      insurance_company: "Himalayan General Insurance",
      sum_insured: 300000,
      total_premium: 5000,
      risk_start_date: "2023-07-10",
      maturity_end_date: "2024-07-09",
      status: "active",
    },
    {
      id: "INS-008",
      policy_number: "POL-2023-3008",
      cif_id: "CIF70008",
      type: "Engineering Insurance",
      segment: "Corporate",
      branch: "Hetauda Branch",
      province: "Bagmati",
      insurance_company: "NLG Insurance",
      sum_insured: 5000000,
      total_premium: 45000,
      risk_start_date: "2023-08-15",
      maturity_end_date: "2024-08-14",
      status: "active",
    },
    {
      id: "INS-009",
      policy_number: "POL-2023-3009",
      cif_id: "CIF70009",
      type: "Crop Insurance",
      segment: "Agriculture",
      branch: "Janakpur Branch",
      province: "Madhesh Pradesh",
      insurance_company: "Shikhar Insurance",
      sum_insured: 200000,
      total_premium: 3000,
      risk_start_date: "2023-09-01",
      maturity_end_date: "2024-08-31",
      status: "active",
    },
    {
      id: "INS-010",
      policy_number: "POL-2023-3010",
      cif_id: "CIF70010",
      type: "Liability Insurance",
      segment: "Corporate",
      branch: "Dharan Branch",
      province: "Koshi",
      insurance_company: "Premier Insurance",
      sum_insured: 2000000,
      total_premium: 20000,
      risk_start_date: "2023-10-05",
      maturity_end_date: "2024-10-04",
      status: "active",
    },
    {
      id: "INS-011",
      policy_number: "POL-2023-3011",
      cif_id: "CIF70011",
      type: "Marine Insurance",
      segment: "Corporate",
      branch: "Birgunj Branch",
      province: "Madhesh Pradesh",
      insurance_company: "Sagarmatha Insurance",
      sum_insured: 1500000,
      total_premium: 18000,
      risk_start_date: "2023-11-12",
      maturity_end_date: "2024-11-11",
      status: "active",
    },
    {
      id: "INS-012",
      policy_number: "POL-2024-1001",
      cif_id: "CIF70012",
      type: "Vehicle Insurance",
      segment: "Retail",
      branch: "Nepalgunj Branch",
      province: "Lumbini",
      insurance_company: "IME General Insurance",
      sum_insured: 950000,
      total_premium: 14000,
      risk_start_date: "2024-01-20",
      maturity_end_date: "2025-01-19",
      status: "active",
    },
    {
      id: "INS-013",
      policy_number: "POL-2024-1002",
      cif_id: "CIF70013",
      type: "Property Insurance",
      segment: "SME",
      branch: "Bharatpur Branch",
      province: "Bagmati",
      insurance_company: "Nepal Insurance Co.",
      sum_insured: 2500000,
      total_premium: 28000,
      risk_start_date: "2024-02-14",
      maturity_end_date: "2025-02-13",
      status: "active",
    },
    {
      id: "INS-014",
      policy_number: "POL-2024-1003",
      cif_id: "CIF70014",
      type: "Loan Insurance",
      segment: "Retail",
      branch: "Dhangadhi Branch",
      province: "Sudurpashchim",
      insurance_company: "United Insurance",
      sum_insured: 1200000,
      total_premium: 15000,
      risk_start_date: "2024-03-01",
      maturity_end_date: "2025-02-28",
      status: "active",
    },
    {
      id: "INS-015",
      policy_number: "POL-2024-1004",
      cif_id: "CIF70015",
      type: "Machinery Insurance",
      segment: "Corporate",
      branch: "Birendranagar Branch",
      province: "Karnali",
      insurance_company: "Himalayan General Insurance",
      sum_insured: 4000000,
      total_premium: 40000,
      risk_start_date: "2024-04-10",
      maturity_end_date: "2025-04-09",
      status: "active",
    },
  ];

  return (
    <>
      <DataTableProvider
        data={data}
        columns={insuranceColumns}
        tableParams={tableParams}
        onTableParamsChange={setTableParams}
        totalRows={data.length}
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
