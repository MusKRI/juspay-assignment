import {
  formatDistanceToNow,
  isToday,
  isYesterday,
  isThisWeek,
  isThisYear,
  format,
} from "date-fns";

export function getRelativeTime(date: string | Date): string {
  const targetDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(targetDate.getTime())) {
    return typeof date === "string" ? date : date.toString();
  }

  const now = new Date();
  const diffInMs = now.getTime() - targetDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 2) {
    return "Just now";
  }

  const distanceString = formatDistanceToNow(targetDate, { addSuffix: true });

  if (diffInMinutes < 60 * 24) {
    return distanceString;
  }

  if (isToday(targetDate)) {
    return `Today, ${format(targetDate, "h:mm a")}`;
  }

  if (isYesterday(targetDate)) {
    return `Yesterday, ${format(targetDate, "h:mm a")}`;
  }

  if (isThisWeek(targetDate)) {
    return `${format(targetDate, "EEEE, h:mm a")}`;
  }

  if (isThisYear(targetDate)) {
    return format(targetDate, "MMM d");
  }

  return format(targetDate, "MMM d, yyyy");
}
