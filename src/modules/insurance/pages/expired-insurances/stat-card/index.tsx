import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type StatCardProps = {
  title?: string;
  value?: string;
  className?: string;
};

const StatCard = ({ title, value, className }: StatCardProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm">{title}</CardTitle>
        <span className="text-2xl font-bold">{value}</span>
      </CardHeader>
    </Card>
  );
};

export default StatCard;
