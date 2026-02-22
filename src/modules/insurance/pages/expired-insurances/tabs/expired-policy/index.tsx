import { DEFAULT_TABLE_PARAMS } from "@/shared/lib/constants/data-table";
import type { ExpiredPolicy } from "@/shared/lib/types/policies";
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
    referenceNo: "REF-001",
    policyNumber: "POL-2023-1001",
    cifId: "CIF10001",
    customerName: "Ramesh Shrestha",
    accountNo: "00123456789",
    email: "ramesh.shrestha@gmail.com",
    branchName: "Kathmandu Main Branch",
    province: "Bagmati",
    insuranceCompany: "Nepal Insurance Co.",
    initiationType: "Manual",
    policyIssuedDate: "2023-01-10",
    riskStartDate: "2023-01-15",
    riskMaturityDate: "2024-01-14",
    termDays: 365,
    assetType: "Vehicle",
    sumInsured: 1500000,
    totalPremium: 18000,
    status: "Pending",
    createdBy: "Admin",
    createdDate: "2023-01-10",
    apiResponse: "Success",
  },
  {
    referenceNo: "REF-002",
    policyNumber: "POL-2023-1002",
    cifId: "CIF10002",
    customerName: "Sita Karki",
    accountNo: "00123456790",
    email: "sita.karki@gmail.com",
    branchName: "Lalitpur Branch",
    province: "Bagmati",
    insuranceCompany: "Shikhar Insurance",
    initiationType: "Online",
    policyIssuedDate: "2023-02-05",
    riskStartDate: "2023-02-10",
    riskMaturityDate: "2024-02-09",
    termDays: 365,
    assetType: "Property",
    sumInsured: 3000000,
    totalPremium: 25000,
    status: "Expired",
    createdBy: "System",
    createdDate: "2023-02-05",
    apiResponse: "Success",
  },
  {
    referenceNo: "REF-003",
    policyNumber: "POL-2023-1003",
    cifId: "CIF10003",
    customerName: "Bikash Adhikari",
    accountNo: "00123456791",
    email: "bikash.adhikari@gmail.com",
    branchName: "Pokhara Branch",
    province: "Gandaki",
    insuranceCompany: "IME General Insurance",
    initiationType: "Manual",
    policyIssuedDate: "2023-03-12",
    riskStartDate: "2023-03-15",
    riskMaturityDate: "2024-03-14",
    termDays: 365,
    assetType: "Equipment",
    sumInsured: 800000,
    totalPremium: 12000,
    status: "Pending",
    createdBy: "BranchUser",
    createdDate: "2023-03-12",
    apiResponse: "Success",
  },
  {
    referenceNo: "REF-004",
    policyNumber: "POL-2023-1004",
    cifId: "CIF10004",
    customerName: "Anita Thapa",
    accountNo: "00123456792",
    email: "anita.thapa@gmail.com",
    branchName: "Biratnagar Branch",
    province: "Koshi",
    insuranceCompany: "Sagarmatha Insurance",
    initiationType: "Online",
    policyIssuedDate: "2023-04-01",
    riskStartDate: "2023-04-05",
    riskMaturityDate: "2024-04-04",
    termDays: 365,
    assetType: "Business Stock",
    sumInsured: 1200000,
    totalPremium: 16000,
    status: "Active",
    createdBy: "System",
    createdDate: "2023-04-01",
    apiResponse: "Success",
  },
  {
    referenceNo: "REF-005",
    policyNumber: "POL-2023-1005",
    cifId: "CIF10005",
    customerName: "Nabin Gurung",
    accountNo: "00123456793",
    email: "nabin.gurung@gmail.com",
    branchName: "Chitwan Branch",
    province: "Bagmati",
    insuranceCompany: "United Insurance",
    initiationType: "Manual",
    policyIssuedDate: "2023-05-18",
    riskStartDate: "2023-05-20",
    riskMaturityDate: "2024-05-19",
    termDays: 365,
    assetType: "Machinery",
    sumInsured: 2000000,
    totalPremium: 22000,
    status: "Pending",
    createdBy: "Admin",
    createdDate: "2023-05-18",
    apiResponse: "Success",
  },
];

const ExpiredPolicyTab = () => {
  const [tableParams, setTableParams] =
    useState<TableParams>(DEFAULT_TABLE_PARAMS);

  const queryParams = useMemo(
    () => generateQueryParams(tableParams),
    [tableParams]
  );
  console.log("🚀 ~ ExpiredPolicyTab ~ queryParams:", queryParams);

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
