import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { MenuItem } from "@/lib/types/menu";
import { hasActiveChild, hasChildren, isLinkItem } from "@/lib/types/menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import { MenuIcon } from "./menu-icon";

interface CollapsibleNavItemProps {
  item: MenuItem;
}

export function CollapsibleNavItem({ item }: CollapsibleNavItemProps) {
  const children = item.children ?? [];
  const { pathname } = useLocation();
  const isChildActive = hasActiveChild(children, pathname);
  const [expanded, setExpanded] = useState(isChildActive);

  return (
    <SidebarMenuItem>
      <Collapsible
        open={expanded}
        onOpenChange={setExpanded}
        className="group/collapsible"
      >
        <SidebarMenuButton
          isActive={expanded || isChildActive}
          render={
            <CollapsibleTrigger className="flex w-full items-center gap-2 cursor-pointer transition-colors duration-150">
              <MenuIcon icon={item.icon} />
              <span className="flex-1 truncate">{item.label}</span>
              <i
                className="ri-arrow-down-s-line ml-auto shrink-0 transition-transform group-data-open/collapsible:rotate-180"
                aria-hidden
              />
            </CollapsibleTrigger>
          }
        />
        <CollapsibleContent>
          <SidebarMenuSub className="pr-0 mr-0">
            {children.map((child) => (
              <CollapsibleSubItem
                key={getItemKey(child)}
                item={child}
                depth={1}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

function CollapsibleSubItem({
  item,
  depth,
}: {
  item: MenuItem;
  depth: number;
}) {
  // Link item: has path, no children
  if (isLinkItem(item)) {
    return <SubLinkItem item={item} />;
  }

  // Item with children: nested collapsible
  if (hasChildren(item)) {
    return <NestedCollapsibleItem item={item} depth={depth} />;
  }

  return null;
}

function SubLinkItem({ item }: { item: MenuItem }) {
  const path = item.path ?? "/";
  const match = useMatch({ path, end: true });
  const isActive = Boolean(match);

  return (
    <SidebarMenuSubItem>
      <SidebarMenuButton
        isActive={isActive}
        className="cursor-pointer transition-colors duration-150"
        render={<NavLink to={path} end={path === "/"} />}
      >
        <MenuIcon icon={item.icon} />
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuSubItem>
  );
}

function NestedCollapsibleItem({
  item,
  depth,
}: {
  item: MenuItem;
  depth: number;
}) {
  const children = item.children ?? [];
  const { pathname } = useLocation();
  const isChildActive = hasActiveChild(children, pathname);
  const [expanded, setExpanded] = useState(isChildActive);
  const groupClass = `group/collapsible-${depth}`;
  const chevronClass = `group-data-open/collapsible-${depth}:rotate-180`;

  return (
    <SidebarMenuSubItem>
      <Collapsible
        open={expanded}
        onOpenChange={setExpanded}
        className={groupClass}
      >
        <SidebarMenuButton
          isActive={expanded || isChildActive}
          render={
            <CollapsibleTrigger className="flex w-full cursor-pointer items-center gap-2 transition-colors duration-150">
              <MenuIcon icon={item.icon} />
              <span className="flex-1 truncate">{item.label}</span>
              {depth < 5 && (
                <i
                  className={cn(
                    "ri-arrow-down-s-line ml-auto shrink-0 transition-transform",
                    chevronClass,
                  )}
                  aria-hidden
                />
              )}
            </CollapsibleTrigger>
          }
        />
        <CollapsibleContent>
          <SidebarMenuSub className="pr-0 mr-0">
            {children.map((child) => (
              <CollapsibleSubItem
                key={getItemKey(child)}
                item={child}
                depth={depth + 1}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuSubItem>
  );
}

function getItemKey(child: MenuItem): string {
  return child.path ?? child.label;
}
