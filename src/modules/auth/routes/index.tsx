import type { RouteObject } from "react-router-dom";
import { LoginPage } from "../pages";

const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export default authRoutes;
