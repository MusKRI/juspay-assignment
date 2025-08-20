import {
  parseAsBoolean,
  parseAsStringEnum,
  ParserBuilder,
  useQueryStates,
  UseQueryStatesOptions,
} from "nuqs";

type RightSidebarParamsOptions = {
  rs: ParserBuilder<boolean>;
  type: ParserBuilder<"notification" | "settings">;
};

export function useRightSidebar(
  options?: UseQueryStatesOptions<RightSidebarParamsOptions>
) {
  const [params, setParams] = useQueryStates(
    {
      rs: parseAsBoolean,
      type: parseAsStringEnum(["notification", "settings"]),
    },
    options
  );

  return {
    ...params,
    setParams,
  };
}
