import { cn } from "@/shared/lib/utils";
import type { ComponentProps } from "react";
import { Button } from "../ui/button";
import Spinner from "../ui/spinner";

type ActionBarItemProps = {
  isLoading?: boolean;
  onClick?: () => Promise<void>;
  onComplete?: () => void;
  showLoader?: boolean;
} & ComponentProps<typeof Button>;

const ActionBarItem = ({
  isLoading,
  children,
  className,
  disabled,
  onClick,
  onComplete,
  showLoader = true,
  ...props
}: ActionBarItemProps) => {
  const handleClick = async () => {
    if (onClick) {
      await onClick();
      onComplete?.();
    }
  };

  return (
    <Button
      data-loading={isLoading}
      disabled={disabled || isLoading}
      className={cn(className, isLoading && showLoader ? "[&>svg]:hidden" : "")}
      onClick={handleClick}
      {...props}
    >
      {isLoading && showLoader && <Spinner className="block!" />}
      {children}
    </Button>
  );
};

export default ActionBarItem;
