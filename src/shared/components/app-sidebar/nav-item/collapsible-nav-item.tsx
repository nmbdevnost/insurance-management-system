import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/shared/components/ui/sidebar";
import type { MenuItem } from "@/shared/lib/types/menu";
import {
  hasActiveChild,
  hasChildren,
  isLinkItem,
} from "@/shared/lib/types/menu";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import { MenuIcon } from "./menu-icon";

interface CollapsibleNavItemProps {
  item: MenuItem;
}

const GROUP_CLASSES: Record<number, { group: string; chevron: string }> = {
  1: {
    group: "group/collapsible-1",
    chevron: "group-data-open/collapsible-1:rotate-180",
  },
  2: {
    group: "group/collapsible-2",
    chevron: "group-data-open/collapsible-2:rotate-180",
  },
  3: {
    group: "group/collapsible-3",
    chevron: "group-data-open/collapsible-3:rotate-180",
  },
  4: {
    group: "group/collapsible-4",
    chevron: "group-data-open/collapsible-4:rotate-180",
  },
  5: {
    group: "group/collapsible-5",
    chevron: "group-data-open/collapsible-5:rotate-180",
  },
};

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
          data-open={expanded}
          isActive={isChildActive}
          render={
            <CollapsibleTrigger className="data-open:bg-sidebar-accent/50 flex w-full cursor-pointer items-center gap-2 transition-colors duration-150">
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
          <SidebarMenuSub className="mr-0 pr-0">
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

  const { group: groupClass, chevron: chevronClass } =
    GROUP_CLASSES[depth] ?? GROUP_CLASSES[1];

  return (
    <SidebarMenuSubItem>
      <Collapsible
        open={expanded}
        onOpenChange={setExpanded}
        className={groupClass}
      >
        <SidebarMenuButton
          isActive={isChildActive}
          render={
            <CollapsibleTrigger
              data-open={expanded}
              className="data-open:bg-sidebar-accent/50 flex w-full cursor-pointer items-center gap-2 transition-colors duration-150"
            >
              <MenuIcon icon={item.icon} />
              <span className="flex-1 truncate">{item.label}</span>
              {depth < 5 && (
                <i
                  className={cn(
                    "ri-arrow-down-s-line ml-auto shrink-0 transition-transform",
                    chevronClass
                  )}
                  aria-hidden
                />
              )}
            </CollapsibleTrigger>
          }
        />
        <CollapsibleContent>
          <SidebarMenuSub className="mr-0 pr-0">
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
