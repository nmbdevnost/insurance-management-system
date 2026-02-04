import DataTable from "@/shared/components/data-table";
import DataTablePagination from "@/shared/components/data-table/data-table-pagination";
import DataTableToolbar from "@/shared/components/data-table/data-table-toolbar";
import { Card } from "@/shared/components/ui/card";
import { DEFAULT_TABLE_PARAMS } from "@/shared/lib/constants/data-table";
import type { Insurance } from "@/shared/lib/types/insurance";
import type { FilterConfig } from "@/shared/lib/types/table";
import { generateQueryParams } from "@/shared/lib/utils/query-params";
import {
  DataTableProvider,
  type TableParams,
} from "@/shared/providers/data-table-provider";
import { useMemo, useState } from "react";
import expiredInsuranceColumns from "../../columns";

const expiredInsurance: Insurance[] = [
  {
    id: "1adi213-asdalskd-sdljashdas",
    loan_number: "L4928",
    customer: "Ramesh Karki",
    insurance_expiry_date: "2026-02-04",
    days_left: 2,
    status: "auto-deduct in 2d",
    policy: "POL-784512",
  },
  {
    id: "1adi213-asdalskd-qwewoueyqrf",
    loan_number: "L28492",
    customer: "Sita Thapa",
    insurance_expiry_date: "2026-02-14",
    days_left: 10,
    status: "ok",
    policy: "POL-784512",
  },
  {
    id: "asdasd-asdalskd-qwewoueyqrf",
    loan_number: "L28492",
    customer: "Sita Thapa",
    insurance_expiry_date: "2026-02-14",
    days_left: 10,
    status: "ok",
    policy: "POL-784512",
  },
  {
    id: "rtterytr-asdalskd-qwewoueyqrf",
    loan_number: "L28492",
    customer: "Sita Thapa",
    insurance_expiry_date: "2026-02-14",
    days_left: 10,
    status: "ok",
    policy: "POL-784512",
  },
  {
    id: "995490-asdalskd-qwewoueyqrf",
    loan_number: "L28492",
    customer: "Sita Thapa",
    insurance_expiry_date: "2026-02-14",
    days_left: 10,
    status: "ok",
    policy: "POL-784512",
  },
  {
    id: "pgohjhkl-asdalskd-qwewoueyqrf",
    loan_number: "L28492",
    customer: "Sita Thapa",
    insurance_expiry_date: "2026-02-14",
    days_left: 10,
    status: "ok",
    policy: "POL-784512",
  },
  {
    id: "czxcvjas-asdalskd-qwewoueyqrf",
    loan_number: "L28492",
    customer: "Sita Thapa",
    insurance_expiry_date: "2026-02-14",
    days_left: 10,
    status: "ok",
    policy: "POL-784512",
  },
  {
    id: "asdlkcvx-asdalskd-qwewoueyqrf",
    loan_number: "L28492",
    customer: "Sita Thapa",
    insurance_expiry_date: "2026-02-14",
    days_left: 10,
    status: "ok",
    policy: "POL-784512",
  },
  {
    id: "aaxcxc-asdalskd-qwewoueyqrf",
    loan_number: "L28492",
    customer: "Sita Thapa",
    insurance_expiry_date: "2026-02-14",
    days_left: 10,
    status: "ok",
    policy: "POL-784512",
  },
];

const LoanNotExpiredTab = () => {
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
      <DataTableProvider
        data={expiredInsurance}
        columns={expiredInsuranceColumns}
        pageCount={5}
        tableParams={tableParams}
        onTableParamsChange={setTableParams}
        className="gap-0"
      >
        <Card className="rounded-b-none p-2">
          <DataTableToolbar filters={filters} />
        </Card>

        <Card className="rounded-none p-0">
          <DataTable className="rounded-none border-none" />
        </Card>

        <Card className="rounded-t-none p-2">
          <DataTablePagination />
        </Card>
      </DataTableProvider>
    </>
  );
};

export default LoanNotExpiredTab;
