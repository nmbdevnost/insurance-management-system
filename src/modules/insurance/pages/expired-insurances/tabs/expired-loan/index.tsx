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
    referenceNo: "REF-ACC-001",
    policyNumber: "POL-2023-2001",
    cifId: "CIF90001",
    customerName: "Ramesh Shrestha",
    accountNo: "0011002003001",
    accountStatus: "Closed",
    accountClosedDate: "2024-01-15",
    status: "pending",
  },
  {
    referenceNo: "REF-ACC-002",
    policyNumber: "POL-2023-2002",
    cifId: "CIF90002",
    customerName: "Sita Karki",
    accountNo: "0011002003002",
    accountStatus: "Dormant",
    accountClosedDate: "2024-02-10",
    status: "active",
  },
  {
    referenceNo: "REF-ACC-003",
    policyNumber: "POL-2023-2003",
    cifId: "CIF90003",
    customerName: "Bikash Adhikari",
    accountNo: "0011002003003",
    accountStatus: "Closed",
    accountClosedDate: "2024-03-05",
    status: "active",
  },
  {
    referenceNo: "REF-ACC-004",
    policyNumber: "POL-2023-2004",
    cifId: "CIF90004",
    customerName: "Anita Thapa",
    accountNo: "0011002003004",
    accountStatus: "Inactive",
    accountClosedDate: "2024-04-01",
    status: "pending",
  },
  {
    referenceNo: "REF-ACC-005",
    policyNumber: "POL-2023-2005",
    cifId: "CIF90005",
    customerName: "Nabin Gurung",
    accountNo: "0011002003005",
    accountStatus: "Closed",
    accountClosedDate: "2024-05-20",
    status: "active",
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
