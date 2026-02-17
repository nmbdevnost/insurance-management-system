import { AppSidebar } from "@/shared/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./app-header";
import AppSidebarTrigger from "../app-sidebar/app-sidebar-trigger";

export function AppLayout() {
  return (
    <div className="min-h-svh [--header-height:calc(var(--spacing)*14)]">
      <SidebarProvider className="flex flex-col">
        <AppSidebarTrigger className="absolute -left-2.5 md:pointer-events-none md:hidden" />

        <AppHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <Outlet />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
