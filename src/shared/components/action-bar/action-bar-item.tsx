import { cn } from "@/shared/lib/utils";
import type { ComponentProps } from "react";
import { Button } from "../ui/button";
import Spinner from "../ui/spinner";

type ActionBarItemProps = {
  isLoading?: boolean;
  onClick?: () => Promise<void>;
  onComplete?: () => void;
} & ComponentProps<typeof Button>;

const ActionBarItem = ({
  isLoading,
  children,
  className,
  disabled,
  onClick,
  onComplete,
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
      disabled={disabled || isLoading}
      className={cn(className, isLoading ? "[&>svg]:hidden" : "")}
      onClick={handleClick}
      {...props}
    >
      {isLoading && <Spinner className="block!" />}
      {children}
    </Button>
  );
};

export default ActionBarItem;
