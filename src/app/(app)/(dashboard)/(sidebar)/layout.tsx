import { cookies } from "next/headers";

import { DashboardHeader } from "@/core/components/header";
import { DashboardSidebar } from "@/core/components/sidebar";
import { SidebarInset, SidebarProvider } from "ui/sidebar";

import { NotificationSidebar } from "@/core/components/notification-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen =
    cookieStore.get("sidebar_state")?.value === "true" || true;

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          "--sidebar-width": "13.25rem", // 212px
          "--sidebar-width-mobile": "20rem",
          "--header-height": "68px",
          "--header-height-mobile": "60px",
        } as React.CSSProperties
      }
      className={`[&_[data-slot="mobile-sidebar-inner"]]:px-4 [&_[data-slot="mobile-sidebar-inner"]]:py-5`}
    >
      <DashboardSidebar
        sidebarProps={{
          variant: "sidebar",
        }}
      />
      <SidebarInset>
        <DashboardHeader />
        {children}
      </SidebarInset>
      <>
        <NotificationSidebar
          sidebarProps={{
            variant: "sidebar",
          }}
        />
      </>
    </SidebarProvider>
  );
}
