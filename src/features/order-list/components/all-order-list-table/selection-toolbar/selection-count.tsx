import { X } from "lucide-react";

import { Button } from "ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "ui/tooltip";
import { Separator } from "ui/separator";
import { useDataTable } from "@/core/hooks/use-data-table";

type Props = {
  selection: ReturnType<typeof useDataTable>["selection"];
};

export function SelectionCount({ selection }: Props) {
  const { getSelectedRowData, clearSelection } = selection;

  const selectedRows = getSelectedRowData();

  return (
    <div className="flex h-7 items-center rounded-md border pr-1 pl-2.5">
      <span className="whitespace-nowrap text-xs">
        {selectedRows.length} selected
      </span>
      <Separator
        orientation="vertical"
        className="mr-1 ml-2 data-[orientation=vertical]:h-4"
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-5"
            onClick={clearSelection}
          >
            <X className="size-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={10}
          className="flex items-center gap-2 border bg-accent px-2 py-1 font-semibold text-foreground dark:bg-zinc-900 [&>span]:hidden"
        >
          <p>Clear selection</p>
          <kbd className="select-none rounded border bg-background px-1.5 py-px font-mono font-normal text-[0.7rem] text-foreground shadow-xs">
            <abbr title="Escape" className="no-underline">
              Esc
            </abbr>
          </kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
