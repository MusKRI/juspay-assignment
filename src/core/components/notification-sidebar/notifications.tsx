import { cn } from "@/lib/classes";
import { getRelativeTime } from "@/lib/date-utils";
import { BugIcon, UserIcon, BroadcastIcon } from "icons/notification-icons";

type Notification = {
  id: number;
  type: "bug" | "user" | "broadcast";
  title: string;
  timestamp: string;
};

function getNotificationConfig(type: Notification["type"]) {
  switch (type) {
    case "bug":
      return {
        icon: <BugIcon className="size-4" />,
        color: "bg-primary-blue",
      };
    case "user":
      return {
        icon: <UserIcon className="size-4" />,
        color: "bg-primary-purple",
      };
    case "broadcast":
      return {
        icon: <BroadcastIcon className="size-4" />,
        color: "bg-primary-purple",
      };
    default:
      return null;
  }
}

const notifications = [
  {
    id: 1,
    type: "bug",
    title: "You have a bug that needs...",
    timestamp: "2025-08-18T09:00:02.569+00:00",
  },
  {
    id: 2,
    type: "user",
    title: "New user registered",
    timestamp: "2025-08-18T08:01:15.234+00:00",
  },
  {
    id: 3,
    type: "bug",
    title: "You have a bug that needs...",
    timestamp: "2025-08-18T21:00:45.678+00:00",
  },
  {
    id: 4,
    type: "broadcast",
    title: "Andi Lane subscribed to you",
    timestamp: "2025-08-18T11:59:30.123+00:00",
  },
] satisfies Notification[];

export function Notifications() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold px-1 py-2">Notifications</h3>

      <ul className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <li key={notification.id} className="p-1">
            <div className="flex gap-2">
              <div
                className={cn(
                  "size-6 rounded-sm flex items-center justify-center shrink-0",
                  getNotificationConfig(notification.type)?.color
                )}
              >
                {getNotificationConfig(notification.type)?.icon}
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-normal truncate max-w-[25ch]">
                  {notification.title}
                </p>
                <p className="text-xs text-foreground/40">
                  {getRelativeTime(notification.timestamp)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
