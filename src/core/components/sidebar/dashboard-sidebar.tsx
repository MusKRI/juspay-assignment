"use client";

import { Sidebar, SidebarContent } from "ui/sidebar";

import { DashboardSidebarHeader } from "./dashboard-sidebar-header";
import { SidebarDashboardLinks } from "./sidebar-dashboard-links";
import { SidebarPagesLinks } from "./sidebar-pages-links";

type DashboardSidebarProps = {
  sidebarProps: React.ComponentProps<typeof Sidebar>;
};

export function DashboardSidebar({ sidebarProps }: DashboardSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...sidebarProps}>
      <DashboardSidebarHeader />
      <SidebarContent className="pt-4">
        <SidebarDashboardLinks />
        <SidebarPagesLinks />
      </SidebarContent>
    </Sidebar>
  );
}
