import { StarIcon } from "icons/dashboard-header-icons";
import { Button } from "ui/button";

export function StarCurrentPage() {
  return (
    <Button variant="ghost" size="icon" className="size-7 cursor-pointer">
      <StarIcon />
      <span className="sr-only">Mark as favorite</span>
    </Button>
  );
}
