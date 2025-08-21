"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

import { Separator } from "ui/separator";
import { useDataTable } from "@/core/hooks/use-data-table";
import { cn } from "@/lib/classes";
import { SelectionCount } from "./selection-count";
import { CheckCircle2, Trash2 } from "lucide-react";
import { SelectionAction } from "./selection-action";

type Props = {
  selection: ReturnType<typeof useDataTable>["selection"];
};

export function SelectionToolbar({ selection }: Props) {
  const { getSelectedRowData, clearSelection } = selection;

  const selectedRows = getSelectedRowData();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        clearSelection();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isVisible = selectedRows.length > 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn(
            "fixed inset-x-0 bottom-6 z-50 mx-auto flex w-fit flex-wrap items-center justify-center gap-2 rounded-md border bg-background p-2 text-foreground shadow-sm"
          )}
        >
          <SelectionCount selection={selection} />
          <Separator
            orientation="vertical"
            className="hidden data-[orientation=vertical]:h-5 sm:block"
          />
          <div className="flex items-center gap-1.5">
            <SelectionAction
              tooltip="Update status"
              size="icon"
              onClick={clearSelection}
            >
              <CheckCircle2 className="size-4" />
            </SelectionAction>
            <SelectionAction
              tooltip="Delete order"
              size="icon"
              onClick={clearSelection}
            >
              <Trash2 className="size-4" />
            </SelectionAction>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
