import { StarIcon } from "icons/dashboard-header-icons";
import { Button } from "ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "ui/tooltip";

export function StarCurrentPage() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="size-7 cursor-pointer">
          <StarIcon />
          <span className="sr-only">Mark as favorite</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Mark as favorite</p>
      </TooltipContent>
    </Tooltip>
  );
}
