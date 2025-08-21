import ByeWindAvatar from "@/assets/avatars/byewind.png";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "ui/avatar";

type SidebarHeaderProps = {
  sidebarHeaderProps?: React.ComponentProps<typeof SidebarHeader>;
};

export function DashboardSidebarHeader({
  sidebarHeaderProps = {},
}: SidebarHeaderProps) {
  const user = {
    name: "ByeWind",
  };

  return (
    <SidebarHeader {...sidebarHeaderProps} className="p-1">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="data-[slot=sidebar-menu-button]:!p-1.5"
          >
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={ByeWindAvatar.src} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{user.name}</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
