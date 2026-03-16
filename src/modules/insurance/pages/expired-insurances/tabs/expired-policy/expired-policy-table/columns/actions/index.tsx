import { TooltipProvider } from "@/shared/components/ui/tooltip";
import type { FormattedExpiredPolicy } from "@/shared/lib/types/policies";
import ExpiredInsuranceForceAction from "./force-action";
import ExpiredInsuranceReleaseHoldAction from "./release-hold-action";
import ExpiredInsuranceRenewAction from "./renew-action";
import ExpiredInsuranceSendAction from "./send-action";
import ExpiredInsuranceViewAction from "./view-action";

type ExpiredInsuranceActionsProps = {
  policy: FormattedExpiredPolicy;
};

const ExpiredInsuranceActions = ({ policy }: ExpiredInsuranceActionsProps) => {
  return (
    <TooltipProvider delay={500}>
      <div>
        <ExpiredInsuranceViewAction policy={policy} />
        <ExpiredInsuranceForceAction policy={policy} />
        <ExpiredInsuranceRenewAction policy={policy} />
        <ExpiredInsuranceSendAction policy={policy} />
        <ExpiredInsuranceReleaseHoldAction policy={policy} />
      </div>
    </TooltipProvider>
  );
};

export default ExpiredInsuranceActions;
