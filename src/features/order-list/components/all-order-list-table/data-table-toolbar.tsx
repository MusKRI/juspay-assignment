import * as m from "motion/react-client";

import { ArrowUpDownIcon, FunnelIcon, PlusIcon } from "icons/other-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "ui/tooltip";

import { SearchInput } from "./search-input";

export function DataTableToolbar() {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.15 }}
      className="bg-primary-light relative p-2 rounded-[8px]"
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-0.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-1 cursor-pointer">
                <PlusIcon className="size-4.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Order</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-1 cursor-pointer">
                <FunnelIcon className="size-4.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filters</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-1 cursor-pointer">
                <ArrowUpDownIcon className="size-4.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sort</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <SearchInput />
      </div>
    </m.div>
  );
}
