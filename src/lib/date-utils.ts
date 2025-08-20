import {
  formatDistanceToNow,
  isToday,
  isYesterday,
  isThisWeek,
  isThisYear,
  format,
} from "date-fns";

/**
 * Converts a date string or Date object to a relative time format
 * Examples: "Just now", "5 minutes ago", "2 hours ago", "Today, 3:45 PM", "Yesterday, 10:30 AM", "Jan 15, 2024"
 */
export function getRelativeTime(date: string | Date): string {
  const targetDate = typeof date === "string" ? new Date(date) : date;

  // If the date is invalid, return the original string
  if (isNaN(targetDate.getTime())) {
    return typeof date === "string" ? date : date.toString();
  }

  const now = new Date();
  const diffInMs = now.getTime() - targetDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  // Just now (less than 2 minutes)
  if (diffInMinutes < 2) {
    return "Just now";
  }

  // Use date-fns for basic relative time (minutes/hours ago)
  const distanceString = formatDistanceToNow(targetDate, { addSuffix: true });

  // For recent times (less than 24 hours), use the date-fns output
  if (diffInMinutes < 60 * 24) {
    return distanceString;
  }

  // Today with time
  if (isToday(targetDate)) {
    return `Today, ${format(targetDate, "h:mm a")}`;
  }

  // Yesterday with time
  if (isYesterday(targetDate)) {
    return `Yesterday, ${format(targetDate, "h:mm a")}`;
  }

  // This week with day name and time
  if (isThisWeek(targetDate)) {
    return `${format(targetDate, "EEEE, h:mm a")}`;
  }

  // This year (show month and day)
  if (isThisYear(targetDate)) {
    return format(targetDate, "MMM d");
  }

  // Different year (show month, day, and year)
  return format(targetDate, "MMM d, yyyy");
}
