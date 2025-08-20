import { orderListSearchParamsCache } from "./utils";

export type OrderListSearchParams = Awaited<
  ReturnType<typeof orderListSearchParamsCache.parse>
>;
