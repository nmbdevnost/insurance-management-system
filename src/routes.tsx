import { AppLayout } from "@/components/layout";
import {
  ClaimsPage,
  DashboardPage,
  PoliciesPage,
  SettingsPage,
  UsersPage,
} from "@/pages";
import { createBrowserRouter, type RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "insurance/policies",
        element: <PoliciesPage />,
      },
      {
        path: "insurance/claims",
        element: <ClaimsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
