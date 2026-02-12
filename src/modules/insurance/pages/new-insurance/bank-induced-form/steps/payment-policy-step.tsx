import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { RiInformationFill } from "@remixicon/react";
import React from "react";

const values = [
  {
    title: "Customer Name",
    value: "Ram Hari",
  },
  {
    title: "Customer CIF ID",
    value: "CUST01",
  },
  {
    title: "Premium Amount",
    value: 2000,
  },
  {
    title: "Insurance Provider",
    value: "Nepal Life Insurance",
  },
];
const PaymentPolicyStep = () => {
  return (
    <div>
      <div className="space-y-2 py-2">
        <h1 className="font-bold">Payment & Policy Creation</h1>
        <p>Process premium payment and creation insurance policy</p>
      </div>
      <div>
        <Alert className="bg-gray-100 py-3">
          <RiInformationFill />
          <AlertDescription>
            Premium will be debited from customer account and credited to
            insurance provider
          </AlertDescription>
        </Alert>
      </div>
      <div className="my-4 bg-gray-100 px-4">
        <h2 className="pt-2 font-semibold">Payment Summary</h2>
        {values.map((item, index) => (
          <div
            key={index}
            className="flex flex-col py-2 md:flex-row md:items-center"
          >
            <div className="md:w-1/3">{item.title}:</div>
            <div>{item.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-gray-100 px-2">
        <h2 className="pt-3 font-semibold">Before Processing Payment</h2>
        <ul className="list-inside list-disc py-2">
          <li>Customer account balance will be verified</li>
          <li>Premium amount will be debited from customer account</li>
          <li>Insurance provider account will be credited</li>
          <li>
            Customer KYC, Assets details and documents will be provided to
            insurance provider
          </li>
          <li>Policy number will be generated and stored</li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentPolicyStep;
