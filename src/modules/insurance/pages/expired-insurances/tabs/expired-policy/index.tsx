import type { ExpiredPolicyTabProps } from "@/modules/insurance/lib/types/expired-insurances";
import { DataTableProvider } from "@/shared/providers/data-table-provider";
import ExpiredPolicyTable from "./expired-policy-table";
import expiredPolicyColumns from "./expired-policy-table/columns";

const ExpiredPolicyTab = ({
  data,
  totalRows,
  isLoading,
  error,
  tableParams,
  onTableParamsChange,
}: ExpiredPolicyTabProps) => {
  return (
    <DataTableProvider
      data={data}
      columns={expiredPolicyColumns}
      tableParams={tableParams}
      onTableParamsChange={onTableParamsChange}
      isLoading={isLoading}
      totalRows={totalRows}
      error={error}
    >
      <ExpiredPolicyTable />
    </DataTableProvider>
  );
};

export default ExpiredPolicyTab;
