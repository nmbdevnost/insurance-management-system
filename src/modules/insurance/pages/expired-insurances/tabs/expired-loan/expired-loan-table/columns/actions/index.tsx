import { TooltipProvider } from "@/shared/components/ui/tooltip";
import type { ExpiredLoan } from "@/shared/lib/types/loans";
import ExpiredLoanForceAction from "./force-action";
import ExpiredLoanReleaseHoldAction from "./release-hold-action";
import ExpiredLoanRenewAction from "./renew-action";
import ExpiredLoanSendAction from "./send-action";
import ExpiredLoanViewAction from "./view-action";

const ExpiredLoanActions = ({ rowData }: { rowData: ExpiredLoan }) => {
  return (
    <TooltipProvider delay={500}>
      <ExpiredLoanViewAction rowData={rowData} />
      <ExpiredLoanForceAction rowData={rowData} />
      <ExpiredLoanRenewAction rowData={rowData} />
      <ExpiredLoanSendAction rowData={rowData} />
      <ExpiredLoanReleaseHoldAction rowData={rowData} />
    </TooltipProvider>
  );
};

export default ExpiredLoanActions;
