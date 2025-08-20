"use client";

import { useTheme } from "next-themes";

import { Map } from "./map";
import { DarkMap } from "./dark-map";

export function MapSegment() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className="relative">
      {isDarkMode ? (
        <DarkMap className="w-full h-full" />
      ) : (
        <Map className="w-full h-full" />
      )}

      <div className="point1 absolute bottom-[21%] right-[15%] size-[15px] rounded-full bg-white flex items-center justify-center">
        <div className="size-[7px] rounded-full bg-primary" />
      </div>
      <div className="point1 absolute bottom-[37%] right-[25%] size-[15px] rounded-full bg-white flex items-center justify-center">
        <div className="size-[7px] rounded-full bg-primary" />
      </div>
      <div className="point1 absolute top-[37%] left-[26%] size-[15px] rounded-full bg-white flex items-center justify-center">
        <div className="size-[7px] rounded-full bg-primary" />
      </div>
      <div className="point1 absolute top-[32.5%] left-[14%] size-[15px] rounded-full bg-white flex items-center justify-center">
        <div className="size-[7px] rounded-full bg-primary" />
      </div>
    </div>
  );
}
