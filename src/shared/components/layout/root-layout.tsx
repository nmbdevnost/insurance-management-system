import { AppSidebar } from "@/shared/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import AppSidebarTrigger from "../app-sidebar/app-sidebar-trigger";
import { AppHeader } from "./app-header";

const RootLayout = () => {
  return (
    <div className="relative h-svh overflow-y-hidden [--header-height:calc(var(--spacing)*14)]">
      <SidebarProvider className="flex h-full flex-col overflow-y-auto">
        <AppSidebarTrigger className="absolute -left-2.5 md:pointer-events-none md:hidden" />

        <AppHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <Outlet />
              <ScrollRestoration />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default RootLayout;
