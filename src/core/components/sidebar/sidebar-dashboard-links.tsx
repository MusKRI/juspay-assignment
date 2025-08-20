"use client";

import Link from "next/link";
import { SVGProps, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  DefaultIcon,
  EcommerceIcon,
  ProjectsIcon,
  OnlineCoursesIcon,
  OrderListIcon,
} from "icons/sidebar-icons";
import { cn } from "@/lib/classes";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "ui/collapsible";
import { SidebarLink } from "@/types/sidebar";

const links: SidebarLink[] = [
  {
    title: "Default",
    url: "/",
    icon: DefaultIcon,
  },
  {
    title: "Order List",
    url: "/order-list",
    icon: OrderListIcon,
  },
  {
    title: "eCommerce",
    url: "#",
    icon: EcommerceIcon,
    subItems: [
      {
        title: "Shop",
        url: "#",
      },
    ],
  },
  {
    title: "Projects",
    url: "#",
    icon: ProjectsIcon,
    subItems: [
      {
        title: "Project 1",
        url: "#",
      },
    ],
  },
  {
    title: "Online Courses",
    url: "#",
    icon: OnlineCoursesIcon,
    subItems: [
      {
        title: "Course 1",
        url: "#",
      },
    ],
  },
];

export function SidebarDashboardLinks() {
  const pathname = usePathname();

  const parsedLinks = useMemo(() => {
    return links.map((link) => {
      const isActive = pathname === link.url;
      const subItems = link.subItems?.map((subItem) => {
        const isActiveSubItem = pathname === subItem.url;
        return {
          ...subItem,
          active: isActiveSubItem,
        };
      });

      return {
        ...link,
        active: isActive,
        subItems,
      };
    });
  }, [pathname]);

  return (
    <SidebarGroup className="px-4">
      <SidebarGroupLabel className="text-sm text-sidebar-foreground/40 font-normal">
        Dashboards
      </SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {parsedLinks.map((link) => {
            const hasChildren = link.subItems && link.subItems.length > 0;
            const subItems = hasChildren ? link.subItems : [];

            if (hasChildren) {
              return (
                <Collapsible
                  key={link.title}
                  asChild
                  defaultOpen={link.active}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={link.title}
                        className="cursor-pointer"
                      >
                        <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-sidebar-foreground/40" />
                        {link.icon && <link.icon />}
                        <span className="text-sm">{link.title}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="border-l-0 px-0">
                        {subItems?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className={cn(
                                "pl-[calc(0.625rem+32px)]",
                                subItem?.active && "bg-accent"
                              )}
                            >
                              <Link href={subItem.url} className="relative">
                                <span
                                  style={{
                                    willChange: subItem.active
                                      ? "transform,opacity,scale"
                                      : "auto",
                                  }}
                                  className={cn(
                                    "absolute left-0 h-[calc(100%-0.8rem)] w-[4px] rounded-full bg-foreground [transition:opacity_250ms,scale_250ms,translate_250ms] [transition-timing-function:cubic-bezier(.075,.82,.165,1)]",
                                    subItem?.active
                                      ? "opacity-100 scale-100 translate-x-0"
                                      : "opacity-0 scale-98 -translate-x-full"
                                  )}
                                />
                                <span className="text-sm">{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            }

            return (
              <SidebarMenuButton
                key={link.title}
                tooltip={link.title}
                className={cn(
                  "group relative p-0",
                  link?.active && "bg-accent"
                )}
              >
                <Link
                  key={link.title}
                  href={link.url}
                  className={cn(
                    "relative flex items-center ease-out w-full h-full p-2 rounded-md"
                  )}
                >
                  <span
                    style={{
                      willChange: link.active
                        ? "transform,opacity,scale"
                        : "auto",
                    }}
                    className={cn(
                      "absolute left-0 h-[calc(100%-0.8rem)] w-[4px] rounded-full bg-primary [transition:opacity_250ms,scale_250ms,translate_250ms] [transition-timing-function:cubic-bezier(.075,.82,.165,1)]",
                      link?.active
                        ? "opacity-100 scale-100 translate-x-0"
                        : "opacity-0 scale-98 -translate-x-full"
                    )}
                  />
                  <span className="inline-block size-6" />
                  <span className="w-full flex items-center gap-2">
                    <span className={cn("w-full flex items-center gap-2")}>
                      {link.icon && <link.icon />}
                      <span>{link.title}</span>
                    </span>
                  </span>
                </Link>
              </SidebarMenuButton>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
