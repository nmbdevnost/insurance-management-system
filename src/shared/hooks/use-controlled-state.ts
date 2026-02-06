import { useState } from "react";

type UseControlledStateReturn<T> = {
  value: T;
  onChange: (value: T) => void;
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

  const onChange = (newValue: T) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    controlledOnChange?.(newValue);
  };

  return {
    value,
    onChange,
  };
};

export default useControlledState;
