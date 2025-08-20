import { ArrowGrowthIcon } from "@/core/icons/other-icons";

export function GrowthSummaryCard() {
  return (
    <div className="p-6 relative flex flex-col justify-end gap-2 bg-primary-purple dark:text-background rounded-[16px]">
      <h3 className="text-[15px] font-semibold">Growth</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[24px] font-semibold">30.1%</p>
        </div>
        <div className="flex items-center gap-1">
          <p>+ 6.08%</p>
          <ArrowGrowthIcon className="size-4" />
        </div>
      </div>
    </div>
  );
}
