import { checkBalanceMutationOptions } from "@/modules/insurance/lib/mutations/transaction-mutations";
import type { EnrichedRow } from "@/modules/insurance/lib/types/bulk-transaction";
import { useBulkUpload } from "@/modules/insurance/providers/bulk-upload-provider";
import { Button } from "@/shared/components/ui/button";
import { CardContent, CardFooter } from "@/shared/components/ui/card";
import Spinner from "@/shared/components/ui/spinner";
import { Typography } from "@/shared/components/ui/typography";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import ExtractedTable from "./extracted-table";

const UploadPreviewStep = () => {
  const { extractedRows, setEnrichedRows, setTab } = useBulkUpload();

  const balanceCheckMutation = useMutation({
    ...checkBalanceMutationOptions,
    onSuccess: (balanceData) => {
      const balanceMap = new Map<string, number>(
        balanceData.result.map((item) => [item.foracid, item.availablE_BALANCE])
      );

      const enriched: EnrichedRow[] = extractedRows.map((row) => {
        const availableBalance = balanceMap.get(row.debit_account_number) ?? 0;
        return {
          ...row,
          availableBalance,
          status:
            availableBalance >= row.amount ? "sufficient" : "insufficient",
        };
      });

      setEnrichedRows(enriched);
      setTab("balance_check");
    },
    onError: () => {
      toast.error("Balance check failed. Please try again.");
    },
  });

  const handleContinue = () => {
    const uniqueAccounts = [
      ...new Set(extractedRows.map((r) => r.debit_account_number)),
    ].map((accountNumber) => ({ accountNumber }));

    balanceCheckMutation.mutate(uniqueAccounts);
  };

  return (
    <>
      <CardContent className="mb-4 w-full space-y-2">
        <Typography variant="h4">Preview Extracted Data</Typography>
        <ExtractedTable extractedRows={extractedRows} />
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          onClick={() => setTab("upload")}
          disabled={balanceCheckMutation.isPending}
        >
          <RiArrowLeftLine />
          Back
        </Button>
        <div className="ml-auto flex items-center gap-1">
          <Button
            disabled={
              extractedRows.length === 0 || balanceCheckMutation.isPending
            }
            onClick={handleContinue}
          >
            {balanceCheckMutation.isPending ? (
              <Spinner />
            ) : (
              <RiArrowRightLine />
            )}
            {balanceCheckMutation.isPending
              ? "Checking Balances..."
              : "Continue"}
          </Button>
        </div>
      </CardFooter>
    </>
  );
};

export default UploadPreviewStep;
