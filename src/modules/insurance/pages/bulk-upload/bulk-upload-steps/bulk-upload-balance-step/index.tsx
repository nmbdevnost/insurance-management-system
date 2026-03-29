import { checkAccountBalancesQuery } from "@/modules/insurance/lib/queries/insurances-queries";
import type {
  AccountBalanceResponse,
  BalanceCheckResult,
} from "@/modules/insurance/lib/types/insurances";
import { useBulkUpload } from "@/modules/insurance/providers/bulk-upload-provider";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";
import { CardContent, CardFooter } from "@/shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Typography } from "@/shared/components/ui/typography";
import useLeaveConfirmation from "@/shared/hooks/use-leave-confirmation";
import {
  RiAlertLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "@remixicon/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import BalanceTable from "./balance-table";

type BalanceTab = "all" | "available" | "not-available";

const FALLBACK_BALANCE_INFO: AccountBalanceResponse = {
  soL_ID: "",
  ciF_ID: "",
  foracid: "",
  accT_NAME: "",
  schM_TYPE: "",
  schM_CODE: "",
  schM_DESC: "",
  accT_CLS_FLG: "",
  accT_STATUS: "",
  freZ_CODE: "",
  limiT_EXPIRY_DATE: "",
  accT_CRNCY_CODE: "",
  sanctioN_LIMIT: 0,
  currenT_BALANCE: 0,
  lieN_AMT: 0,
  availablE_BALANCE: 0,
};

const BulkUploadBalanceStep = () => {
  const { extractedRows, setTab } = useBulkUpload();

  const accounts = extractedRows.map((row) => ({
    accountNumber: row.debit_account_number.toString(),
  }));

  const { data, isPending, isError, error } = useQuery(
    checkAccountBalancesQuery(accounts)
  );

  const balanceResults = useMemo<BalanceCheckResult[]>(() => {
    if (!data?.data.result) return [];

    const balanceMap = new Map<string, AccountBalanceResponse>(
      data.data.result.map((b) => [b.foracid, b])
    );

    return extractedRows.map((row) => {
      const balanceInfo = balanceMap.get(row.debit_account_number) ?? {
        ...FALLBACK_BALANCE_INFO,
        foracid: row.debit_account_number,
      };
      return {
        ...row,
        balanceInfo,
        hasEnoughBalance: balanceInfo.availablE_BALANCE >= row.amount,
      };
    });
  }, [data, extractedRows]);

  const tabData = useMemo<Record<BalanceTab, BalanceCheckResult[]>>(
    () => ({
      all: balanceResults,
      available: balanceResults.filter((r) => r.hasEnoughBalance),
      "not-available": balanceResults.filter((r) => !r.hasEnoughBalance),
    }),
    [balanceResults]
  );

  useLeaveConfirmation();

  return (
    <>
      <CardContent className="space-y-4 p-4">
        <Typography variant="h4">Balance Check</Typography>

        {isError && (
          <Alert variant="destructive">
            <RiAlertLine />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.message ||
                "Failed to fetch account balances. Please try again."}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({tabData.all.length})</TabsTrigger>
            <TabsTrigger value="available">
              Balance Available ({tabData.available.length})
            </TabsTrigger>
            <TabsTrigger value="not-available">
              Balance Not Available ({tabData["not-available"].length})
            </TabsTrigger>
          </TabsList>

          {(["all", "available", "not-available"] as BalanceTab[]).map(
            (tabKey) => (
              <TabsContent key={tabKey} value={tabKey}>
                <BalanceTable
                  key={tabKey}
                  rows={tabData[tabKey]}
                  isLoading={isPending}
                />
              </TabsContent>
            )
          )}
        </Tabs>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          onClick={() => {
            setTab("preview");
          }}
        >
          <RiArrowLeftLine />
          Back
        </Button>

        <Button
          className="ml-auto"
          disabled={isPending || balanceResults.length === 0}
        >
          Continue
          <RiArrowRightLine />
        </Button>
      </CardFooter>
    </>
  );
};

export default BulkUploadBalanceStep;
