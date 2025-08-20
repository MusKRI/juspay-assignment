import { Button } from "ui/button";
import { ArrowUpDownIcon, FunnelIcon, PlusIcon } from "icons/other-icons";
import { SearchInput } from "./search-input";

export function DataTableToolbar() {
  return (
    <div className="bg-primary-light relative p-2 rounded-md">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-0.5">
          <button className="p-1 cursor-pointer">
            <PlusIcon className="size-4.5" />
          </button>
          <button className="p-1 cursor-pointer">
            <FunnelIcon className="size-4.5" />
          </button>
          <button className="p-1 cursor-pointer">
            <ArrowUpDownIcon className="size-4.5" />
          </button>
        </div>

        <SearchInput />
      </div>
    </div>
  );
}
