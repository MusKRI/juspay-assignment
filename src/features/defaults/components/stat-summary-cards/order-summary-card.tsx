import { ArrowDownGrowthIcon } from "@/core/icons/other-icons";

export function OrderSummaryCard() {
  return (
    <div className="p-6 relative flex flex-col justify-end gap-2 bg-primary-light rounded-[16px]">
      <h3 className="text-[15px] font-semibold">Orders</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[24px] font-semibold">1,219</p>
        </div>
        <div className="flex items-center gap-1">
          <p>- 0.03%</p>
          <ArrowDownGrowthIcon className="size-4" />
        </div>
      </div>
    </div>
  );
}
