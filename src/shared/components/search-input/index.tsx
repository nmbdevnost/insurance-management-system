import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { debounce } from "@/shared/lib/utils/debounce";
import { RiSearchLine } from "@remixicon/react";
import {
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
  type ComponentProps,
} from "react";

type SearchInputProps = ComponentProps<typeof InputGroupInput> & {
  debounceMs?: number;
};

const SearchInput = ({
  className,
  placeholder = "Search...",
  value,
  onChange,
  debounceMs = 500,
  ...props
}: SearchInputProps) => {
  const [localValue, setLocalValue] = useState(value ?? "");

  const debouncedOnChange = useMemo(
    () =>
      debounce(
        (
          value: string,
          onChangeCb: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined
        ) => {
          onChangeCb?.({
            target: { value },
          } as ChangeEvent<HTMLInputElement>);
        },
        debounceMs
      ),
    [debounceMs]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      setLocalValue(next);
      debouncedOnChange(next, onChange);
    },
    [debouncedOnChange, onChange]
  );

  return (
    <InputGroup className={className}>
      <InputGroupInput
        {...props}
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <InputGroupAddon>
        <RiSearchLine />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchInput;
