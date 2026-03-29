import type { BalanceCheckResult } from "@/modules/insurance/lib/types/insurances";
import DataTable from "@/shared/components/data-table";
import DataTablePagination from "@/shared/components/data-table/data-table-pagination";
import { DataTableProvider } from "@/shared/providers/data-table-provider";
import balanceColumns from "./columns";

interface BalanceTableProps {
  rows: BalanceCheckResult[];
  isLoading: boolean;
}

const BalanceTable = ({ rows, isLoading }: BalanceTableProps) => {
  return (
    <DataTableProvider
      columns={balanceColumns}
      data={rows}
      manualPagination={true}
      isLoading={isLoading}
    >
      <DataTable />
      <DataTablePagination />
    </DataTableProvider>
  );
};

export default BalanceTable;
