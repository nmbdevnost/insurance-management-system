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
import SIDEBAR_MENU_ITEMS from "@/lib/constants/sidebar-menu-items";
import type { MenuItem } from "@/lib/types/menu";
import { cn } from "@/lib/utils";
import { RiCloseLine } from "@remixicon/react";
import * as React from "react";
import { Button } from "../ui/button";
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
  const { isMobile, toggleSidebar } = useSidebar();

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
          <span className="text-primary text-lg font-semibold">NMB</span>

          <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="icon"
            className="text-foreground"
          >
            <RiCloseLine />
          </Button>
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
