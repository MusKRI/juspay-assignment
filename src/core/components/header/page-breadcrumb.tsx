"use client";

import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import * as m from "motion/react-client";

import { BreadcrumbSeparatorIcon } from "icons/dashboard-header-icons";

type BreadcrumbItem = {
  label: string;
  href: string;
  breadcrumb: string[];
};

const pages = [
  {
    label: "Default",
    href: "/",
    breadcrumb: ["Default"],
  },
  {
    label: "Order List",
    href: "/order-list",
    breadcrumb: ["Order List"],
  },
] satisfies BreadcrumbItem[];

export function PageBreadcrumb() {
  const pathname = usePathname();

  const currentPage = useMemo(() => {
    const page = pages.find((page) => page.href === pathname);
    return page;
  }, [pathname]);

  if (!currentPage) return null;

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm text-foreground/40">Dashboards</span>
      <BreadcrumbSeparatorIcon />
      {currentPage.breadcrumb.map((breadcrumb, index) => {
        return (
          <m.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            key={`${breadcrumb}-${index}`}
          >
            <span className="text-sm text-foreground">{breadcrumb}</span>
            {index < currentPage.breadcrumb.length - 1 && (
              <BreadcrumbSeparatorIcon />
            )}
          </m.span>
        );
      })}
    </div>
  );
}
