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
];

export default SIDEBAR_MENU_ITEMS;
