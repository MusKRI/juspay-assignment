"use client";

import { useMediaQuery } from "@/core/hooks/use-media-query";
import { useIsMobile } from "@/core/hooks/use-mobile";
import { useRightSidebar } from "@/core/hooks/use-right-sidebar";
import { cn } from "@/lib/classes";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "ui/sheet";
import { SIDEBAR_WIDTH_MOBILE } from "ui/sidebar";

export function NotificationSidebarWrapper({
  side = "right",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  mobileSidebarExternalClasses,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
  mobileSidebarExternalClasses?: string;
}) {
  // const isMobile = useIsMobile();
  const isMobile = useMediaQuery("(max-width: 1200px)");
  const { rs, type, setParams } = useRightSidebar();

  const isOpen = Boolean(!!rs && type === "notification");

  const state = isOpen ? "expanded" : "collapsed";

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setParams({ rs: null, type: null });
    }
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={handleOpenChange} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className={cn(
            "bg-sidebar text-sidebar-foreground w-(--notification-sidebar-width) p-0 [&>button]:hidden"
          )}
          style={
            {
              "--notification-sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div
            className="flex h-full w-full flex-col px-4 py-5"
            data-slot="mobile-sidebar-inner"
          >
            {children}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block [--notification-sidebar-width:17.5rem] md:[--notification-sidebar-width:20rem]"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--notification-sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-50 hidden h-svh w-(--notification-sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--notification-sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--notification-sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
