"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { useOrderListParams } from "../../hooks";
import { SearchIcon } from "@/core/icons/other-icons";
import { Input } from "ui/input";

export function SearchInput() {
  const { search, setParams } = useOrderListParams({ shallow: false });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <motion.div
        className="relative border rounded-md px-2 py-1 flex items-center gap-2 min-w-[150px] cursor-pointer"
        layoutId="search-input-container"
        onClick={() => setIsOpen(true)}
      >
        <SearchIcon className="size-4.5" />
        <span className="text-sm text-foreground/40">Search</span>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute inset-0 bg-black/10 rounded-md h-full z-4 backdrop-blur-sm"
            layoutId="search-input-container"
          >
            <Input
              value={search || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length > 0) {
                  setParams({ search: value });
                } else {
                  setParams({ search: null });
                }
              }}
              // onBlur={() => setIsOpen(false)}
              placeholder="Search by order id, user name, project, address, status"
              className="w-full h-full"
            />

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs cursor-pointer border rounded-md px-2 py-1 bg-primary-light after:absolute after:-inset-0.5 after:rounded-md after:bg-primary-light after:z-[-1]"
              onClick={() => setIsOpen(false)}
            >
              close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
