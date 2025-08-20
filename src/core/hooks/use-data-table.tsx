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

/**
 * A generic, type-safe hook for creating data tables with server-side pagination and sorting.
 *
 * This hook integrates @tanstack/react-table with nuqs for URL state management,
 * enabling server-side rendering with seamless client-side interactions.
 *
 * @example
 * ```tsx
 * const { table, pagination, sorting, selection } = useDataTable({
 *   columns: columnDefinitions,
 *   data: serverPaginatedResponse,
 *   enableRowSelection: true,
 *   enableSorting: true,
 * });
 *
 * // Use pagination methods
 * pagination.goToNextPage();
 * pagination.setPageSize(20);
 *
 * // Use sorting methods
 * sorting.sortBy('name', 'asc');
 *
 * // Access selected rows
 * const selectedData = selection.getSelectedRowData();
 * ```
 *
 * @features
 * - Server-side pagination with URL synchronization
 * - Server-side sorting with URL synchronization
 * - Row selection state management
 * - Type-safe with full TypeScript support
 * - Integrated with nuqs for search params management
 * - Compatible with existing server-side data fetching patterns
 */

// Generic type for paginated response
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

// Configuration options for the hook
export interface UseDataTableConfig<T> {
  columns: ColumnDef<T>[];
  data: PaginatedResponse<T>;
  enableRowSelection?: boolean;
  enableSorting?: boolean;
  defaultPageSize?: number;
}

// Return type of the hook
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

// Search params parsers matching your existing pattern
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
  // Use nuqs for URL state management
  const [searchParams, setSearchParams] = useQueryStates(searchParamsParsers, {
    shallow: false,
  });

  // Internal state for row selection (not persisted in URL)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Convert server-side sort to TanStack table sorting state
  const sorting: SortingState = useMemo(() => {
    const [field, direction] = data.sort
      ? [data.sort.field, data.sort.direction]
      : searchParams.sort;
    return [{ id: field, desc: direction === "desc" }];
  }, [data.sort, searchParams.sort]);

  // Table configuration
  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // Server-side pagination
    manualSorting: true, // Server-side sorting
    enableRowSelection,
    enableSorting,

    // Pagination state
    pageCount: data.pagination.totalPages,

    // State
    state: {
      pagination: {
        pageIndex: data.pagination.page - 1, // TanStack uses 0-based indexing
        pageSize: data.pagination.pageSize,
      },
      sorting,
      rowSelection,
    },

    // State setters
    onRowSelectionChange: setRowSelection,

    // Custom handlers for server-side operations
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newPagination = updater({
          pageIndex: data.pagination.page - 1,
          pageSize: data.pagination.pageSize,
        });
        setSearchParams({
          page: newPagination.pageIndex + 1, // Convert back to 1-based
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
            sort: ["createdAt", "desc"], // Default sort
          });
        }
      }
    },
  });

  // Pagination helpers
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
        setSearchParams({ pageSize, page: 1 }); // Reset to first page when changing page size
      },
    }),
    [data.pagination, setSearchParams]
  );

  // Sorting helpers
  const sortingHelpers = useMemo(
    () => ({
      sortBy: (field: string, direction: "asc" | "desc" = "asc") => {
        setSearchParams({ sort: [field, direction] });
      },

      clearSort: () => {
        setSearchParams({ sort: ["createdAt", "desc"] }); // Reset to default
      },

      currentSort: {
        field: data.sort?.field || searchParams.sort[0],
        direction: data.sort?.direction || searchParams.sort[1],
      },
    }),
    [data.sort, searchParams.sort, setSearchParams]
  );

  // Selection helpers
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
