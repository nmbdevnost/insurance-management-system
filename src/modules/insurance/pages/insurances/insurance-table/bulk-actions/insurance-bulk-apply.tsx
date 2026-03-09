import ActionBarItem from "@/shared/components/action-bar/action-bar-item";
import { useDataTable } from "@/shared/providers/data-table-provider";
import { RiCheckLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

const InsuranceBulkApply = () => {
  const { setRowSelection } = useDataTable();
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async () => {
    const success = Math.random() < 0.3;

    setIsApplying(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsApplying(false);

    if (success) {
      setRowSelection({});

      toast.success("Selections applied successfully.");
    } else {
      toast.error("Something went wrong applying the selected rows.");
    }
  };

  return (
    <ActionBarItem
      variant="secondary"
      onClick={handleApply}
      isLoading={isApplying}
    >
      <RiCheckLine /> Apply
    </ActionBarItem>
  );
};

export default InsuranceBulkApply;
