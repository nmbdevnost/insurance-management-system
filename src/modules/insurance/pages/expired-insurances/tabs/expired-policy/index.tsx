import { expiredInsurancesQueries } from "@/modules/insurance/lib/queries/expired-insurances-queries";
import { DEFAULT_TABLE_PARAMS } from "@/shared/lib/constants/data-table";
import { generateQueryParams } from "@/shared/lib/utils";
import {
  DataTableProvider,
  type TableParams,
} from "@/shared/providers/data-table-provider";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ExpiredPolicyTable from "./expired-policy-table";
import expiredPolicyColumns from "./expired-policy-table/columns";

const ExpiredPolicyTab = () => {
  const [tableParams, setTableParams] =
    useState<TableParams>(DEFAULT_TABLE_PARAMS);

  const queryParams = generateQueryParams(tableParams);

  const { data: expiredListData, isFetching } = useQuery(
    expiredInsurancesQueries.expiredList({
      days: Number(queryParams.days ?? 30),
      pageNo: tableParams.pagination.page,
      pageSize: tableParams.pagination.pageSize,
    })
  );

  const data = expiredListData?.result.expiringPoliciesDetails;
  const totalRows = expiredListData?.result.totalCount;

  const formattedData = data?.map(({ policyDetails, expiringIn }) => {
    return {
      ...policyDetails,
      expiringIn,
    };
  });

  return (
    <>
      <DataTableProvider
        data={formattedData}
        columns={expiredPolicyColumns}
        tableParams={tableParams}
        onTableParamsChange={setTableParams}
        isLoading={isFetching}
        totalRows={totalRows}
      >
        <ExpiredPolicyTable />
      </DataTableProvider>
    </>
  );
};

export default ExpiredPolicyTab;
