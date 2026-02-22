import { RiBankLine, RiGroupLine } from "@remixicon/react";
import { ActionPanel } from "../../components";

const ActionPanelGrid = () => {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
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
            to: "/insurance/new/bank-induced",
          },
          {
            title: "View Submitted Policies",
            description: "Review and manage client-provided insurance.",
            buttonText: "View Policies",
            to: "/insurance?type=client-induced",
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
            to: "/insurance/new/bank-induced",
          },
          {
            title: "Manage Bank Policies",
            description: "View and track bank-provided insurance.",
            buttonText: "View Policies",
            to: "/insurance?type=bank-induced",
          },
        ]}
      />
    </div>
  );
};

export default ActionPanelGrid;
