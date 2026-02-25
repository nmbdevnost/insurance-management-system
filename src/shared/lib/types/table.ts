import type { DropdownOption } from "./dropdown";

export type FilterConfig = {
  id: string;
  label: string;
  options?: DropdownOption[];
  loading?: boolean;
  type: "select" | "search" | "date" | "range";
  placeholder?: string;
  disableSearch?: boolean;
  multiple?: boolean;
  disabled?: boolean;
};
