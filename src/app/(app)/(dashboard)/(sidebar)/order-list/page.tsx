import { Metadata } from "next";
import { Suspense } from "react";
import * as m from "motion/react-client";

import { AllOrderListServer } from "@/features/order-list/components";
import { orderListSearchParamsCache } from "@/features/order-list/utils";

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
    <div className="flex flex-col gap-4 p-4 lg:p-7">
      <div className="relative px-2 py-1">
        <m.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-sm font-semibold"
        >
          Order List
        </m.h3>
      </div>

      <div className="relative">
        <Suspense fallback={<div>Loading...</div>}>
          <AllOrderListServer searchParams={sp} />
        </Suspense>
      </div>
    </div>
  );
}
