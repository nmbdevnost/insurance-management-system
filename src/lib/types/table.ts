import type { DropdownOption } from "./dropdown";

export type FilterConfig = {
  id: string;
  label: string;
  options?: DropdownOption[];
  optionsLoading?: boolean;
  type: "select" | "search" | "date" | "range";
  placeholder?: string;
};
