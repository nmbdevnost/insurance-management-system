import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import { mapColor } from "../utils/status-badge";

const InsuranceStatusBadge = ({
  status,
  className,
}: {
  status: string;
  className?: string;
}) => {
  const color = mapColor(status);

  return <Badge className={cn("capitalize", color, className)}>{status}</Badge>;
};

export default InsuranceStatusBadge;
