import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { RiSearchLine } from "@remixicon/react";
import type { ComponentProps } from "react";

type SearchInputProps = ComponentProps<typeof InputGroupInput>;

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
