import { useDataTable } from "@/shared/providers/data-table-provider";
import type { ComponentProps } from "react";
import ActionBarItem from "../../action-bar/action-bar-item";

const DataTableActionBarItem = ({
  children,
  onClick,
  ...props
}: ComponentProps<typeof ActionBarItem>) => {
  const { setRowSelection } = useDataTable();

  const handleClick = async () => {
    if (onClick) {
      await onClick();
      setRowSelection({});
    }
  };

  return (
    <ActionBarItem onClick={handleClick} {...props}>
      {children}
    </ActionBarItem>
  );
};

export default DataTableActionBarItem;
