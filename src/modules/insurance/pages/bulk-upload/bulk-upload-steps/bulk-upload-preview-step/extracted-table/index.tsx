import type { ExtractedRow } from "@/modules/insurance/lib/types/bulk-transaction";
import DataTable from "@/shared/components/data-table";
import DataTablePagination from "@/shared/components/data-table/data-table-pagination";
import { DataTableProvider } from "@/shared/providers/data-table-provider";
import extractedColumns from "./columns";

const ExtractedTable = ({
  extractedRows,
}: {
  extractedRows: ExtractedRow[];
}) => {
  return (
    <DataTableProvider
      columns={extractedColumns}
      data={extractedRows}
      manualPagination={false}
    >
      <DataTable autoFillHeightOffset={170} />
      <DataTablePagination />
    </DataTableProvider>
  );
};

export default ExtractedTable;
