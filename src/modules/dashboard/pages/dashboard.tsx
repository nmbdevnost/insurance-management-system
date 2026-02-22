import { Typography } from "@/shared/components/ui/typography";
import { RiBankLine, RiGroupLine } from "@remixicon/react";
import {
  ActionPanel,
  InsuranceDistribution,
  KpiGrid,
  PolicyBreakdown,
} from "../components";

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

    {/* Charts */}
    <div className="grid grid-cols-2 gap-4">
      <InsuranceDistribution />

      <PolicyBreakdown />
    </div>

    {/* Action panels */}
    <div className="grid grid-cols-2 gap-4">
      <ActionPanel
        title="Client-Induced Insurance"
        description="Process policies submitted by clients."
        totalData="400 Policies"
        icon={RiGroupLine}
        actions={[
          {
            title: "Record Policy",
            description: "Enter policy information from client submissions.",
            buttonText: "Start",
            isPrimary: true,
          },
          {
            title: "View Submitted Policies",
            description: "Review and manage client-provided insurance.",
            buttonText: "View Policies",
            isPrimary: false,
          },
        ]}
      />

      <ActionPanel
        title="Bank-Induced Insurance"
        description="Manage policies provided by the bank."
        totalData="600 Policies"
        icon={RiBankLine}
        actions={[
          {
            title: "Record Policy",
            description: "Enter asset details and process premium payment.",
            buttonText: "Initiate New",
            isPrimary: true,
          },
          {
            title: "Manage Bank Policies",
            description: "View and track bank-provided insurance.",
            buttonText: "View Policies",
            isPrimary: false,
          },
        ]}
      />
    </div>
  </>
);
