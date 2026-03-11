import type { Row, RowData, Table } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

type DataTableSelectProps<TData> =
  | { variant: "multiple"; table: Table<TData>; row?: never }
  | { variant: "single"; row: Row<TData>; table?: never };

const DataTableSelect = <TData extends RowData>({
  variant,
  table,
  row,
}: DataTableSelectProps<TData>) => {
  const isMultiple = variant === "multiple";

  const handleCheckedChange = (value: boolean) => {
    if (isMultiple) {
      table.toggleAllPageRowsSelected(value === true);
    } else {
      row.toggleSelected(value === true);
    }
  };

  return (
    <Checkbox
      checked={
        isMultiple ? table.getIsAllPageRowsSelected() : row.getIsSelected()
      }
      indeterminate={isMultiple ? table.getIsSomePageRowsSelected() : undefined}
      onCheckedChange={handleCheckedChange}
      aria-label={isMultiple ? "Select all" : "Select row"}
    />
  );
};

export default DataTableSelect;
