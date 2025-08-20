import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/core/components/ui/avatar";
import { Order, OrderStatus } from "@/data/order-lists";
import { createColumnHelper } from "@tanstack/react-table";

import { Checkbox } from "ui/checkbox";
import { CopyButton } from "./copy-button";
import { CalendarIcon, ThreeDotsHorizontalIcon } from "icons/other-icons";
import { getRelativeTime } from "@/lib/date-utils";
import { DataTableColumnHeader } from "./column-header";

const columnHelper = createColumnHelper<Order>();

const selectColumn = columnHelper.display({
  id: "select",
  header: ({ table }) => (
    <Checkbox
      size="sm"
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      size="sm"
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      className="opacity-0 group-hover:opacity-100 data-[state=checked]:opacity-100"
    />
  ),
  enableSorting: false,
  enableHiding: false,
  enableColumnFilter: false,
});

const idColumn = columnHelper.accessor("id", {
  id: "id",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Order ID" />
  ),
  cell: ({ row }) => {
    return (
      <div className="flex items-center gap-1">
        <p className="text-sm">{row.original.id}</p>
      </div>
    );
  },
});

const userColumn = columnHelper.accessor("user", {
  id: "user",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="User" />
  ),
  cell: ({ row }) => {
    return (
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarImage src={row.original.user.avatar} />
          <AvatarFallback>{row.original.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm">{row.original.user.name}</p>
        </div>
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
  enableColumnFilter: false,
});

const projectColumn = columnHelper.accessor("project", {
  id: "project",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Project" />
  ),
  cell: ({ row }) => {
    return (
      <div className="flex items-center gap-1">
        <p className="text-sm">{row.original.project}</p>
      </div>
    );
  },
});

const addressColumn = columnHelper.accessor("address", {
  id: "address",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Address" />
  ),
  cell: ({ row }) => {
    return (
      <div className="flex items-center gap-1">
        <p className="text-sm">{row.original.address}</p>
        <CopyButton content={row.original.address} />
      </div>
    );
  },
});

const dateColumn = columnHelper.accessor("createdAt", {
  id: "date",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Date" />
  ),
  cell: ({ row }) => {
    return (
      <div className="flex items-center gap-1">
        <CalendarIcon className="size-4" />
        <p className="text-sm">{getRelativeTime(row.original.createdAt)}</p>
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
  enableColumnFilter: false,
});

function getStatusConfig(status: OrderStatus) {
  switch (status) {
    case OrderStatus.IN_PROGRESS:
      return {
        label: "In Progress",
        color: "#95a4fc",
      };
    case OrderStatus.COMPLETE:
      return {
        label: "Complete",
        color: "#4aa785",
      };
    case OrderStatus.PENDING:
      return {
        label: "Pending",
        color: "#59a8d4",
      };
    case OrderStatus.APPROVED:
      return {
        label: "Approved",
        color: "#ffc555",
      };
    case OrderStatus.REJECTED:
      return {
        label: "Rejected",
        color: "#9fa0a2",
      };
  }

  return {
    label: "Unknown",
    color: "bg-gray-500",
  };
}

const statusColumn = columnHelper.accessor("status", {
  id: "status",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Status" />
  ),
  cell: ({ row }) => {
    const { label, color } = getStatusConfig(row.original.status);

    return (
      <div className="flex items-center gap-1">
        <div
          className="size-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <p
          className="text-sm"
          style={{
            color: color,
          }}
        >
          {label}
        </p>
      </div>
    );
  },
});

const actionColumn = columnHelper.display({
  id: "action",
  cell: ({ row }) => {
    return (
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
        <button className="p-1 cursor-pointer">
          <ThreeDotsHorizontalIcon className="size-4" />
        </button>
      </div>
    );
  },
});

export const columnDefs = [
  selectColumn,
  idColumn,
  userColumn,
  projectColumn,
  addressColumn,
  dateColumn,
  statusColumn,
  actionColumn,
];
