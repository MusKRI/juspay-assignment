"use client";

import { Button } from "ui/button";
import { useSidebar } from "ui/sidebar";

import { SidebarIcon } from "icons/dashboard-header-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "ui/tooltip";
import { cn } from "@/lib/classes";

export function SidebarTrigger() {
  const { toggleSidebar, open } = useSidebar();

  const tooltipContent = open ? "Close Sidebar" : "Open Sidebar";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 cursor-pointer"
          onClick={() => {
            toggleSidebar();
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
