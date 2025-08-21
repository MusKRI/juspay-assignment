"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Lottie from "lottie-react";
import { useTheme } from "next-themes";

import {
  CommandIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowLeft,
} from "lucide-react";

import { cn } from "@/lib/classes";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "ui/command";

import fileDarkModeIcon from "@/assets/lottie-icons/file/dark-mode.json";
import fileLightModeIcon from "@/assets/lottie-icons/file/light-mode.json";
import { SearchIcon } from "icons/other-icons";

type ItemProps = {
  heading: string;
  group: {
    title: string;
    icon: React.ReactNode;
    slug: string;
    isNew?: boolean;
    ref: React.RefObject<any>;
    shortcut?: string;
  }[];
};

type CommandMenuItemProps = {
  shortcut?: string;
  icon: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAction: () => void;
  ref: React.RefObject<any>;
  children?: React.ReactNode;
  className?: string;
  searchValue?: string;
} & React.ComponentProps<typeof CommandItem>;

function CommandMenuItem({
  children,
  icon,
  shortcut,
  className,
  setIsOpen,
  ref,
  onAction,
  searchValue,
  ...props
}: CommandMenuItemProps) {
  const itemRef = useRef<any>(null);

  function setItemRef(node: HTMLDivElement | null) {
    itemRef.current = node;

    if (node && node.getAttribute("aria-selected") === "true") {
      ref.current?.goToAndPlay(0, true);
    }
  }

  useEffect(() => {
    if (!itemRef.current) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "aria-selected"
        ) {
          const isSelected =
            itemRef.current?.getAttribute("aria-selected") === "true";
          if (isSelected) {
            ref.current?.goToAndPlay(0, true);
          }
        }
      });
    });

    observer.observe(itemRef.current, {
      attributes: true,
      attributeFilter: ["aria-selected"],
    });

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (itemRef.current?.getAttribute("aria-selected") === "true") {
      ref.current?.goToAndPlay(0, true);
    }
  });

  useEffect(() => {
    if (!shortcut) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === shortcut && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(false);
        onAction();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  return (
    <CommandItem
      {...props}
      ref={setItemRef}
      onMouseEnter={() => ref.current?.goToAndPlay(0, true)}
      className={cn("cursor-pointer", className)}
    >
      <div className="flex items-center gap-2">
        <div className="opacity-70">{icon}</div>
        {children}
      </div>
      {shortcut && (
        <div className="flex gap-1 ml-auto">
          <div className="flex h-6 w-6 uppercase items-center text-xs font-semibold justify-center rounded-md bg-neutral-200 dark:bg-[#141414] text-neutral-400">
            <CommandIcon size={12} />
          </div>
          <div className="flex h-6 w-6 uppercase items-center text-xs font-semibold justify-center rounded-md bg-neutral-200 dark:bg-[#141414] text-neutral-400">
            {shortcut}
          </div>
        </div>
      )}
    </CommandItem>
  );
}

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const { resolvedTheme: theme } = useTheme();

  const componentRefs = useRef<{ [key: string]: any }>({});

  function getComponentRef(title: string) {
    if (!componentRefs.current[title]) {
      componentRefs.current[title] = { current: null };
    }

    return componentRefs.current[title];
  }

  const ITEMS: ItemProps[] = [
    {
      heading: "Dashboards",
      group: [
        {
          title: "Default",
          slug: "/",
          ref: getComponentRef("Default"),
          icon: (
            <Lottie
              lottieRef={getComponentRef("Default")}
              animationData={
                theme === "dark" ? fileDarkModeIcon : fileLightModeIcon
              }
              style={{ width: 22, height: 22 }}
              autoplay={false}
              loop={false}
            />
          ),
        },
        {
          title: "Order List",
          slug: "/order-list",
          ref: getComponentRef("Order List"),
          icon: (
            <Lottie
              lottieRef={getComponentRef("Order List")}
              animationData={
                theme === "dark" ? fileDarkModeIcon : fileLightModeIcon
              }
              style={{ width: 22, height: 22 }}
              autoplay={false}
              loop={false}
            />
          ),
        },
        {
          title: "Shop",
          slug: "#",
          ref: getComponentRef("Shop"),
          icon: (
            <Lottie
              lottieRef={getComponentRef("Shop")}
              animationData={
                theme === "dark" ? fileDarkModeIcon : fileLightModeIcon
              }
              style={{ width: 22, height: 22 }}
              autoplay={false}
              loop={false}
            />
          ),
        },
        {
          title: "Project 1",
          slug: "#",
          ref: getComponentRef("Project 1"),
          icon: (
            <Lottie
              lottieRef={getComponentRef("Project 1")}
              animationData={
                theme === "dark" ? fileDarkModeIcon : fileLightModeIcon
              }
              style={{ width: 22, height: 22 }}
              autoplay={false}
              loop={false}
            />
          ),
        },
        {
          title: "Course 1",
          slug: "#",
          ref: getComponentRef("Course 1"),
          icon: (
            <Lottie
              lottieRef={getComponentRef("Course 1")}
              animationData={
                theme === "dark" ? fileDarkModeIcon : fileLightModeIcon
              }
              style={{ width: 22, height: 22 }}
              autoplay={false}
              loop={false}
            />
          ),
        },
      ],
    },
    {
      heading: "Pages",
      group: [
        {
          title: "Overview",
          slug: "#",
          ref: getComponentRef("Overview"),
          icon: (
            <Lottie
              lottieRef={getComponentRef("Overview")}
              animationData={
                theme === "dark" ? fileDarkModeIcon : fileLightModeIcon
              }
              style={{ width: 22, height: 22 }}
              autoplay={false}
              loop={false}
            />
          ),
        },
        {
          title: "Projects",
          slug: "#",
          ref: getComponentRef("Projects"),
          icon: (
            <Lottie
              lottieRef={getComponentRef("Projects")}
              animationData={
                theme === "dark" ? fileDarkModeIcon : fileLightModeIcon
              }
              style={{ width: 22, height: 22 }}
              autoplay={false}
              loop={false}
            />
          ),
        },
        {
          title: "Campaigns",
          slug: "#",
          ref: getComponentRef("Campaigns"),
          icon: (
            <Lottie
              lottieRef={getComponentRef("Campaigns")}
              animationData={
                theme === "dark" ? fileDarkModeIcon : fileLightModeIcon
              }
              style={{ width: 22, height: 22 }}
              autoplay={false}
              loop={false}
            />
          ),
        },
        {
          title: "Documents",
          slug: "#",
          ref: getComponentRef("Documents"),
          icon: (
            <Lottie
              lottieRef={getComponentRef("Documents")}
              animationData={
                theme === "dark" ? fileDarkModeIcon : fileLightModeIcon
              }
              style={{ width: 22, height: 22 }}
              autoplay={false}
              loop={false}
            />
          ),
        },
        {
          title: "Followers",
          slug: "#",
          ref: getComponentRef("Followers"),
          icon: (
            <Lottie
              lottieRef={getComponentRef("Followers")}
              animationData={
                theme === "dark" ? fileDarkModeIcon : fileLightModeIcon
              }
              style={{ width: 22, height: 22 }}
              autoplay={false}
              loop={false}
            />
          ),
        },
      ],
    },
  ];

  const isApp = pathname === "/" || pathname.startsWith("/updates");
  const isHomePage = pathname === "/";
  const uiPage = pathname.startsWith("/ui");

  const category = isApp ? "App" : "Docs";

  let currentPage = "";
  let subCategory = "";

  if (uiPage) {
    const pathParts = pathname.split("/").filter(Boolean);

    if (pathParts.length >= 2) {
      const isComponentPage = ITEMS.some(
        (item) =>
          item.heading === "Components" &&
          item.group.some((group) => group.slug === pathname)
      );

      if (isComponentPage) {
        subCategory = "Components";
        currentPage = pathParts[1].replace(/-/g, " ");
      }

      if (pathParts[1] === "installation") {
        subCategory = "Installation";
        currentPage = pathParts[2] ? pathParts[2].replace(/-/g, " ") : "";
      }

      if (!isComponentPage && pathParts[1] !== "installation") {
        currentPage = pathParts[1].replace(/-/g, " ");
      }
    }
  }

  if (isHomePage) {
    currentPage = "Home";
  }

  if (!uiPage && !isHomePage) {
    currentPage = pathname.split("/")[1];
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "cursor-pointer group relative flex items-center justify-between gap-4 pl-2 md:pl-2.5 pr-2 py-1 border rounded-[12px] text-[13px] leading-none border-border/60 dark:border-border/50 min-w-0 md:min-w-[220px] w-full",
          "bg-foreground/10 dark:bg-white/10 ease-linear duration-150 outline-none dark:hover:border-white/10 focus-visible:ring-1 focus-visible:ring-neutral-300/80 dark:focus-visible:ring-neutral-800"
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 -top-[0.031em] h-px w-1/2 max-w-[1000px] -translate-x-1/4 -translate-y-1/2 bg-gradient-to-l from-transparent via-white/18 via-30% to-transparent"
        />
        <span className="flex items-center gap-2 font-[460] text-foreground/60">
          <SearchIcon />
          <span className="hidden md:block">Search</span>
        </span>
        <CommandMenuIcon />
      </button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="What do you need?" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <div className="space-y-1.5 pb-1.5 pt-1">
            {ITEMS.map(({ heading, group }) => (
              <CommandGroup key={heading} heading={heading}>
                {group.map(({ title, slug, icon, shortcut, ref }) => (
                  <CommandMenuItem
                    key={title}
                    icon={icon}
                    setIsOpen={setIsOpen}
                    onSelect={() => {
                      router.push(slug);
                      setIsOpen(false);
                    }}
                    ref={ref}
                    onAction={() => router.push(slug)}
                    shortcut={shortcut}
                  >
                    {title}
                  </CommandMenuItem>
                ))}
              </CommandGroup>
            ))}
          </div>
        </CommandList>
        <div className="flex items-center justify-between border-t border-border bg-background p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="p-1 rounded-md text-neutral-500 bg-neutral-200 dark:bg-[#141414]">
                  <ArrowUpIcon size={16} />
                </div>
                <div className="p-1 rounded-md text-neutral-500 bg-neutral-200 dark:bg-[#141414]">
                  <ArrowDownIcon size={16} />
                </div>
              </div>
              <span className="text-sm">Navigate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-neutral-200 dark:bg-[#141414]">
                <ArrowLeft className="text-neutral-500 size-4" />
              </div>
              <span className="text-sm">Select</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Close</span>
            <div className="p-1 text-xs rounded-md bg-neutral-200 dark:bg-[#141414]">
              <span className="text-neutral-500 font-medium">ESC</span>
            </div>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}

function CommandMenuIcon() {
  return (
    <span
      className={cn(
        "text-foreground/70 border border-border/60 ease-linear duration-150 group-hover:border-transparent",
        "px-1.5 rounded-lg text-sm flex items-center gap-0.5 max-md:hidden"
      )}
    >
      <CommandIcon size={14} /> /
    </span>
  );
}
