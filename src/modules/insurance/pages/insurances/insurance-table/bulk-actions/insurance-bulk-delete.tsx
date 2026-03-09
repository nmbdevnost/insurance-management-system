import ActionBarItem from "@/shared/components/action-bar/action-bar-item";
import { useDataTable } from "@/shared/providers/data-table-provider";
import { RiDeleteBinLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

const InsuranceBulkDelete = () => {
  const { setRowSelection } = useDataTable();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const success = Math.random() < 0;

    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setIsDeleting(false);

    if (success) {
      setRowSelection({});

      toast.success("Selections deleted successfully.");
    } else {
      toast.error("Something went wrong deleting the selected rows.");
    }
  };

  return (
    <ActionBarItem
      variant="destructive"
      onClick={handleDelete}
      isLoading={isDeleting}
    >
      <RiDeleteBinLine /> Delete
    </ActionBarItem>
  );
};

export default InsuranceBulkDelete;
