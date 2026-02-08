export type Insurance = {
  id: string;
  loan_number: string;
  customer: string;
  insurance_expiry_date: string;
  days_left: number;
  policy: string;
  status: string;
};

export type ExcelExtractedRow = {
  "Customer Name": string;
  "Customer Email": string;
  "Customer Phone Number": string;
  "Customer Identification Number": string;
  "Reference Identifier": string;
  "Purpose Name": string;
  "Meeting Status": string;
  "Video Provider": string;
  "Scheduled Date": string;
  "Meeting Link": string;
  Remarks: string;
  "Cancellation Reason": string;
  status: string;
};
