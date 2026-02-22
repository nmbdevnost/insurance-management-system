import { TooltipProvider } from "@/shared/components/ui/tooltip";
import InsuranceViewAction from "./view-action";
import type { Insurance } from "@/shared/lib/types/insurance";

const InsuranceActions = ({ rowData }: { rowData: Insurance }) => {
  return (
    <TooltipProvider delay={500}>
      <div>
        <InsuranceViewAction rowData={rowData} />
      </div>
    </TooltipProvider>
  );
};

export default InsuranceActions;
