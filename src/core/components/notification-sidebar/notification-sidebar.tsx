import { SidebarContent } from "../ui/sidebar";
import { Activities } from "./activities";
import { Contacts } from "./contacts";
import { NotificationSidebarWrapper } from "./notification-sidebar-wrapper";
import { Notifications } from "./notifications";

type NotificationSidebarProps = {
  sidebarProps: React.ComponentProps<typeof NotificationSidebarWrapper>;
};

export function NotificationSidebar({
  sidebarProps,
}: NotificationSidebarProps) {
  return (
    <NotificationSidebarWrapper
    className="px-4 py-5"
      {...sidebarProps}
      mobileSidebarExternalClasses={`px-4 py-5`}
    >
      <SidebarContent className="flex flex-col gap-6">
        <Notifications />
        <Activities />
        <Contacts />
      </SidebarContent>
    </NotificationSidebarWrapper>
  );
}
