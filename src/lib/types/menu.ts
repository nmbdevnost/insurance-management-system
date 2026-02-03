/**
 * A menu item in the sidebar.
 * - If it has a `path`, it's a link.
 * - If it has `children`, it becomes a collapsible (when sidebar is expanded)
 *   or a dropdown (when sidebar is collapsed/icon mode).
 * - `icon` is a Remix Icon class name (e.g. "ri-dashboard-line").
 */
export interface MenuItem {
  label: string
  icon?: string
  path?: string
  children?: MenuItem[]
}

/** Type guard: check if item is a link (has path, no children). */
export function isLinkItem(item: MenuItem): boolean {
  return Boolean(item.path && !item.children)
}

/** Type guard: check if item has children. */
export function hasChildren(item: MenuItem): boolean {
  return Boolean(item.children && item.children.length > 0)
}

/** Check if any descendant (child or nested) has an active path for the given pathname. */
export function hasActiveChild(children: MenuItem[], pathname: string): boolean {
  return children.some((child) => {
    if (child.path) {
      if (child.path === "/") return pathname === "/"
      if (pathname === child.path || pathname.startsWith(child.path + "/"))
        return true
    }
    if (child.children?.length) {
      return hasActiveChild(child.children, pathname)
    }
    return false
  })
}
