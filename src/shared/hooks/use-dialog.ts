import { useState } from "react";

type UseDialogReturn = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type UseDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const useDialog = ({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: UseDialogProps): UseDialogReturn => {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const onOpenChange = (open: boolean) => {
    setInternalOpen(open);
    controlledOnOpenChange?.(open);
  };

  return {
    open,
    onOpenChange,
  };
};

export default useDialog;
