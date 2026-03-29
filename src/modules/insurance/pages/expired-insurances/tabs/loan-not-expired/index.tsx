import type { LoanTabProps } from "@/modules/insurance/lib/types/expired-insurances";
import { DataTableProvider } from "@/shared/providers/data-table-provider";
import LoanNotExpiredTable from "./loan-not-expired-table";
import loanNotExpiredColumns from "./loan-not-expired-table/columns";

const LoanNotExpiredTab = ({ data, isLoading, error }: LoanTabProps) => (
  <DataTableProvider
    data={data}
    columns={loanNotExpiredColumns}
    isLoading={isLoading}
    error={error}
  >
    <LoanNotExpiredTable />
  </DataTableProvider>
);

export default LoanNotExpiredTab;
