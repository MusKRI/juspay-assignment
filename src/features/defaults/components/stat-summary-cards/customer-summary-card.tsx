import { ArrowGrowthIcon } from "@/core/icons/other-icons";

export function CustomerSummaryCard() {
  return (
    <div className="p-6 relative flex flex-col justify-end gap-2 bg-primary-blue dark:text-background rounded-[16px]">
      <h3 className="text-[15px] font-semibold">Customers</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[24px] font-semibold">3,781</p>
        </div>
        <div className="flex items-center gap-1">
          <p>+ 11.01%</p>
          <ArrowGrowthIcon className="size-4" />
        </div>
      </div>
    </div>
  );
}
