import type { RouteObject } from "react-router-dom";
import {
  BulkUploadPage,
  ExpiredInsurancesPage,
  InsurancesPage,
} from "../pages";
import BankInducedForm from "../pages/new-insurance/bank-induced-form";
import ClientInducedForm from "../pages/new-insurance/client-induced-form";

const insuranceRoutes: RouteObject[] = [
  {
    path: "/insurance",
    children: [
      {
        index: true,
        element: <InsurancesPage />,
      },
      {
        path: "new",
        children: [
          {
            path: "client-induced",
            element: <ClientInducedForm />,
          },
          {
            path: "bank-induced",
            element: <BankInducedForm />,
          },
        ],
      },
      {
        path: "expired",
        element: <ExpiredInsurancesPage />,
      },
    ],
  },
  {
    path: "/bulk-upload",
    element: <BulkUploadPage />,
  },
];

export default insuranceRoutes;
