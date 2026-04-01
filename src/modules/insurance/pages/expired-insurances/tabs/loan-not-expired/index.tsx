import type { ExpiredPolicyTabProps } from "@/modules/insurance/lib/types/expired-insurances";
import { DataTableProvider } from "@/shared/providers/data-table-provider";
import LoanNotExpiredTable from "./loan-not-expired-table";
import loanNotExpiredColumns from "./loan-not-expired-table/columns";

const LoanNotExpiredTab = (props: ExpiredPolicyTabProps) => (
  <DataTableProvider
    columns={loanNotExpiredColumns}
    rowId="referenceNumber"
    {...props}
  >
    <LoanNotExpiredTable />
  </DataTableProvider>
);

export default LoanNotExpiredTab;
