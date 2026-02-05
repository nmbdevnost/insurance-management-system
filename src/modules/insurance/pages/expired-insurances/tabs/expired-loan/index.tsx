import { DEFAULT_TABLE_PARAMS } from "@/shared/lib/constants/data-table";
import type { ExpiredLoan } from "@/shared/lib/types/loans";
import { generateQueryParams } from "@/shared/lib/utils/query-params";
import {
  DataTableProvider,
  type TableParams,
} from "@/shared/providers/data-table-provider";
import { useMemo, useState } from "react";
import ExpiredLoanTable from "./expired-loan-table";
import expiredLoanColumns from "./expired-loan-table/columns";

const expiredLoans: ExpiredLoan[] = [
  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    referenceNo: "REF-2025-001",
    policyNumber: "POL-KTM-2025-1234",
    type: "Life Insurance",
    segment: "Individual",
    branch: "Kathmandu Branch",
    province: "Bagmati Province",
    accountNo: "ACC-789456123",
    cifId: "CIF-2025-45678",
    accountStatus: "Active",
    closedDate: null,
    riskStartDate: "2025-01-15",
    riskMaturityDate: "2045-01-15",
    status: "Current",
  },
  {
    id: "f6e5d4c3-b2a1-4f9e-8d7c-6b5a4e3d2c1b",
    referenceNo: "REF-2024-892",
    policyNumber: "POL-PKR-2024-5678",
    type: "Health Insurance",
    segment: "Family",
    branch: "Pokhara Branch",
    province: "Gandaki Province",
    accountNo: "ACC-456789012",
    cifId: "CIF-2024-12345",
    accountStatus: "Active",
    closedDate: null,
    riskStartDate: "2024-06-01",
    riskMaturityDate: "2025-06-01",
    status: "Current",
  },
  {
    id: "9c8b7a6e-5d4c-4b3a-2e1f-0d9c8b7a6e5d",
    referenceNo: "REF-2023-567",
    policyNumber: "POL-BRT-2023-9012",
    type: "Motor Insurance",
    segment: "Corporate",
    branch: "Biratnagar Branch",
    province: "Koshi Province",
    accountNo: "ACC-234567890",
    cifId: "CIF-2023-67890",
    accountStatus: "Closed",
    closedDate: "2024-12-31",
    riskStartDate: "2023-01-01",
    riskMaturityDate: "2024-12-31",
    status: "Expired",
  },
  {
    id: "3e4d5c6b-7a8f-49e0-1d2c-3b4a5e6d7c8f",
    referenceNo: "REF-2025-223",
    policyNumber: "POL-BTW-2025-3456",
    type: "Property Insurance",
    segment: "Individual",
    branch: "Butwal Branch",
    province: "Lumbini Province",
    accountNo: "ACC-567890123",
    cifId: "CIF-2025-23456",
    accountStatus: "Active",
    closedDate: null,
    riskStartDate: "2025-02-01",
    riskMaturityDate: "2026-02-01",
    status: "Current",
  },
  {
    id: "7f8e9d0c-1b2a-4e3f-5d6c-7b8a9e0d1c2f",
    referenceNo: "REF-2024-445",
    policyNumber: "POL-DHN-2024-7890",
    type: "Accident Insurance",
    segment: "Group",
    branch: "Dhangadhi Branch",
    province: "Sudurpashchim Province",
    accountNo: "ACC-890123456",
    cifId: "CIF-2024-34567",
    accountStatus: "Suspended",
    closedDate: null,
    riskStartDate: "2024-03-15",
    riskMaturityDate: "2025-03-15",
    status: "On Hold",
  },
];

const ExpiredLoanTab = () => {
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
        data={expiredLoans}
        columns={expiredLoanColumns}
        pageCount={5}
        tableParams={tableParams}
        onTableParamsChange={setTableParams}
        className="gap-0"
      >
        <ExpiredLoanTable />
      </DataTableProvider>
    </>
  );
};

export default ExpiredLoanTab;
