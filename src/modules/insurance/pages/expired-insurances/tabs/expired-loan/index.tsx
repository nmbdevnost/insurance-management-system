import type { LoanTabProps } from "@/modules/insurance/lib/types/expired-insurances";
import { DataTableProvider } from "@/shared/providers/data-table-provider";
import ExpiredLoanTable from "./expired-loan-table";
import expiredLoanColumns from "./expired-loan-table/columns";

const ExpiredLoanTab = ({ data, isLoading, error }: LoanTabProps) => (
  <DataTableProvider
    data={data}
    columns={expiredLoanColumns}
    isLoading={isLoading}
    error={error}
  >
    <ExpiredLoanTable />
  </DataTableProvider>
);

export default ExpiredLoanTab;
