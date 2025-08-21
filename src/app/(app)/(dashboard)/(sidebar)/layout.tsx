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
          "--sidebar-width": "13.25rem", // 242px
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
        <main className="min-h-[calc(100vh-var(--header-height-mobile))] lg:min-h-[calc(100vh-var(--header-height))] p-4 lg:p-7 overflow-auto">
          <div className="min-w-0 w-full max-w-full">{children}</div>
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
