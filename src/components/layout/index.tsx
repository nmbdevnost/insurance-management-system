import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "./app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function AppLayout() {
  return (
    <div className="min-h-svh [--header-height:calc(var(--spacing)*14)]">
      <SidebarProvider className="flex flex-col">
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
