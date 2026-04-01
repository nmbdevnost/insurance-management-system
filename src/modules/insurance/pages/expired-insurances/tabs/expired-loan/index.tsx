import type { ExpiredPolicyTabProps } from "@/modules/insurance/lib/types/expired-insurances";
import { DataTableProvider } from "@/shared/providers/data-table-provider";
import ExpiredLoanTable from "./expired-loan-table";
import expiredLoanColumns from "./expired-loan-table/columns";

const ExpiredLoanTab = (props: ExpiredPolicyTabProps) => (
  <DataTableProvider
    columns={expiredLoanColumns}
    rowId="referenceNumber"
    key="expired-loan-table"
    {...props}
  >
    <ExpiredLoanTable />
  </DataTableProvider>
);

export default ExpiredLoanTab;
