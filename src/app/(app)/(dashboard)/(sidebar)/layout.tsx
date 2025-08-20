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
          "--sidebar-width": "15.125rem", // 242px
          "--sidebar-width-mobile": "20rem",
          "--header-height": "68px",
          "--header-height-mobile": "60px",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar
        sidebarProps={{
          variant: "sidebar",
        }}
      />
      <SidebarInset>
        <DashboardHeader />
        <main className="min-h-[calc(100%-var(--header-height-mobile)-4px)] md:min-h-[calc(100%-var(--header-height)-4px)] p-7">
          {children}
        </main>
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
