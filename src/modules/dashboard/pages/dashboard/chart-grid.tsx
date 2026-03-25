import { InsuranceDistribution, PolicyBreakdown } from "../../components";

const ChartGrid = () => {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <PolicyBreakdown />
      <InsuranceDistribution />
    </div>
  );
};

export default ChartGrid;
