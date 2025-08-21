"use client";

import { Sidebar, SidebarContent } from "ui/sidebar";

import { DashboardSidebarHeader } from "./dashboard-sidebar-header";
import { SidebarDashboardLinks } from "./sidebar-dashboard-links";
import { SidebarPagesLinks } from "./sidebar-pages-links";
import { SidebarFavorites } from "./sidebar-favorites";
import { cn } from "@/lib/classes";

type DashboardSidebarProps = {
  sidebarProps: React.ComponentProps<typeof Sidebar>;
};

export function DashboardSidebar({ sidebarProps }: DashboardSidebarProps) {
  return (
    <Sidebar
      collapsible="offcanvas"
      className={cn(
        `px-4 pt-5 [&_[data-slot="sidebar-inner"]]:flex [&_[data-slot="sidebar-inner"]]:flex-col [&_[data-slot="sidebar-inner"]]:gap-4`
      )}
      {...sidebarProps}
    >
      <DashboardSidebarHeader />
      <SidebarFavorites />
      <SidebarContent>
        <SidebarDashboardLinks />
        <SidebarPagesLinks />
      </SidebarContent>
    </Sidebar>
  );
}
