import type { MenuItem } from "../types/menu";

/**
 * Dynamic sidebar menu configuration.
 * - Items with a `path` are links.
 * - Items with `children` become collapsible (expanded sidebar) or dropdown (collapsed sidebar).
 */
const SIDEBAR_MENU_ITEMS: MenuItem[] = [
  {
    path: "/",
    label: "Dashboard",
    icon: "ri-dashboard-line",
  },
  {
    label: "Insurance",
    icon: "ri-shield-check-line",
    children: [
      {
        path: "/insurance/new",
        label: "New Insurance",
        icon: "ri-add-line",
      },
      {
        path: "/insurance",
        label: "Insurances",
        icon: "ri-safe-line",
      },
      {
        path: "/insurance/expired",
        label: "Expired Insurances",
        icon: "ri-timer-line",
      },
    ],
  },
  {
    path: "/bulk-upload",
    label: "Bulk Upload",
    icon: "ri-upload-line",
  },
  {
    path: "/report",
    label: "Report",
    icon: "ri-file-chart-line",
  },
  {
    path: "/control-panel",
    label: "Control Panel",
    icon: "ri-admin-line",
    children: [
      {
        path: "/control-panel",
        label: "Settings",
        icon: "ri-settings-2-line",
      },
      {
        path: "/control-panel/scheduled-notifications",
        label: "Scheduled Notifications",
        icon: "ri-send-ins-line",
      },
      {
        path: "/control-panel/email-template",
        label: "Email Template Manager",
        icon: "ri-mail-settings-line",
      },
    ],
  },
];

export default SIDEBAR_MENU_ITEMS;
