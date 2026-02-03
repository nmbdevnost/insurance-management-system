import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { RiUserLine } from "@remixicon/react";
import { Link } from "react-router-dom";

export function AppHeader() {
  return (
    <header className="bg-background border-border sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 md:flex" />
        <Link to="/" className="flex items-center gap-1">
          <span className="text-primary">NMB</span>
          <span className="hidden truncate sm:inline-block">
            Insurance Management System
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" className="h-full py-1" />}
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                <RiUserLine className="size-4 text-muted-foreground" />
              </div>
              <div className="hidden flex-col items-start text-left sm:flex">
                <span className="text-sm font-medium leading-tight">
                  Sandeep Shrestha
                </span>
                <span className="text-xs text-muted-foreground leading-tight">
                  sandeep.shrestha@gmail.com
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="text-destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
