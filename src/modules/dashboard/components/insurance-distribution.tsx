import AnimatedBar from "@/shared/components/chart/animated-bar";
import PieChart from "@/shared/components/chart/pie-chart";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const INSURANCE_DATA = [
  {
    key: "building",
    label: "Building",
    value: 200,
  },
  {
    key: "vehicle",
    label: "Vehicle",
    value: 300,
  },
  {
    key: "fixed-assets",
    label: "Fixed Assets C.",
    value: 300,
  },
  {
    key: "stock",
    label: "Stock",
    value: 150,
  },
  {
    key: "solar-home",
    label: "Solar Home",
    value: 50,
  },
];

const InsuranceDistribution = () => {
  const total = INSURANCE_DATA.reduce((s, d) => s + d.value, 0);
  const max = Math.max(...INSURANCE_DATA.map((d) => d.value));

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle className="text-base font-bold tracking-tight">
            Insurance Portfolio
          </CardTitle>
          <CardDescription>Distribution by type</CardDescription>
        </div>

        <Badge variant="info-light">{total.toLocaleString()} Total</Badge>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-4">
        <PieChart
          data={INSURANCE_DATA}
          label="Policies"
          className="w-45"
          innerRadius={60}
          outerRadius={80}
        />

        <div className="min-w-40 flex-1 space-y-4">
          {INSURANCE_DATA.map((item, index) => {
            return (
              <div key={item.label}>
                <div className="flex items-baseline justify-between">
                  <span className="text-muted-foreground text-xs font-medium">
                    {item.label}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-foreground text-[13px] font-bold">
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                </div>

                <AnimatedBar value={(item.value / max) * 100} index={index} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsuranceDistribution;
