"use client";

import { useDataTable } from "@/core/hooks/use-data-table";
import { getPaginatedOrderList } from "@/services/order-list/queries.server";
import { Order } from "@/data/order-lists";

import { columnDefs } from "./all-order-list-table/columns";
import { DataTable } from "./all-order-list-table/data-table";
import { DataTablePagination } from "./all-order-list-table/data-table-pagination";
import { DataTableToolbar } from "./all-order-list-table/data-table-toolbar";
import { SelectionToolbar } from "./all-order-list-table/selection-toolbar";

type Props = {
  paginatedOrderResponse: Awaited<ReturnType<typeof getPaginatedOrderList>>;
};

export function AllOrderList({ paginatedOrderResponse }: Props) {
  const { table, pagination, sorting, selection } = useDataTable<Order>({
    columns: columnDefs as any,
    data: paginatedOrderResponse,
    enableRowSelection: true,
    enableSorting: true,
  });

  return (
    <div className="flex flex-col gap-3">
      <DataTableToolbar />
      <DataTable table={table} />
      <DataTablePagination pagination={pagination} />
      <SelectionToolbar selection={selection} />
    </div>
  );
}
