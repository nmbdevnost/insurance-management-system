import { Typography } from "@/shared/components/ui/typography";
import { KpiGrid } from "../../components";
import ActionPanelGrid from "./action-panel-grid";
import ChartGrid from "./chart-grid";

export const DashboardPage = () => (
  <>
    <div>
      <Typography variant="h3" as="h1">
        Dashboard
      </Typography>
      <Typography muted>
        Overview of your insurance policy portfolio.
      </Typography>
    </div>

    <KpiGrid />

    <ChartGrid />

    <ActionPanelGrid />
  </>
);
