import { ClockIcon } from "icons/dashboard-header-icons";
import { Button } from "ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "ui/tooltip";

export function HistoryTrigger() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 cursor-pointer max-lg:hidden"
        >
          <ClockIcon className="size-5" />
          <span className="sr-only">History</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>History</p>
      </TooltipContent>
    </Tooltip>
  );
}
