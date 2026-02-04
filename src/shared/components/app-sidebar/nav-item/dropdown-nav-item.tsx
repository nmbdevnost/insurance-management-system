import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import type { MenuItem } from "@/shared/lib/types/menu";
import { hasActiveChild, hasChildren } from "@/shared/lib/types/menu";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import { MenuIcon } from "./menu-icon";

interface DropdownNavItemProps {
  item: MenuItem;
  tooltip?: string;
}

export function DropdownNavItem({ item, tooltip }: DropdownNavItemProps) {
  const children = item.children ?? [];
  const { pathname } = useLocation();
  const isChildActive = hasActiveChild(children, pathname);
  const [open, setOpen] = useState(false);

  return (
    <SidebarMenuItem>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          render={
            <SidebarMenuButton
              isActive={open || isChildActive}
              className="cursor-pointer"
              tooltip={tooltip ?? item.label}
            />
          }
        >
          <MenuIcon icon={item.icon} />
          <span>{item.label}</span>
          <i
            className="ri-arrow-right-s-line ml-auto size-4 -rotate-90"
            aria-hidden
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-popper-anchor-width] min-w-48 rounded-lg"
          side="right"
          align="start"
          sideOffset={10}
        >
          {children.map((child) => (
            <DropdownNavChild key={getItemKey(child)} item={child} />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}

function DropdownNavLinkItem({ item }: { item: MenuItem }) {
  const path = item.path ?? "/";
  const match = useMatch({ path, end: path === "/" });
  const isActive = Boolean(match);

  return (
    <DropdownMenuItem
      className={cn(
        "flex cursor-pointer items-center gap-2 [&_svg]:size-4 [&_svg]:shrink-0",
        "transition-colors duration-150",
        "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
      )}
      data-active={isActive}
      render={<NavLink to={path} end={path === "/"} />}
    >
      <MenuIcon icon={item.icon} />
      {item.label}
    </DropdownMenuItem>
  );
}

function DropdownNavChild({ item }: { item: MenuItem }) {
  // Link item: has path, no children
  if (item.path && !hasChildren(item)) {
    return <DropdownNavLinkItem item={item} />;
  }

  // Item with children: render as submenu
  if (hasChildren(item)) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="gap-2 transition-colors duration-150 [&_i]:size-4 [&_i]:shrink-0 [&_svg]:size-4 [&_svg]:shrink-0">
          <MenuIcon icon={item.icon} />
          {item.label}
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="rounded-lg">
          {item.children!.map((child) => (
            <DropdownNavChild key={getItemKey(child)} item={child} />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    );
  }

  return null;
}

function getItemKey(child: MenuItem): string {
  return child.path ?? child.label;
}
