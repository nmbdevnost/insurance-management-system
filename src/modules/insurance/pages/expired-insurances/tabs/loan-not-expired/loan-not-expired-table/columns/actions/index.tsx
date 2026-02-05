import { TooltipProvider } from "@/shared/components/ui/tooltip";
import type { Loan } from "@/shared/lib/types/loans";
import LoanNotExpiredForceAction from "./force-action";
import LoanNotExpiredReleaseHoldAction from "./release-hold-action";
import LoanNotExpiredRenewAction from "./renew-action";
import LoanNotExpiredSendAction from "./send-action";
import LoanNotExpiredViewAction from "./view-action";

const LoanNotExpiredActions = ({ rowData }: { rowData: Loan }) => {
  return (
    <TooltipProvider delay={500}>
      <LoanNotExpiredViewAction rowData={rowData} />
      <LoanNotExpiredForceAction rowData={rowData} />
      <LoanNotExpiredRenewAction rowData={rowData} />
      <LoanNotExpiredSendAction rowData={rowData} />
      <LoanNotExpiredReleaseHoldAction rowData={rowData} />
    </TooltipProvider>
  );
};

export default LoanNotExpiredActions;
