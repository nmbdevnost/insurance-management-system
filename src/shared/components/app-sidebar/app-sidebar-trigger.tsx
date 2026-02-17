import { cn } from "@/shared/lib/utils";
import { RiArrowRightSLine } from "@remixicon/react";
import { SidebarTrigger } from "../ui/sidebar";

const AppSidebarTrigger = ({ className }: { className?: string }) => {
  return (
    <SidebarTrigger
      className={cn(
        "bg-sidebar-accent! text-sidebar-accent-foreground! group absolute top-1/2 -right-3 z-50 -translate-y-1/2 transform rounded-full hover:scale-110",
        className
      )}
    >
      <RiArrowRightSLine className="size-5 transition-transform group-data-[open=true]:rotate-180" />
    </SidebarTrigger>
  );
};

export default AppSidebarTrigger;
