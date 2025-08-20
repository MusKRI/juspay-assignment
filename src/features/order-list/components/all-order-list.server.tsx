import { getPaginatedOrderList } from "@/services/order-list/queries.server";
import { OrderListSearchParams } from "../types";
import { AllOrderList } from "./all-order-list";

type Props = {
  searchParams: OrderListSearchParams;
};

export async function AllOrderListServer({ searchParams }: Props) {
  const [paginatedOrderResonse] = await Promise.all([
    getPaginatedOrderList(searchParams),
  ]);

  return <AllOrderList paginatedOrderResponse={paginatedOrderResonse} />;
}
