import { Logo } from "@/assets";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { RiUserLine } from "@remixicon/react";
import { Link } from "react-router-dom";

export function AppHeader() {
  return (
    <header className="bg-background/80 border-border sticky top-0 z-50 flex w-full items-center border-b backdrop-blur-xs">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Link to="/" className="flex h-full items-center gap-2 py-2">
          <img src={Logo} alt="Logo" className="h-full" />

          <span className="hidden truncate font-semibold sm:inline-block">
            Insurance Management System
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" className="h-full py-1" />}
            >
              <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-full">
                <RiUserLine className="text-muted-foreground size-4" />
              </div>
              <div className="hidden flex-col items-start text-left sm:flex">
                <span className="text-sm leading-tight font-medium">
                  Sandeep Shrestha
                </span>
                <span className="text-muted-foreground text-xs leading-tight">
                  sandeep.shrestha@gmail.com
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem render={<Link to="/control-panel" />}>
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive">
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
