import { TooltipProvider } from "@/shared/components/ui/tooltip";
import type { Insurance } from "@/shared/lib/types/insurance";
import ExpiredInsuranceForceAction from "./force-action";
import ExpiredInsuranceReleaseHoldAction from "./release-hold-action";
import ExpiredInsuranceRenewAction from "./renew-action";
import ExpiredInsuranceSendAction from "./send-action";
import ExpiredInsuranceViewAction from "./view-action";

type ExpiredInsuranceActionsProps = {
  insurance: Insurance;
};

const ExpiredInsuranceActions = ({
  insurance,
}: ExpiredInsuranceActionsProps) => {
  return (
    <TooltipProvider delay={500}>
      <div>
        <ExpiredInsuranceViewAction insurance={insurance} />
        <ExpiredInsuranceForceAction insurance={insurance} />
        <ExpiredInsuranceRenewAction insurance={insurance} />
        <ExpiredInsuranceSendAction insurance={insurance} />
        <ExpiredInsuranceReleaseHoldAction insurance={insurance} />
      </div>
    </TooltipProvider>
  );
};

export default ExpiredInsuranceActions;
