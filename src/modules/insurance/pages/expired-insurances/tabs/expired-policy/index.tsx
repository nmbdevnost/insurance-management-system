import { expiredInsurancesQueries } from "@/modules/insurance/lib/queries/expired-insurances-queries";
import { DEFAULT_TABLE_PARAMS } from "@/shared/lib/constants/data-table";
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

  const { data: expiredListData, isFetching } = useQuery(
    expiredInsurancesQueries.expiredList({
      days: 30,
      pageNo: tableParams.pagination.page,
      pageSize: tableParams.pagination.pageSize,
    })
  );

  const data = expiredListData?.result.expiringPoliciesDetails;

  return (
    <>
      <DataTableProvider
        data={data}
        columns={expiredPolicyColumns}
        tableParams={tableParams}
        onTableParamsChange={setTableParams}
        isLoading={isFetching}
      >
        <ExpiredPolicyTable />
      </DataTableProvider>
    </>
  );
};

export default ExpiredPolicyTab;
