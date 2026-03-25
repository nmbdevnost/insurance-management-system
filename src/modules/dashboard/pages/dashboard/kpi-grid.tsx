import { useSidebar } from "@/shared/components/ui/sidebar";
import { cn } from "@/shared/lib/utils";
import {
  RiAlertLine,
  RiBankLine,
  RiTimeLine,
  RiUserLine,
} from "@remixicon/react";
import type { StatItem } from "../../components/stat-card";
import StatCard from "../../components/stat-card";

const STATS: StatItem[] = [
  {
    label: "Expiring Soon",
    value: "200",
    icon: RiTimeLine,
    trend: { value: "+5%", direction: "up" },
    iconColor: "text-warning",
  },
  {
    label: "Payment Failures",
    value: "4",
    icon: RiAlertLine,
    trend: { value: "-2", direction: "down" },
    iconColor: "text-destructive",
  },
  {
    label: "Bank Induced",
    value: "600",
    icon: RiBankLine,
    trend: { value: "+15%", direction: "up" },
    iconColor: "text-primary",
  },
  {
    label: "Client Induced",
    value: "400",
    icon: RiUserLine,
    trend: { value: "-4%", direction: "down" },
    iconColor: "text-primary",
  },
];

const KpiGrid: React.FC = () => {
  const { state } = useSidebar();

  return (
    <div
      className={cn(
        "xs:grid-cols-2 grid gap-3",
        state === "collapsed" ? "md:grid-cols-2" : "lg:grid-cols-2"
      )}
    >
      {STATS.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
};

export default KpiGrid;
