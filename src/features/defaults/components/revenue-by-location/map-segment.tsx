"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "ui/tooltip";

import LightMap from "@/assets/world-map.png";
import DarkMap from "@/assets/world-map-dark.png";
import { cn } from "@/lib/classes";

// import { Map } from "./map";
// import { DarkMap } from "./dark-map";

export function MapSegment() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative">
      <div className="relative">
        <Map mapImage={isDarkMode ? DarkMap.src : LightMap.src} />
      </div>

      <MapPoint point="Sydney" location="bottom-[21%] right-[15%]" />
      <MapPoint point="Singapore" location="bottom-[37%] right-[25%]" />
      <MapPoint point="New York" location="top-[37%] left-[26%]" />
      <MapPoint point="San Francisco" location="top-[32.5%] left-[14%]" />
    </div>
  );
}

function MapPoint({ point, location }: { point: string; location: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "point1 absolute rounded-full size-[12px] bg-white flex items-center justify-center after:absolute after:-inset-2",
            location
          )}
        >
          <div className="size-[6px] rounded-full bg-primary" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{point}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function Map({ mapImage }: { mapImage: string }) {
  return (
    <img
      src={mapImage}
      alt="map"
      className="w-full h-full max-w-full max-h-full object-cover"
    />
  );
}
