import { ClockIcon } from "icons/dashboard-header-icons";
import { Button } from "ui/button";

export function HistoryTrigger() {
  return (
    <Button variant="ghost" size="icon" className="size-7 cursor-pointer">
      <ClockIcon className="size-5" />
      <span className="sr-only">History</span>
    </Button>
  );
}
