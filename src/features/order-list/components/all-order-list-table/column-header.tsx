import { Column } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react";

import { cn } from "@/lib/classes";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const sorting = column.getIsSorted();
  const buttonSemanticTitle = !sorting
    ? "Sort in ascending order"
    : sorting === "asc"
    ? "Sort in descending order"
    : "Clear sorting";

  const handleSorting = () => {
    if (!sorting) {
      column.toggleSorting(false);
    } else if (sorting === "asc") {
      column.toggleSorting(true);
    } else {
      column.clearSorting();
    }
  };

  if (!column.getCanSort() && !column.getCanHide()) {
    return (
      <div className={cn(className)}>
        <p className="text-sm text-foreground/40">{title}</p>
      </div>
    );
  }

  return (
    <button
      title={buttonSemanticTitle}
      className={cn(
        "flex items-center gap-1 group relative after:absolute after:-inset-1 after:rounded-md cursor-pointer group",
        className
      )}
      onClick={handleSorting}
    >
      <p className="text-sm text-foreground/40">{title}</p>
      {sorting === "asc" && (
        <ArrowUpIcon className="size-4 opacity-0 group-hover:opacity-100 [transition:opacity_0.2s_ease-out] text-foreground/60" />
      )}
      {sorting === "desc" && (
        <ArrowDownIcon className="size-4 opacity-0 group-hover:opacity-100 [transition:opacity_0.2s_ease-out] text-foreground/60" />
      )}
      {sorting === false && (
        <ArrowUpDownIcon className="size-4 opacity-0 group-hover:opacity-100 [transition:opacity_0.2s_ease-out] text-foreground/60" />
      )}
    </button>
  );
}
