import { Metadata } from "next";

import { AllOrderListServer } from "@/features/order-list/components";
import { orderListSearchParamsCache } from "@/features/order-list/utils";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Order List",
};

type OrderListPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function OrderListPage({
  searchParams,
}: OrderListPageProps) {
  const asp = await searchParams;

  const sp = orderListSearchParamsCache.parse(asp);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative p-1">
        <h3 className="text-[15px] font-semibold">Order List</h3>
      </div>

      <div className="relative">
        <Suspense fallback={<div>Loading...</div>}>
          <AllOrderListServer searchParams={sp} />
        </Suspense>
      </div>
    </div>
  );
}
