import { useDataTable } from "@/core/hooks/use-data-table";
import { Button } from "@/core/components/ui/button";
import { SVGProps } from "react";
import { cn } from "@/lib/classes";

type Props = {
  pagination: ReturnType<typeof useDataTable>["pagination"];
};

// Chevron icons for navigation
function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Generate page numbers with ellipses logic
function generatePageNumbers(
  currentPage: number,
  totalPages: number
): (number | string)[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Always show first page
  const pages: (number | string)[] = [1];

  if (currentPage <= 3) {
    // Show pages 2, 3, 4, 5 and ellipsis
    pages.push(2, 3, 4, 5);
    if (totalPages > 5) {
      pages.push("...", totalPages);
    }
  } else if (currentPage >= totalPages - 2) {
    // Show ellipsis and last 4 pages
    if (totalPages > 5) {
      pages.push("...");
    }
    for (let i = totalPages - 3; i <= totalPages; i++) {
      if (i > 1) pages.push(i);
    }
  } else {
    // Show ellipsis, current page with neighbors, ellipsis, and last page
    pages.push("...");
    pages.push(currentPage - 1, currentPage, currentPage + 1);
    pages.push("...", totalPages);
  }

  return pages;
}

export function DataTablePagination({ pagination }: Props) {
  const {
    page: currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  } = pagination;

  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPreviousPage}
        disabled={!hasPreviousPage}
        className="h-8 w-8 disabled:opacity-50"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>

      {/* Page numbers */}
      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 py-1 text-sm text-gray-500"
            >
              ...
            </span>
          );
        }

        const isCurrentPage = pageNumber === currentPage;

        return (
          <Button
            key={pageNumber}
            variant={isCurrentPage ? "ghost" : "ghost"}
            size="sm"
            onClick={() => goToPage(pageNumber as number)}
            className={cn(
              "h-8 w-8 text-sm",
              isCurrentPage
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent"
            )}
          >
            {pageNumber}
          </Button>
        );
      })}

      {/* Next button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goToNextPage}
        disabled={!hasNextPage}
        className="h-8 w-8 disabled:opacity-50"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
