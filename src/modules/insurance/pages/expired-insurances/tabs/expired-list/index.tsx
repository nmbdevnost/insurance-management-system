import type { ExpiredPolicyTabProps } from "@/modules/insurance/lib/types/expired-insurances";
import { DataTableProvider } from "@/shared/providers/data-table-provider";
import expiredPolicyColumns from "../expired-policy/expired-policy-table/columns";
import ExpiredListTable from "./expired-list-table";

const ExpiredListTab = (props: ExpiredPolicyTabProps) => {
  return (
    <DataTableProvider
      columns={expiredPolicyColumns}
      rowId="referenceNumber"
      {...props}
    >
      <ExpiredListTable />
    </DataTableProvider>
  );
};

export default ExpiredListTab;
