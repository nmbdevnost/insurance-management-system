import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import type { MenuItem } from "@/lib/types/menu";
import { cn } from "@/lib/utils";
import * as React from "react";
import { NavItem } from "./nav-item";

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
        path: "/insurance/policies",
        label: "Policies",
        icon: "ri-file-list-line",
      },
      {
        path: "/insurance/claims",
        label: "Claims",
        icon: "ri-file-list-line",
      },
    ],
  },
  {
    label: "More",
    icon: "ri-settings-line",
    children: [
      {
        path: "/users",
        label: "Users",
        icon: "ri-user-line",
      },
      {
        path: "/settings",
        label: "Settings",
        icon: "ri-settings-line",
      },
    ],
  },
];

export interface AppSidebarProps
  extends Omit<
    React.ComponentProps<typeof Sidebar>,
    "variant" | "collapsible"
  > {
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}

export function AppSidebar({
  variant = "sidebar",
  collapsible = "icon",
  className,
  ...props
}: AppSidebarProps) {
  const { isMobile } = useSidebar();

  return (
    <Sidebar
      variant={variant}
      collapsible={collapsible}
      className={cn(
        "top-(--header-height)! h-[calc(100svh-var(--header-height))]!",
        className
      )}
      {...props}
    >
      {isMobile && (
        <SidebarHeader className="bg-background h-(--header-height)! flex justify-center">
          <span className="text-lg font-semibold text-primary">NMB</span>
        </SidebarHeader>
      )}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {SIDEBAR_MENU_ITEMS.map((item) => (
                <NavItem key={getItemKey(item)} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

function getItemKey(item: MenuItem): string {
  return item.path ?? item.label;
}
