import { ArrowDownGrowthIcon } from "@/core/icons/other-icons";

export function OrderSummaryCard() {
  return (
    <div className="p-6 relative flex flex-col justify-end gap-2 bg-primary-light rounded-[16px] [transition:translate_200ms,border-radius_200ms,box-shadow_200ms] [transition-timing-function:ease-out] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-[12px] hover:shadow-md">
      <h3 className="text-sm font-semibold">Orders</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[24px] font-semibold">1,219</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <p className="text-xs">- 0.03%</p>
          <ArrowDownGrowthIcon className="size-4" />
        </div>
      </div>
    </div>
  );
}
