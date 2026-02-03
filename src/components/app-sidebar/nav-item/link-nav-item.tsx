import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import type { MenuItem } from "@/lib/types/menu";
import { NavLink, useMatch } from "react-router-dom";
import { MenuIcon } from "./menu-icon";

interface LinkNavItemProps {
  item: MenuItem;
}

export function LinkNavItem({ item }: LinkNavItemProps) {
  const path = item.path ?? "/";
  const match = useMatch({ path, end: path === "/" });
  const isActive = Boolean(match);

  return (
    <SidebarMenuItem>
      <NavLink to={path} end={path === "/"}>
        <SidebarMenuButton
          className="cursor-pointer"
          tooltip={item.label}
          isActive={isActive}
        >
          <MenuIcon icon={item.icon} />
          <span>{item.label}</span>
        </SidebarMenuButton>
      </NavLink>
    </SidebarMenuItem>
  );
}
