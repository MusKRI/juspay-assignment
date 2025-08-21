import * as m from "motion/react-client";

import { MapSegment } from "./map-segment";

export function RevenueByLocation() {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.6 }}
      className="p-6 relative flex flex-col gap-4 bg-primary-light rounded-[16px]"
    >
      <h3 className="text-sm font-semibold text-card-foreground">
        Revenue by Location
      </h3>
      <MapSegment />

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col">
          <div className="flex items-center justify-between text-xs font-normal">
            <p>New York</p>
            <p>72K</p>
          </div>
          <div className="h-[3px] rounded-full bg-[#e9f0f6] dark:bg-[#444c53] relative">
            <m.div
              initial={{
                width: 0,
              }}
              animate={{
                width: "72%",
              }}
              transition={{
                duration: 1,
                delay: 0.6,
              }}
              className="absolute left-0 top-0 h-full bg-[#a8c5da] rounded-full"
            ></m.div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between text-xs font-normal">
            <p>San Francisco</p>
            <p>39K</p>
          </div>
          <div className="h-[3px] rounded-full bg-[#e9f0f6] dark:bg-[#444c53] relative">
            <m.div
              initial={{
                width: 0,
              }}
              animate={{
                width: "39%",
              }}
              transition={{
                duration: 1,
                delay: 0.6,
              }}
              className="absolute left-0 top-0 h-full bg-[#a8c5da] rounded-full"
            ></m.div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between text-xs font-normal">
            <p>Sydney</p>
            <p>25K</p>
          </div>
          <div className="h-[3px] rounded-full bg-[#e9f0f6] dark:bg-[#444c53] relative">
            <m.div
              initial={{
                width: 0,
              }}
              animate={{
                width: "25%",
              }}
              transition={{
                duration: 1,
                delay: 0.6,
              }}
              className="absolute left-0 top-0 h-full bg-[#a8c5da] rounded-full"
            ></m.div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between text-xs font-normal">
            <p>Singapore</p>
            <p>61K</p>
          </div>
          <div className="h-[3px] rounded-full bg-[#e9f0f6] dark:bg-[#444c53] relative">
            <m.div
              initial={{
                width: 0,
              }}
              animate={{
                width: "61%",
              }}
              transition={{
                duration: 1,
                delay: 0.6,
              }}
              className="absolute left-0 top-0 h-full bg-[#a8c5da] rounded-full"
            ></m.div>
          </div>
        </div>
      </div>
    </m.div>
  );
}
