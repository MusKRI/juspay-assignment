import { parseAsString, useQueryStates } from "nuqs";

export function useOrderListParams(options?: { shallow: boolean }) {
  const [params, setParams] = useQueryStates(
    {
      search: parseAsString,
    },
    options
  );

  return {
    ...params,
    setParams,
  };
}
