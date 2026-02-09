import type { RouteObject } from "react-router-dom";
import ControlPanelPage from "../pages";
import EmailTemplatesManager from "../pages/email-template";
import ScheduleNotificationPage from "../pages/schedule-notifications";

const controlPanelRoutes: RouteObject[] = [
  {
    path: "/control-panel",
    children: [
      {
        index: true,
        element: <ControlPanelPage />,
      },
      {
        path: "email-template",
        element: <EmailTemplatesManager />,
      },
      {
        path: "scheduled-notifications",
        element: <ScheduleNotificationPage />,
      },
    ],
  },
];

export default controlPanelRoutes;
