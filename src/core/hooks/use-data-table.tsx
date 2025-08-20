"use client";

import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type Table,
  type RowSelectionState,
} from "@tanstack/react-table";
import {
  useQueryStates,
  parseAsInteger,
  parseAsArrayOf,
  parseAsString,
} from "nuqs";
import { useMemo, useState } from "react";

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  sort: {
    field: string;
    direction: string;
  };
}

export interface UseDataTableConfig<T> {
  columns: ColumnDef<T>[];
  data: PaginatedResponse<T>;
  enableRowSelection?: boolean;
  enableSorting?: boolean;
  defaultPageSize?: number;
}

export interface UseDataTableReturn<T> {
  table: Table<T>;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    goToPage: (page: number) => void;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    setPageSize: (pageSize: number) => void;
  };
  sorting: {
    sortBy: (field: string, direction?: "asc" | "desc") => void;
    clearSort: () => void;
    currentSort: { field: string; direction: string };
  };
  selection: {
    selectedRows: RowSelectionState;
    setSelectedRows: (selection: RowSelectionState) => void;
    clearSelection: () => void;
    getSelectedRowData: () => T[];
  };
}

const searchParamsParsers = {
  page: parseAsInteger.withDefault(1),
  sort: parseAsArrayOf(parseAsString).withDefault(["createdAt", "desc"]),
  pageSize: parseAsInteger.withDefault(10),
};

export function useDataTable<T>({
  columns,
  data,
  enableRowSelection = true,
  enableSorting = true,
  defaultPageSize = 10,
}: UseDataTableConfig<T>): UseDataTableReturn<T> {
  const [searchParams, setSearchParams] = useQueryStates(searchParamsParsers, {
    shallow: false,
  });

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const sorting: SortingState = useMemo(() => {
    const [field, direction] = data.sort
      ? [data.sort.field, data.sort.direction]
      : searchParams.sort;
    return [{ id: field, desc: direction === "desc" }];
  }, [data.sort, searchParams.sort]);

  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    enableRowSelection,
    enableSorting,

    pageCount: data.pagination.totalPages,

    state: {
      pagination: {
        pageIndex: data.pagination.page - 1,
        pageSize: data.pagination.pageSize,
      },
      sorting,
      rowSelection,
    },

    onRowSelectionChange: setRowSelection,

    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newPagination = updater({
          pageIndex: data.pagination.page - 1,
          pageSize: data.pagination.pageSize,
        });
        setSearchParams({
          page: newPagination.pageIndex + 1,
          pageSize: newPagination.pageSize,
        });
      }
    },

    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        const newSorting = updater(sorting);
        if (newSorting.length > 0) {
          const sortState = newSorting[0];
          setSearchParams({
            sort: [sortState.id, sortState.desc ? "desc" : "asc"],
          });
        } else {
          setSearchParams({
            sort: ["createdAt", "desc"],
          });
        }
      }
    },
  });

  const pagination = useMemo(
    () => ({
      page: data.pagination.page,
      pageSize: data.pagination.pageSize,
      total: data.pagination.total,
      totalPages: data.pagination.totalPages,
      hasNextPage: data.pagination.hasNextPage,
      hasPreviousPage: data.pagination.hasPreviousPage,

      goToPage: (page: number) => {
        setSearchParams({
          page: Math.max(1, Math.min(page, data.pagination.totalPages)),
        });
      },

      goToNextPage: () => {
        if (data.pagination.hasNextPage) {
          setSearchParams({ page: data.pagination.page + 1 });
        }
      },

      goToPreviousPage: () => {
        if (data.pagination.hasPreviousPage) {
          setSearchParams({ page: data.pagination.page - 1 });
        }
      },

      setPageSize: (pageSize: number) => {
        setSearchParams({ pageSize, page: 1 });
      },
    }),
    [data.pagination, setSearchParams]
  );

  const sortingHelpers = useMemo(
    () => ({
      sortBy: (field: string, direction: "asc" | "desc" = "asc") => {
        setSearchParams({ sort: [field, direction] });
      },

      clearSort: () => {
        setSearchParams({ sort: ["createdAt", "desc"] });
      },

      currentSort: {
        field: data.sort?.field || searchParams.sort[0],
        direction: data.sort?.direction || searchParams.sort[1],
      },
    }),
    [data.sort, searchParams.sort, setSearchParams]
  );

  const selection = useMemo(
    () => ({
      selectedRows: rowSelection,
      setSelectedRows: setRowSelection,
      clearSelection: () => setRowSelection({}),
      getSelectedRowData: () => {
        return Object.keys(rowSelection)
          .filter((key) => rowSelection[key])
          .map((key) => data.data[parseInt(key)])
          .filter(Boolean);
      },
    }),
    [rowSelection, data.data]
  );

  return {
    table,
    pagination,
    sorting: sortingHelpers,
    selection,
  };
}
