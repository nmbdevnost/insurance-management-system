import { DEFAULT_TABLE_PARAMS } from "@/shared/lib/constants/data-table";
import type { Loan } from "@/shared/lib/types/loans";
import { generateQueryParams } from "@/shared/lib/utils/query-params";
import {
  DataTableProvider,
  type TableParams,
} from "@/shared/providers/data-table-provider";
import { useMemo, useState } from "react";
import LoanNotExpiredTable from "./loan-not-expired-table";
import loanNotExpiredColumns from "./loan-not-expired-table/columns";

const loanNotExpired: Loan[] = [
  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    referenceNo: "REF-2025-001",
    policyNumber: "POL-KTM-2025-1234",
    type: "Life Insurance",
    segment: "Individual",
    branch: "Kathmandu Branch",
    province: "Bagmati Province",
    insuranceCompany: "Nepal Life Insurance Co. Ltd.",
    sumInsured: 5000000,
    premium: 45000,
    daysLeft: 7095,
    riskStartDate: "2025-01-15",
    riskMaturityDate: "2045-01-15",
    status: "current",
  },
  {
    id: "f6e5d4c3-b2a1-4f9e-8d7c-6b5a4e3d2c1b",
    referenceNo: "REF-2024-892",
    policyNumber: "POL-PKR-2024-5678",
    type: "Health Insurance",
    segment: "Family",
    branch: "Pokhara Branch",
    province: "Gandaki Province",
    insuranceCompany: "Prabhu Insurance Ltd.",
    sumInsured: 1000000,
    premium: 35000,
    daysLeft: 116,
    riskStartDate: "2024-06-01",
    riskMaturityDate: "2025-06-01",
    status: "current",
  },
  {
    id: "9c8b7a6e-5d4c-4b3a-2e1f-0d9c8b7a6e5d",
    referenceNo: "REF-2023-567",
    policyNumber: "POL-BRT-2023-9012",
    type: "Motor Insurance",
    segment: "Corporate",
    branch: "Biratnagar Branch",
    province: "Koshi Province",
    insuranceCompany: "Shikhar Insurance Co. Ltd.",
    sumInsured: 2500000,
    premium: 28000,
    daysLeft: 0,
    riskStartDate: "2023-01-01",
    riskMaturityDate: "2024-12-31",
    status: "auto-deduct",
  },
  {
    id: "3e4d5c6b-7a8f-49e0-1d2c-3b4a5e6d7c8f",
    referenceNo: "REF-2025-223",
    policyNumber: "POL-BTW-2025-3456",
    type: "Property Insurance",
    segment: "Individual",
    branch: "Butwal Branch",
    province: "Lumbini Province",
    insuranceCompany: "Himalayan General Insurance Co. Ltd.",
    sumInsured: 8000000,
    premium: 52000,
    daysLeft: 360,
    riskStartDate: "2025-02-01",
    riskMaturityDate: "2026-02-01",
    status: "expired",
  },
  {
    id: "7f8e9d0c-1b2a-4e3f-5d6c-7b8a9e0d1c2f",
    referenceNo: "REF-2024-445",
    policyNumber: "POL-DHN-2024-7890",
    type: "Accident Insurance",
    segment: "Group",
    branch: "Dhangadhi Branch",
    province: "Sudurpashchim Province",
    insuranceCompany: "Siddhartha Insurance Ltd.",
    sumInsured: 1500000,
    premium: 18000,
    daysLeft: 38,
    riskStartDate: "2024-03-15",
    riskMaturityDate: "2025-03-15",
    status: "current",
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

  return (
    <>
      <DataTableProvider
        data={loanNotExpired}
        columns={loanNotExpiredColumns}
        pageCount={5}
        tableParams={tableParams}
        onTableParamsChange={setTableParams}
      >
        <LoanNotExpiredTable />
      </DataTableProvider>
    </>
  );
};

export default LoanNotExpiredTab;
