import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function isStringMatch(str: string, toMatchStr: string) {
  return str.toLowerCase().includes(toMatchStr.toLowerCase());
}

function mapColor(status: string) {
  if (isStringMatch(status, "auto-deduct")) {
    return "bg-violet-200 border-violet-500 text-violet-500";
  }

  if (isStringMatch(status, "reminder")) {
    return "bg-orange-200 border-orange-500 text-orange-500";
  }

  if (isStringMatch(status, "expired")) {
    return "bg-red-200 border-red-500 text-red-500";
  }

  if (isStringMatch(status, "ok")) {
    return "bg-green-200 border-green-500 text-green-500";
  }

  if (isStringMatch(status, "hold")) {
    return "bg-yellow-200 border-yellow-500 text-yellow-500";
  }

  return "text-primary border-primary bg-primary/20";
}

const ExpiredInsuranceStatusBadge = ({ status }: { status: string }) => {
  //   const COLOR_MAPPING = {
  //   "auto-deduct": "bg-violet-200 border-violet-500 text-violet-500",
  //   reminder: "bg-orange-200 border-orange-500 text-orange-500",
  //   expired: "bg-red-200 border-red-500 text-red-500",
  //   ok: "bg-green-200 border-green-500 text-green-500",
  //   hold: "bg-yellow-200 border-yellow-500 text-yellow-500",
  // } as const;

  // const isVariantValid = status in COLOR_MAPPING;
  // const color = COLOR_MAPPING[status as keyof typeof COLOR_MAPPING];

  const color = mapColor(status);

  return <Badge className={cn("capitalize", color)}>{status}</Badge>;
};

export default ExpiredInsuranceStatusBadge;
