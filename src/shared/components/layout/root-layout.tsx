import { AppSidebar } from "@/shared/components/app-sidebar";
import {
  SIDEBAR_COOKIE_NAME,
  SidebarInset,
  SidebarProvider,
} from "@/shared/components/ui/sidebar";
import { getCookie } from "@/shared/lib/utils/cookie";
import { Outlet, ScrollRestoration } from "react-router-dom";
import AppSidebarTrigger from "../app-sidebar/app-sidebar-trigger";
import { AppHeader } from "./app-header";

const RootLayout = () => {
  const sidebarCookieState = getCookie(SIDEBAR_COOKIE_NAME);
  const initialOpen = sidebarCookieState === "true";

  return (
    <SidebarProvider
      defaultOpen={initialOpen}
      className="flex h-screen flex-col overflow-y-auto"
    >
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
