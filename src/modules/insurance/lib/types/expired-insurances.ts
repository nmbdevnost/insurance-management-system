import type {
  ExpiredPolicy,
  ExpiredPolicyDetails,
} from "@/shared/lib/types/policies";
import type { TableParams } from "@/shared/providers/data-table-provider";
import type { LoanAccountDetails } from "./account-inquiry";

export type ExpiredInsurancesExpiredListBody = {
  days?: number;
  pageNo?: number;
  pageSize?: number;
};

export type ExpiredInsurancesExpiredListResponse = {
  totalCount: number;
  expiringPoliciesDetails: Array<ExpiredPolicy>;
};

// Flattened row used in all three tabs
export type FormattedPolicy = ExpiredPolicyDetails & {
  expiringIn: string;
  loanDetail: LoanAccountDetails | undefined;
};

// Props for the paginated "all" tab
export interface ExpiredPolicyTabProps {
  data: FormattedPolicy[] | undefined;
  totalRows: number | undefined;
  isLoading: boolean;
  error: string | undefined;
  tableParams: TableParams;
  onTableParamsChange: React.Dispatch<React.SetStateAction<TableParams>>;
}

// Props for the two client-filtered tabs (no pagination)
export interface LoanTabProps {
  data: FormattedPolicy[] | undefined;
  isLoading: boolean;
  error: string | undefined;
}
