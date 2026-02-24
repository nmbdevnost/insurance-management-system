import DataTable from "@/shared/components/data-table";
import DataTablePagination from "@/shared/components/data-table/data-table-pagination";
import type { InsuranceBulkUploadRow } from "@/shared/lib/types/insurance";
import { DataTableProvider } from "@/shared/providers/data-table-provider";
import extractedColumns from "./columns";

const ExtractedTable = ({
  extractedRows,
}: {
  extractedRows: InsuranceBulkUploadRow[];
}) => {
  return (
    <DataTableProvider columns={extractedColumns} data={extractedRows}>
      <DataTable />
      <DataTablePagination />
    </DataTableProvider>
  );
};

export default ExtractedTable;
