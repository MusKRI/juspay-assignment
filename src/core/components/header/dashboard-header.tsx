// import { SidebarTrigger } from "../sidebar/sidebar-trigger";
import { NotificationSidebarTrigger } from "../notification-sidebar/notification-sidebar-trigger";
import { PageBreadcrumb } from "./page-breadcrumb";
import { StarCurrentPage } from "./star-current-page";
import { LightDarkSwitcher } from "./light-dark-switcher";
import { CommandMenu } from "../cmdk";
import { HistoryTrigger } from "./history-trigger";
import { SidebarTrigger } from "../sidebar/sidebar-trigger";
// import { SidebarTrigger } from "../ui/sidebar";

export function DashboardHeader() {
  return (
    <div className="border-b sticky top-0 bg-background z-40">
      <div className="relative h-(--header-height-mobile) md:h-(--header-height) flex items-center px-3 md:px-7 py-5">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <StarCurrentPage />
            <PageBreadcrumb />
          </div>
          <div className="flex items-center gap-2 md:gap-5">
            <CommandMenu />
            <div className="flex items-center gap-2">
              <LightDarkSwitcher />
              <HistoryTrigger />
              <NotificationSidebarTrigger />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
