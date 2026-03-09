import { useDataTable } from "@/shared/providers/data-table-provider";
import ActionBar from "../../action-bar";
import ActionBarSelection from "../../action-bar/action-bar-selection";
import { Separator } from "../../ui/separator";

type DataTableActionBarProps = {
  children?: React.ReactNode;
};

const DataTableActionBar: React.FC<DataTableActionBarProps> = ({
  children,
}) => {
  const { rowSelection, setRowSelection } = useDataTable();

  const selections = Object.keys(rowSelection || {});

  return (
    <>
      <ActionBar open={selections.length > 0}>
        <ActionBarSelection
          selections={selections.length}
          onDeselect={() => setRowSelection({})}
        />

        {children && <Separator orientation="vertical" />}

        {children}
      </ActionBar>
    </>
  );
};

export default DataTableActionBar;
