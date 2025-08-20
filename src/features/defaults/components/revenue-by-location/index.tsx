import { MapSegment } from "./map-segment";

export function RevenueByLocation() {
  return (
    <div className="p-6 relative flex flex-col gap-4 bg-primary-light rounded-[16px]">
      <h3 className="text-lg font-semibold text-card-foreground">
        Revenue by Location
      </h3>
      <MapSegment />

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <p>New York</p>
            <p>72K</p>
          </div>
          <div className="h-[3px] rounded-full bg-[#e9f0f6] dark:bg-[#444c53] relative">
            <div className="absolute left-0 top-0 h-full w-[72%] bg-[#a8c5da] rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <p>San Francisco</p>
            <p>39K</p>
          </div>
          <div className="h-[3px] rounded-full bg-[#e9f0f6] dark:bg-[#444c53] relative">
            <div className="absolute left-0 top-0 h-full w-[39%] bg-[#a8c5da] rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <p>Sydney</p>
            <p>25K</p>
          </div>
          <div className="h-[3px] rounded-full bg-[#e9f0f6] dark:bg-[#444c53] relative">
            <div className="absolute left-0 top-0 h-full w-[25%] bg-[#a8c5da] rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <p>Singapore</p>
            <p>61K</p>
          </div>
          <div className="h-[3px] rounded-full bg-[#e9f0f6] dark:bg-[#444c53] relative">
            <div className="absolute left-0 top-0 h-full w-[61%] bg-[#a8c5da] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
