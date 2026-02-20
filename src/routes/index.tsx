import controlPanelRoutes from "@/modules/control-panel/routes";
import { DashboardPage } from "@/modules/dashboard/pages";
import { ReportsPage } from "@/modules/insurance/pages";
import insuranceRoutes from "@/modules/insurance/routes";
import { AppLayout } from "@/shared/components/layout";
import NotFoundPage from "@/shared/components/not-found-page";
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
        path: "/report",
        element: <ReportsPage />,
      },
      ...controlPanelRoutes,
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
