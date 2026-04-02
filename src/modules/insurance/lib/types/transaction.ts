export interface FundTransferRequest {
  transactionCount: number;
  transactionAmount: number;
  transactions: {
    drAccountNumber: string;
    crAccountNumber: string;
    amount: number;
    tranParticular: string;
    tranRemarks: string;
  }[];
}

export interface DemandLoanRequest {
  loanDisbursementFlag: boolean;
  fundTransferFlag: boolean;
  accountDetails: {
    cifId: string;
    nomineeBranchCode: string;
    nomineeAccountNo: string;
    loanPeriodDays: number;
    loanAmount: number;
    premiumRate: number;
  }[];
}
