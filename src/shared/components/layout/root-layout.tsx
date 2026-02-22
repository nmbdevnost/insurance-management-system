import { AppSidebar } from "@/shared/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import AppSidebarTrigger from "../app-sidebar/app-sidebar-trigger";
import { AppHeader } from "./app-header";

const RootLayout = () => {
  return (
    <SidebarProvider className="flex h-full flex-col">
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

      <ScrollRestoration />
    </SidebarProvider>
  );
};

export default RootLayout;
