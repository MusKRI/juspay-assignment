import { orderListData, Order } from "@/data/order-lists";
import { OrderListSearchParams } from "@/features/order-list/types";

export interface PaginatedOrderListResponse {
  data: Order[];
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

export const getPaginatedOrderList = async (
  searchParams: OrderListSearchParams
): Promise<PaginatedOrderListResponse> => {
  const { page, pageSize, sort, search } = searchParams;

  // Extract sort field and direction
  const [sortField, sortDirection] = sort;

  // Create a copy of the data to avoid mutating the original
  let filteredData = [...orderListData];

  // Apply search filtering
  if (search && search.trim() !== "") {
    const searchTerm = search.toLowerCase().trim();
    filteredData = filteredData.filter((order) => {
      // Search through multiple fields: id, user name, project, address, status
      const searchableFields = [
        order.id.toLowerCase(),
        order.user.name.toLowerCase(),
        order.project.toLowerCase(),
        order.address.toLowerCase(),
        order.status.toLowerCase(),
      ];

      // Return true if any field contains the search term
      return searchableFields.some((field) => field.includes(searchTerm));
    });
  }

  // Apply sorting
  filteredData.sort((a, b) => {
    let aValue: any;
    let bValue: any;

    // Handle nested properties for sorting
    switch (sortField) {
      case "user":
        aValue = a.user.name.toLowerCase();
        bValue = b.user.name.toLowerCase();
        break;
      case "createdAt":
        aValue = a.createdAt.getTime();
        bValue = b.createdAt.getTime();
        break;
      case "status":
        aValue = a.status.toLowerCase();
        bValue = b.status.toLowerCase();
        break;
      case "project":
        aValue = a.project.toLowerCase();
        bValue = b.project.toLowerCase();
        break;
      case "address":
        aValue = a.address.toLowerCase();
        bValue = b.address.toLowerCase();
        break;
      case "id":
        // Extract numeric part from ID for proper sorting
        aValue = parseInt(a.id.replace("#CM", ""));
        bValue = parseInt(b.id.replace("#CM", ""));
        break;
      default:
        aValue = a.createdAt.getTime();
        bValue = b.createdAt.getTime();
    }

    // Apply sort direction
    if (sortDirection === "asc") {
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    } else {
      if (aValue > bValue) return -1;
      if (aValue < bValue) return 1;
      return 0;
    }
  });

  // Calculate pagination
  const total = filteredData.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get paginated data
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Return structured response
  return {
    data: paginatedData,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };
};
