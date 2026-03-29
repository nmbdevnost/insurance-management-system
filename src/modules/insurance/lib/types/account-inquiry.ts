export type LoanAccountDetailsBody = {
  accounts: {
    accountNumber: string;
  }[];
};

export type LoanAccountDetails = {
  soL_ID: string;
  ciF_ID: string;
  foracid: string;
  accT_NAME: string;
  schM_TYPE: string;
  schM_CODE: string;
  schM_DESC: string;
  accT_OPN_DATE: string;
  maturitY_DATE: string;
  accT_CLS_DATE: string;
  accT_CLS_FLG: string;
  accT_CRNCY_CODE: string;
  sanctioN_LIMIT: number;
  outstandinG_BALANCE: number;
  principaL_PASTDUE_AMT: number;
  interesT_ACCURAL_AMT: number;
  interesT_PASTDUE_AMT: number;
  penaL_INTEREST_AMT: number;
  operativE_AC: string;
};

export type LoanAccountDetailsResponse = Array<LoanAccountDetails>;
