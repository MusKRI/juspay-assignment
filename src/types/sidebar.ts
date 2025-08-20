import { SVGProps } from "react";

export type SidebarLink = {
  title: string;
  url: string;
  icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
  subItems?: SidebarLink[];
  active?: boolean;
};
