import {
  BRANCH_CODE_LENGTH,
  LOAN_PERIOD_DAYS,
  PREMIUM_RATE,
  REVIEW_TABS,
} from "@/modules/insurance/lib/constants/bulk-transaction";
import {
  demandLoanMutationOptions,
  fundTransferMutationOptions,
} from "@/modules/insurance/lib/mutations/transaction-mutations";
import type { ReviewTab } from "@/modules/insurance/lib/types/bulk-transaction";
import type {
  DemandLoanRequest,
  FundTransferRequest,
} from "@/modules/insurance/lib/types/transaction";
import { useBulkUpload } from "@/modules/insurance/providers/bulk-upload-provider";
import DataTable from "@/shared/components/data-table";
import DataTablePagination from "@/shared/components/data-table/data-table-pagination";
import { Button } from "@/shared/components/ui/button";
import { CardContent, CardFooter } from "@/shared/components/ui/card";
import Spinner from "@/shared/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { DEFAULT_TABLE_PARAMS } from "@/shared/lib/constants";
import {
  DataTableProvider,
  type TableParams,
} from "@/shared/providers/data-table-provider";
import { RiCheckLine } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Activity, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import enrichedColumns from "./enriched-columns";

const BulkUploadReviewStep = () => {
  const {
    enrichedRows,
    rowSelection,
    setRowSelection,
    activeTab,
    setActiveTab,
    setTab,
  } = useBulkUpload();

  const [tabParams, setTabParams] = useState<Record<ReviewTab, TableParams>>({
    all: DEFAULT_TABLE_PARAMS,
    sufficient: DEFAULT_TABLE_PARAMS,
    insufficient: DEFAULT_TABLE_PARAMS,
  });

  const handleTableParamsChange = useCallback(
    (tabValue: ReviewTab) => (updater: React.SetStateAction<TableParams>) => {
      setTabParams((prev) => {
        const next =
          typeof updater === "function" ? updater(prev[tabValue]) : updater;
        setRowSelection(next.selections);
        return { ...prev, [tabValue]: next };
      });
    },
    [setRowSelection]
  );

  const fundTransferMutation = useMutation({
    ...fundTransferMutationOptions,
    onError: () =>
      toast.error("Fund Transfer request failed. Please try again."),
  });

  const demandLoanMutation = useMutation({
    ...demandLoanMutationOptions,
    onError: () => toast.error("Demand Loan request failed. Please try again."),
  });

  const isProcessing =
    fundTransferMutation.isPending || demandLoanMutation.isPending;

  // Derive selected rows from rowSelection record + current enrichedRows
  const selectedRows = enrichedRows.filter(
    (r) => rowSelection[r.reference_number]
  );

  /** Splits selected rows by status and fires respective APIs in parallel */
  const handleSubmit = async () => {
    if (selectedRows.length === 0) {
      toast.warning("Please select at least one row to process.");
      return;
    }

    const sufficientRows = selectedRows.filter(
      (r) => r.status === "sufficient"
    );
    const insufficientRows = selectedRows.filter(
      (r) => r.status === "insufficient"
    );

    let anyFailed = false;
    const mutations: Promise<void>[] = [];

    if (sufficientRows.length > 0) {
      const payload: FundTransferRequest = {
        transactionCount: 1,
        transactionAmount: sufficientRows.reduce((sum, r) => sum + r.amount, 0),
        transactions: sufficientRows.map((r) => ({
          drAccountNumber: r.debit_account_number,
          crAccountNumber: r.credit_account_number,
          amount: r.amount,
          tranParticular: r.tran_particular,
          tranRemarks: r.tran_remarks,
        })),
      };
      mutations.push(
        new Promise<void>((resolve) =>
          fundTransferMutation.mutate(payload, {
            onSuccess: () => resolve(),
            onError: () => {
              anyFailed = true;
              resolve();
            },
          })
        )
      );
    }

    if (insufficientRows.length > 0) {
      const payload: DemandLoanRequest = {
        loanDisbursementFlag: true,
        fundTransferFlag: true,
        accountDetails: insufficientRows.map((r) => ({
          cifId: r.cif_id,
          nomineeBranchCode: r.debit_account_number.slice(
            0,
            BRANCH_CODE_LENGTH
          ),
          nomineeAccountNo: r.debit_account_number,
          loanPeriodDays: LOAN_PERIOD_DAYS,
          loanAmount: r.amount,
          premiumRate: PREMIUM_RATE,
        })),
      };
      mutations.push(
        new Promise<void>((resolve) =>
          demandLoanMutation.mutate(payload, {
            onSuccess: () => resolve(),
            onError: () => {
              anyFailed = true;
              resolve();
            },
          })
        )
      );
    }

    await Promise.allSettled(mutations);

    if (!anyFailed) setTab("done");
  };

  const filteredRowsByTab = useMemo(
    () => ({
      all: [...enrichedRows],
      sufficient: enrichedRows.filter((r) => r.status === "sufficient"),
      insufficient: enrichedRows.filter((r) => r.status === "insufficient"),
    }),
    [enrichedRows]
  );

  return (
    <>
      <CardContent className="space-y-4 p-4">
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as ReviewTab)}
        >
          <div className="flex items-center justify-between">
            <TabsList>
              {REVIEW_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                  <span className="text-xs opacity-60">
                    ({filteredRowsByTab[tab.value].length})
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            <span className="text-muted-foreground text-sm">
              {selectedRows.length} row{selectedRows.length !== 1 ? "s" : ""}{" "}
              selected
            </span>
          </div>

          {REVIEW_TABS.map((tab) => (
            <Activity
              key={tab.value}
              mode={tab.value === activeTab ? "visible" : "hidden"}
            >
              <DataTableProvider
                rowId="reference_number"
                columns={enrichedColumns}
                data={filteredRowsByTab[tab.value]}
                manualPagination={false}
                tableParams={{
                  ...tabParams[tab.value],
                  selections: rowSelection,
                }}
                onTableParamsChange={handleTableParamsChange(tab.value)}
              >
                <DataTable autoFillHeightOffset={165} />
                <DataTablePagination />
              </DataTableProvider>
            </Activity>
          ))}
        </Tabs>
      </CardContent>

      <CardFooter>
        <Button
          className="ml-auto"
          onClick={handleSubmit}
          disabled={isProcessing || selectedRows.length === 0}
        >
          {isProcessing ? <Spinner /> : <RiCheckLine />}
          {isProcessing ? "Processing..." : "Process Selected Rows"}
        </Button>
      </CardFooter>
    </>
  );
};

export default BulkUploadReviewStep;
