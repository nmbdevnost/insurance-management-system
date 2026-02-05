import type { ExpiredPolicy } from "@/shared/lib/types/policies";
import { DEFAULT_TABLE_PARAMS } from "@/shared/lib/constants/data-table";
import { generateQueryParams } from "@/shared/lib/utils/query-params";
import {
  DataTableProvider,
  type TableParams,
} from "@/shared/providers/data-table-provider";
import { useMemo, useState } from "react";
import ExpiredPolicyTable from "./expired-policy-table";
import expiredPolicyColumns from "./expired-policy-table/columns";

const expiredPolicies: ExpiredPolicy[] = [
  {
    referenceNo: "REF-2025-001",
    policyNumber: "POL-KTM-2025-1001",
    type: "Motor Insurance",
    segment: "Individual",
    branch: "Kathmandu Branch",
    province: "Bagmati Province",
    insuranceCompany: "Nepal Life Insurance",
    sumInsured: 2500000,
    premium: 18500,
    daysLeft: 245,
    riskStartDate: "2025-01-15",
    riskMaturityDate: "2026-01-15",
    status: "Auto-Deduct",
  },
  {
    referenceNo: "REF-2025-002",
    policyNumber: "POL-PKR-2025-1002",
    type: "Health Insurance",
    segment: "Family",
    branch: "Pokhara Branch",
    province: "Gandaki Province",
    insuranceCompany: "Rastriya Beema Sansthan",
    sumInsured: 1500000,
    premium: 25000,
    daysLeft: 180,
    riskStartDate: "2024-12-01",
    riskMaturityDate: "2025-12-01",
    status: "Auto-Deduct",
  },
  {
    referenceNo: "REF-2025-003",
    policyNumber: "POL-BRT-2025-1003",
    type: "Property Insurance",
    segment: "Corporate",
    branch: "Biratnagar Branch",
    province: "Koshi Province",
    insuranceCompany: "Sagarmatha Insurance",
    sumInsured: 15000000,
    premium: 95000,
    daysLeft: 320,
    riskStartDate: "2025-02-01",
    riskMaturityDate: "2026-02-01",
    status: "Auto-Deduct",
  },
  {
    referenceNo: "REF-2025-004",
    policyNumber: "POL-BHW-2025-1004",
    type: "Life Insurance",
    segment: "Individual",
    branch: "Bhairahawa Branch",
    province: "Lumbini Province",
    insuranceCompany: "Jyoti Life Insurance",
    sumInsured: 5000000,
    premium: 42000,
    daysLeft: 90,
    riskStartDate: "2024-11-10",
    riskMaturityDate: "2025-11-10",
    status: "Auto-Deduct",
  },
  {
    referenceNo: "REF-2025-005",
    policyNumber: "POL-DHN-2025-1005",
    type: "Travel Insurance",
    segment: "Individual",
    branch: "Dhangadhi Branch",
    province: "Sudurpashchim Province",
    insuranceCompany: "IME General Insurance",
    sumInsured: 500000,
    premium: 3500,
    daysLeft: 15,
    riskStartDate: "2025-01-20",
    riskMaturityDate: "2025-03-20",
    status: "Auto-Deduct",
  },
];

const ExpiredPolicyTab = () => {
  const [tableParams, setTableParams] =
    useState<TableParams>(DEFAULT_TABLE_PARAMS);

  const queryParams = useMemo(
    () => generateQueryParams(tableParams),
    [tableParams]
  );
  console.log("🚀 ~ ExpiredIsurancePage ~ queryParams:", queryParams);

  return (
    <>
      <DataTableProvider
        data={expiredPolicies}
        columns={expiredPolicyColumns}
        pageCount={5}
        tableParams={tableParams}
        onTableParamsChange={setTableParams}
      >
        <ExpiredPolicyTable />
      </DataTableProvider>
    </>
  );
};

export default ExpiredPolicyTab;
