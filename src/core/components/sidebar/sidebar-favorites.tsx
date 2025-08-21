"use client";

import { AnimatePresence, motion, stagger } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/classes";

export function SidebarFavorites() {
  const [pick, setPick] = useState<"favorites" | "recently">("favorites");

  return (
    <div className="flex flex-col gap-1 pb-3">
      <div className="flex items-center gap-2">
        <button
          className={cn(
            "cursor-pointer text-sm px-2 py-1 [transition:color_0.15s_ease-out]",
            pick === "favorites"
              ? "text-foreground/40"
              : "text-foreground/20 hover:text-foreground/40"
          )}
          onClick={() => setPick("favorites")}
        >
          Favorites
        </button>
        <button
          className={cn(
            "cursor-pointer text-sm px-2 py-1 [transition:color_0.15s_ease-out]",
            pick === "recently"
              ? "text-foreground/40"
              : "text-foreground/20 hover:text-foreground/40"
          )}
          onClick={() => setPick("recently")}
        >
          Recently
        </button>
      </div>

      <AnimatePresence mode="wait">
        {pick === "favorites" && (
          <motion.div
            key="favorites"
            initial={{ opacity: 0, x: -10, filter: "blur(1px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -10, filter: "blur(1px)" }}
            className="flex flex-col gap-1"
          >
            <button className="px-2 py-1 cursor-pointer rounded-[8px] [transition:background-color_0.15s_ease-out]  hover:bg-foreground/5 dark:hover:bg-white/5">
              <div className="flex items-center gap-[2px]">
                <span className="size-4 shrink-0 flex items-center justify-center">
                  <span className="size-2 rounded-full bg-foreground/20 inline-block" />
                </span>
                <span className="text-sm">Overview</span>
              </div>
            </button>
            <button className="px-2 py-1 cursor-pointer rounded-[8px] [transition:background-color_0.15s_ease-out]  hover:bg-foreground/5 dark:hover:bg-white/5">
              <div className="flex items-center gap-[2px]">
                <span className="size-4 shrink-0 flex items-center justify-center">
                  <span className="size-2 rounded-full bg-foreground/20 inline-block" />
                </span>
                <span className="text-sm">Projects</span>
              </div>
            </button>
          </motion.div>
        )}
        {pick === "recently" && (
          <motion.div
            key="recently"
            initial={{ opacity: 0, x: 10, filter: "blur(1px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 10, filter: "blur(1px)" }}
            className="flex flex-col gap-1"
          >
            <button className="px-2 py-1 cursor-pointer rounded-[8px] [transition:background-color_0.15s_ease-out] hover:bg-white/5">
              <div className="flex items-center gap-[2px]">
                <span className="size-4 shrink-0 flex items-center justify-center">
                  <span className="size-2 rounded-full bg-foreground/20 inline-block" />
                </span>
                <span className="text-sm">Project 1</span>
              </div>
            </button>
            <button className="px-2 py-1 cursor-pointer rounded-[8px] [transition:background-color_0.15s_ease-out] hover:bg-white/5">
              <div className="flex items-center gap-[2px]">
                <span className="size-4 shrink-0 flex items-center justify-center">
                  <span className="size-2 rounded-full bg-foreground/20 inline-block" />
                </span>
                <span className="text-sm">Project 2</span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
