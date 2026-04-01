// useControlledState.ts
import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type UseControlledStateReturn<T> = {
  value: T;
  onChange: Dispatch<SetStateAction<T>>;
};

type UseControlledStateProps<T> = {
  value?: T;
  onChange?: (value: T) => void;
  defaultValue: T;
};

const useControlledState = <T>({
  value: controlledValue,
  onChange: controlledOnChange,
  defaultValue,
}: UseControlledStateProps<T>): UseControlledStateReturn<T> => {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const onChange = useCallback(
    (updater: SetStateAction<T>) => {
      const newValue =
        typeof updater === "function"
          ? (updater as (prev: T) => T)(value)
          : updater;

      if (!isControlled) {
        setInternalValue(newValue);
      }

      controlledOnChange?.(newValue);
    },
    [isControlled, value, controlledOnChange]
  );

  return { value, onChange };
};

export default useControlledState;
