import { cn } from "@/shared/lib/utils";
import React from "react";

const DetailSectionGroup = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return <div className={cn("space-y-8 p-6", className)}>{children}</div>;
};

export default DetailSectionGroup;
