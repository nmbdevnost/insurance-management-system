import { expiredInsurancesQueries } from "@/modules/insurance/lib/queries/expired-insurances-queries";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Typography } from "@/shared/components/ui/typography";
import { DEFAULT_TABLE_PARAMS } from "@/shared/lib/constants/data-table";
import { generateQueryParams } from "@/shared/lib/utils";
import type { TableParams } from "@/shared/providers/data-table-provider";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { loanAccountDetailsQuery } from "../../lib/queries/account-inquiry-queries";
import ExpiredListTab from "./tabs/expired-list";
import ExpiredLoanTab from "./tabs/expired-loan";
import LoanNotExpiredTab from "./tabs/loan-not-expired";

const ExpiredInsurancePage = () => {
  const [tab, setTab] = useState("expired-policy");

  const [tableParams, setTableParams] =
    useState<TableParams>(DEFAULT_TABLE_PARAMS);

  const queryParams = generateQueryParams(tableParams);

  const { data: expiredListData, isFetching: isFetchingPolicies } = useQuery(
    expiredInsurancesQueries.expiredList({
      days: Number(queryParams.days ?? 30),
      pageNo: tableParams.pagination.page,
      pageSize: tableParams.pagination.pageSize,
    })
  );

  const rawPolicies = expiredListData?.result?.expiringPoliciesDetails;
  const totalRows = expiredListData?.result?.totalCount;
  const responseStatus = expiredListData?.response?.responseCode
    ? Number(expiredListData.response.responseCode)
    : undefined;
  const error = responseStatus
    ? expiredListData?.response?.responseMessage
    : undefined;

  const accountNumbers = useMemo(
    () =>
      rawPolicies?.map(({ policyDetails }) => ({
        accountNumber: policyDetails.accountNo,
      })) ?? [],
    [rawPolicies]
  );

  const {
    data: loanDetails,
    isFetching: isFetchingLoan,
    isError: isLoanDetailsError,
    error: queryLoanDetailsError,
  } = useQuery({
    ...loanAccountDetailsQuery(accountNumbers),
    enabled: !!rawPolicies && accountNumbers.length > 0,
  });

  const loanDetailsResponseStatus = loanDetails?.response?.responseCode
    ? Number(loanDetails.response.responseCode)
    : undefined;
  const loanDetailsError =
    isLoanDetailsError || loanDetailsResponseStatus
      ? queryLoanDetailsError
        ? queryLoanDetailsError.message
        : loanDetails?.response?.responseMessage
      : undefined;

  const isLoading = isFetchingPolicies || isFetchingLoan;

  const getFormattedData = useCallback(() => {
    if (!rawPolicies) return undefined;

    const loanMap = new Map(loanDetails?.result?.map((l) => [l.foracid, l]));

    return rawPolicies.map(({ policyDetails, expiringIn }) => ({
      ...policyDetails,
      expiringIn,
      loanDetail: loanMap.get(policyDetails.accountNo),
    }));
  }, [rawPolicies, loanDetails]);
  const formattedData = getFormattedData();

  // const formattedData = useMemo(() => {
  //   if (!rawPolicies) return undefined;

  //   const loanMap = new Map(loanDetails?.result?.map((l) => [l.foracid, l]));

  //   return rawPolicies.map(({ policyDetails, expiringIn }) => ({
  //     ...policyDetails,
  //     expiringIn,
  //     loanDetail: loanMap.get(policyDetails.accountNo),
  //   }));
  // }, [rawPolicies, loanDetails]);

  const closedLoans = useMemo(
    () => formattedData?.filter((p) => p.loanDetail?.accT_CLS_FLG === "Y"),
    [formattedData]
  );

  const notClosedLoans = useMemo(
    () => formattedData?.filter((p) => p.loanDetail?.accT_CLS_FLG === "N"),
    [formattedData]
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h3" as="h1">
            Insurance Expiry & Renewal
          </Typography>
          <Typography muted>
            Kathmandu Branch &bull; Last Updated:{" "}
            {format(new Date(), "PPP hh:mm a")}
          </Typography>
        </div>
      </div>
      <Tabs className="gap-0" value={tab} onValueChange={setTab}>
        <TabsList className="ml-4 rounded-b-none border">
          <TabsTrigger
            className="data-active:bg-primary data-active:text-primary-foreground!"
            value="expired-policy"
          >
            Expired List
          </TabsTrigger>
          <TabsTrigger
            className="data-active:bg-primary data-active:text-primary-foreground!"
            value="expired-loan"
          >
            Loan Closed
          </TabsTrigger>
          <TabsTrigger
            className="data-active:bg-primary data-active:text-primary-foreground!"
            value="loan-not-expired"
          >
            Loan Not Closed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expired-policy">
          <ExpiredListTab
            data={formattedData}
            totalRows={totalRows}
            isLoading={isFetchingPolicies}
            error={error}
            tableParams={tableParams}
            onTableParamsChange={setTableParams}
            key="expired-policy-tab"
          />
        </TabsContent>

        <TabsContent value="expired-loan">
          <ExpiredLoanTab
            data={closedLoans}
            totalRows={totalRows}
            isLoading={isLoading}
            error={loanDetailsError}
            tableParams={tableParams}
            onTableParamsChange={setTableParams}
            key="expired-loan-tab"
          />
        </TabsContent>

        <TabsContent value="loan-not-expired">
          <LoanNotExpiredTab
            data={notClosedLoans}
            totalRows={totalRows}
            isLoading={isLoading}
            error={loanDetailsError}
            // tableParams={tableParams}
            // onTableParamsChange={setTableParams}
            key="not-expired-loan-tab"
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ExpiredInsurancePage;
