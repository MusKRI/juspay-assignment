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
    <div className="flex items-center justify-center w-full h-full">
      <Checkbox
        size="xs"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
      />
    </div>
  ),
  cell: ({ row }) => (
    <div className="flex items-center justify-center w-full h-full">
      <Checkbox
        size="xs"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="md:opacity-0 md:group-hover:opacity-100 md:data-[state=checked]:opacity-100"
      />
    </div>
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
        <p className="text-xs font-[400]">{row.original.id}</p>
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
          <p className="text-xs">{row.original.user.name}</p>
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
        <p className="text-xs">{row.original.project}</p>
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
        <p className="text-xs">{row.original.address}</p>
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
        <p className="text-xs">{getRelativeTime(row.original.createdAt)}</p>
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
        color: "#8a8cd9",
        indicator: "#95a4fc",
      };
    case OrderStatus.COMPLETE:
      return {
        label: "Complete",
        color: "#4aa785",
        indicator: "#a1e3cb",
      };
    case OrderStatus.PENDING:
      return {
        label: "Pending",
        color: "#59a8d4",
        indicator: "#b1e3ff",
      };
    case OrderStatus.APPROVED:
      return {
        label: "Approved",
        color: "#ffc555",
        indicator: "#ffe999",
      };
    case OrderStatus.REJECTED:
      return {
        label: "Rejected",
        color: "#7e7e7e",
        indicator: "#7e7e7e",
      };
  }

  return {
    label: "Unknown",
    color: "#9fa0a2",
    indicator: "#9fa0a2",
  };
}

const statusColumn = columnHelper.accessor("status", {
  id: "status",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Status" />
  ),
  cell: ({ row }) => {
    const { label, color, indicator } = getStatusConfig(row.original.status);

    return (
      <div className="flex items-center gap-1">
        <div
          className="size-[6px] rounded-full"
          style={{ backgroundColor: indicator }}
        />
        <p
          className="text-xs"
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
