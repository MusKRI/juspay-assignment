"use client";

import { Button } from "ui/button";
import { useCallback } from "react";

import { useRightSidebar } from "@/core/hooks/use-right-sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "ui/tooltip";
import { BellIcon } from "icons/dashboard-header-icons";

export function NotificationSidebarTrigger() {
  const { setParams, rs, type } = useRightSidebar();

  const handleToggleSidebar = useCallback(() => {
    if (rs && type === "notification") {
      setParams({ rs: null, type: null });
    } else {
      setParams({ rs: true, type: "notification" });
    }
  }, [rs, type, setParams]);

  const tooltipContent =
    rs && type === "notification"
      ? "Close Notifications"
      : "Open Notifications";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 cursor-pointer"
          onClick={() => {
            handleToggleSidebar();
          }}
        >
          <BellIcon className="size-5" />
          <span className="sr-only">Notifications</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  );
}
