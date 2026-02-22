import { useSidebar } from "@/shared/components/ui/sidebar";
import { cn } from "@/shared/lib/utils";
import {
  RiAlertLine,
  RiBankLine,
  RiFileCloseLine,
  RiFileListLine,
  RiShieldCheckLine,
  RiTimeLine,
} from "@remixicon/react";
import type { StatItem } from "../../components/stat-card";
import StatCard from "../../components/stat-card";

const STATS: StatItem[] = [
  {
    label: "Total Policies",
    value: "1,000",
    icon: RiFileListLine,
    trend: "+12%",
    up: true,
    borderColor: "border-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badgeBg: "bg-primary/10",
    badgeText: "text-primary",
  },
  {
    label: "Expiring Soon",
    value: "200",
    icon: RiTimeLine,
    trend: "+5%",
    up: true,
    borderColor: "border-warning",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    badgeBg: "bg-warning/10",
    badgeText: "text-warning",
  },
  {
    label: "Payment Failures",
    value: "4",
    icon: RiAlertLine,
    trend: "-2",
    up: false,
    borderColor: "border-destructive",
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    badgeBg: "bg-destructive/10",
    badgeText: "text-destructive",
  },
  {
    label: "Active Policies",
    value: "950",
    icon: RiShieldCheckLine,
    trend: "+8%",
    up: true,
    borderColor: "border-success",
    iconBg: "bg-emerald-50",
    iconColor: "text-success",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
  },
  {
    label: "Expired Policies",
    value: "50",
    icon: RiFileCloseLine,
    trend: "-3%",
    up: false,
    borderColor: "border-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badgeBg: "bg-primary/10",
    badgeText: "text-primary",
  },
  {
    label: "Bank Induced",
    value: "600",
    icon: RiBankLine,
    trend: "+15%",
    up: true,
    borderColor: "border-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badgeBg: "bg-primary/10",
    badgeText: "text-primary",
  },
];

const KpiGrid: React.FC = () => {
  const { state } = useSidebar();

  return (
    <div
      className={cn(
        "xs:grid-cols-2 grid gap-4",
        state === "collapsed" ? "md:grid-cols-3" : "lg:grid-cols-3"
      )}
    >
      {STATS.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
};

export default KpiGrid;
