import { useDataTable } from "@/shared/providers/data-table-provider";
import ActionBar from "../../action-bar";
import ActionBarSelection from "../../action-bar/action-bar-selection";
import { Separator } from "../../ui/separator";

type DataTableActionBarProps = {
  actionPending?: boolean;
  children?: React.ReactNode;
};

const DataTableActionBar: React.FC<DataTableActionBarProps> = ({
  actionPending,
  children,
}) => {
  const { rowSelection, setRowSelection } = useDataTable();

  const selections = Object.keys(rowSelection);

  return (
    <>
      <ActionBar open={selections.length > 0}>
        <ActionBarSelection
          selections={selections.length}
          onDeselect={() => setRowSelection({})}
          disabled={actionPending}
        />

        {children && <Separator orientation="vertical" />}

        {children}
      </ActionBar>
    </>
  );
};

export default DataTableActionBar;
