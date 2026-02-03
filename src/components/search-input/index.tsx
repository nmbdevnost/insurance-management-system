import { RiSearchLine } from "@remixicon/react";
import type { ComponentProps } from "react";
import type { Input } from "../ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

type SearchInputProps = ComponentProps<typeof Input>;

const SearchInput = ({
  className,
  placeholder = "Search...",
  ...props
}: SearchInputProps) => {
  return (
    <InputGroup className={className}>
      <InputGroupInput {...props} placeholder={placeholder} />
      <InputGroupAddon>
        <RiSearchLine />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchInput;
