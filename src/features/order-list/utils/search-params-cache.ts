import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const orderListSearchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  sort: parseAsArrayOf(parseAsString).withDefault(["createdAt", "desc"]),
  pageSize: parseAsInteger.withDefault(10),
  search: parseAsString.withDefault(""),
});
