import { useSidebar } from "@/shared/components/ui/sidebar";
import type { MenuItem } from "@/shared/lib/types/menu";
import { hasChildren, isLinkItem } from "@/shared/lib/types/menu";
import { CollapsibleNavItem } from "./collapsible-nav-item";
import { DropdownNavItem } from "./dropdown-nav-item";
import { LinkNavItem } from "./link-nav-item";

export interface NavItemProps {
  item: MenuItem;
  tooltip?: string;
}

export function NavItem({ item, tooltip }: NavItemProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Link item: has path, no children
  if (isLinkItem(item)) {
    return <LinkNavItem item={item} />;
  }

  // Item with children: render as dropdown if collapsed, collapsible if expanded
  if (hasChildren(item)) {
    if (isCollapsed) {
      return <DropdownNavItem item={item} tooltip={tooltip} />;
    }
    return <CollapsibleNavItem item={item} />;
  }

  return null;
}

export { CollapsibleNavItem } from "./collapsible-nav-item";
export { DropdownNavItem } from "./dropdown-nav-item";
export { LinkNavItem } from "./link-nav-item";
