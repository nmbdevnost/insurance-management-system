import DataTable from "@/shared/components/data-table";
import DataTablePagination from "@/shared/components/data-table/data-table-pagination";
import DataTableToolbar from "@/shared/components/data-table/data-table-toolbar";

const ScheduledNotificationsTable = () => {
  return (
    <>
      <DataTableToolbar />
      <DataTable />
      <DataTablePagination />
    </>
  );
};

export default ScheduledNotificationsTable;
