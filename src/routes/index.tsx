import authRoutes from "@/modules/auth/routes";
import controlPanelRoutes from "@/modules/control-panel/routes";
import { DashboardPage } from "@/modules/dashboard/pages";
import { ReportsPage } from "@/modules/insurance/pages";
import insuranceRoutes from "@/modules/insurance/routes";
import RootLayout from "@/shared/components/layout/root-layout";
import NotFoundPage from "@/shared/components/not-found-page";
import type { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      ...insuranceRoutes,
      {
        path: "/report",
        element: <ReportsPage />,
      },
      ...controlPanelRoutes,
    ],
  },
  ...authRoutes,
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
