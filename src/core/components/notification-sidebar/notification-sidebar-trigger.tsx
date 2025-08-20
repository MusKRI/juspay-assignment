"use client";

import { Button } from "ui/button";
import { useCallback } from "react";

import { useRightSidebar } from "@/core/hooks/use-right-sidebar";

import { BellIcon } from "icons/dashboard-header-icons";

export function NotificationSidebarTrigger() {
  const { setParams, rs, type } = useRightSidebar();

  const toggleSidebar = useCallback(() => {
    if (rs && type === "notification") {
      setParams({ rs: null, type: null });
    } else {
      setParams({ rs: true, type: "notification" });
    }
  }, [rs, type, setParams]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-7 cursor-pointer"
      onClick={() => {
        toggleSidebar();
      }}
    >
      <BellIcon className="size-5" />
      <span className="sr-only">Toggle Notification Sidebar</span>
    </Button>
  );
}
