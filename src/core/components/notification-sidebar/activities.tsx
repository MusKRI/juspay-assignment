import ActivityAv1 from "@/assets/avatars/act-av1.png";
import ActivityAv2 from "@/assets/avatars/act-av2.png";
import ActivityAv3 from "@/assets/avatars/act-av3.png";
import ActivityAv4 from "@/assets/avatars/act-av4.png";
import ActivityAv5 from "@/assets/avatars/act-av5.png";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getRelativeTime } from "@/lib/date-utils";

type Activity = {
  id: number;
  avatar: string;
  title: string;
  timestamp: string;
};

const activities = [
  {
    id: 1,
    avatar: ActivityAv1.src,
    title: "You have a bug that needs...",
    timestamp: "2025-08-18T09:00:02.569+00:00",
  },
  {
    id: 2,
    avatar: ActivityAv2.src,
    title: "Released a new version",
    timestamp: "2025-08-18T08:01:15.234+00:00",
  },
  {
    id: 3,
    avatar: ActivityAv3.src,
    title: "Submitted a bug",
    timestamp: "2025-08-18T21:00:45.678+00:00",
  },
  {
    id: 4,
    avatar: ActivityAv4.src,
    title: "Modified a data in Page X",
    timestamp: "2025-08-18T11:59:30.123+00:00",
  },
  {
    id: 5,
    avatar: ActivityAv5.src,
    title: "Deleted a page in Project X",
    timestamp: "2025-08-18T11:59:30.123+00:00",
  },
] satisfies Activity[];

export function Activities() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold px-1 py-2">Activities</h3>

      <ul className="flex flex-col gap-2">
        {activities.map((activity) => {
          return (
            <li
              key={activity.id}
              className="relative p-1 before:absolute before:top-full before:-translate-y-[calc(100%-8px)] before:left-[14px] before:w-px before:h-[calc(100%-25px)] before:bg-foreground/10 last:before:hidden"
            >
              <div className="flex gap-2">
                <Avatar className="size-6">
                  <AvatarImage src={activity.avatar} />
                  <AvatarFallback>{activity.title.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <p className="text-sm font-normal truncate max-w-[25ch]">
                    {activity.title}
                  </p>
                  <p className="text-xs text-foreground/40">
                    {getRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
