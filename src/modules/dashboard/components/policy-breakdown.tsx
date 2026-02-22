import AnimatedBar from "@/shared/components/chart/animated-bar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export interface PolicyBar {
  label: string;
  value: number;
  total: number;
}

const POLICY_BARS: PolicyBar[] = [
  {
    label: "Active Policies",
    value: 950,
    total: 1000,
  },
  { label: "Client Induced", value: 400, total: 1000 },
  { label: "Bank Induced", value: 600, total: 1000 },
  { label: "Expiring Soon", value: 200, total: 1000 },
  { label: "Expired", value: 50, total: 1000 },
];

const PolicyBreakdown = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold tracking-tight">
            Policy Breakdown
          </CardTitle>
          <CardDescription>Status across all policies</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {POLICY_BARS.map((item, index) => (
            <div key={item.label}>
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground text-xs font-medium">
                  {item.label}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-foreground text-[13px] font-bold">
                    {item.value.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground/50 text-[11px]">
                    / {item.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <AnimatedBar
                value={(item.value / item.total) * 100}
                index={index}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default PolicyBreakdown;
