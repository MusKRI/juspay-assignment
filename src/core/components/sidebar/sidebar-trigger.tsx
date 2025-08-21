"use client";

import { Button } from "ui/button";
import { useSidebar } from "ui/sidebar";

import { SidebarIcon } from "icons/dashboard-header-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "ui/tooltip";
import { cn } from "@/lib/classes";
import { useRightSidebar } from "@/core/hooks/use-right-sidebar";

export function SidebarTrigger() {
  const { toggleSidebar, open } = useSidebar();
  const { setParams, rs, type } = useRightSidebar();

  const tooltipContent = open ? "Close Sidebar" : "Open Sidebar";

  const isRightSidebarOpen = Boolean(!!rs && !!type);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 cursor-pointer"
          onClick={() => {
            toggleSidebar();
            if (isRightSidebarOpen) {
              setParams({ rs: null, type: null });
            }
          }}
        >
          <SidebarIcon
            className={cn(
              "size-5 [transition:fill-opacity_0.2s_ease-in-out]",
              open
                ? "[&_.sidebar-icon-path]:[fill-opacity:0.4]"
                : "[&_.sidebar-icon-path]:[fill-opacity:0.1]"
            )}
          />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  );
}
