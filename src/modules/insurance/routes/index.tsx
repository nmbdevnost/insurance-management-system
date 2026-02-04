import type { RouteObject } from "react-router-dom";
import {
  BulkUploadPage,
  ExpiredInsurancesPage,
  InsurancesPage,
  NewInsurancePage,
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
        element: <NewInsurancePage />,
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
