import { Logo } from "@/assets";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import SIDEBAR_MENU_ITEMS from "@/shared/lib/constants/sidebar-menu-items";
import type { MenuItem } from "@/shared/lib/types/menu";
import { cn } from "@/shared/lib/utils";
import * as React from "react";
import AppSidebarTrigger from "./app-sidebar-trigger";
import { NavItem } from "./nav-item";

export interface AppSidebarProps extends Omit<
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
        <SidebarHeader className="bg-background flex h-(--header-height)! flex-row items-center justify-between">
          <div className="flex h-full items-center gap-2 overflow-hidden">
            <img src={Logo} className="h-full" />

            <span className="text-foreground line-clamp-2 text-base font-semibold">
              Insurance Management System
            </span>
          </div>
        </SidebarHeader>
      )}
      <SidebarContent>
        <AppSidebarTrigger />

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
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}

function getItemKey(item: MenuItem): string {
  return item.path ?? item.label;
}
