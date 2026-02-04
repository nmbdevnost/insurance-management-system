import { AppLayout } from "@/components/layout";
import { DashboardPage } from "@/modules/dashboard/pages";
import ReportsPage from "@/modules/insurance/pages/reports";
import insuranceRoutes from "@/modules/insurance/routes";
import type { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      ...insuranceRoutes,
      {
        path: "/reports",
        element: <ReportsPage />,
      },
    ],
  },
];

export default routes;
