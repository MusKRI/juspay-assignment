import {
  flexRender,
  Table as TanstackTable,
  ColumnDef,
  Row,
  Cell,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "ui/table";

import { Order } from "@/data/order-lists";

type Props = {
  table: TanstackTable<Order>;
};

export function DataTable({ table }: Props) {
  return (
    <div className="relative">
      <Table>
        <TableHeader className="border-b-2">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="h-12 group"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="h-12" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-[calc(var(--spacing)*12*10)]"
              >
                <div className="flex flex-col items-center justify-center gap-8">
                  <div className="flex flex-col gap-4 text-center font-[450]">
                    <span>No orders matching your filters.</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        Adjust or clear filters to reveal orders.
                      </span>
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
