import type { RouteObject } from "react-router-dom";
import {
  BankInducedPage,
  BulkUploadPage,
  ClientInducedPage,
  ExpiredInsurancesPage,
  InsurancesPage,
} from "../pages";

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
            element: <ClientInducedPage />,
          },
          {
            path: "bank-induced",
            element: <BankInducedPage />,
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
