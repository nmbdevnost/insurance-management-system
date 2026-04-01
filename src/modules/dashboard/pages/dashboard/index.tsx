import { Typography } from "@/shared/components/ui/typography";
import { KpiGrid } from "../../components";
import PolicyOverview from "../../components/policy-overview";
import ActionPanelGrid from "./action-panel-grid";
import ChartGrid from "./chart-grid";

export const DashboardPage = () => (
  <>
    <div>
      <Typography variant="h3" as="h1">
        Welcome Back 👋
      </Typography>
      <Typography muted>
        Overview of your insurance policy portfolio.
      </Typography>
    </div>

    <div className="grid gap-4 2xl:grid-cols-2">
      <PolicyOverview />
      <KpiGrid />
    </div>
    <ActionPanelGrid />
    <ChartGrid />
  </>
);
