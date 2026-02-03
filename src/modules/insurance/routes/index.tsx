import type { RouteObject } from "react-router-dom";
import {
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
];

export default insuranceRoutes;
