// useControlledState.ts
import {
  useCallback,
  useLayoutEffect,
  useRef,
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

  const valueRef = useRef(value);
  const controlledOnChangeRef = useRef(controlledOnChange);
  const isControlledRef = useRef(isControlled);

  const onChange = useCallback((updater: SetStateAction<T>) => {
    const newValue =
      typeof updater === "function"
        ? (updater as (prev: T) => T)(valueRef.current)
        : updater;

    if (!isControlledRef.current) {
      setInternalValue(newValue);
    }

    controlledOnChangeRef.current?.(newValue);
  }, []);

  useLayoutEffect(() => {
    valueRef.current = value;
    controlledOnChangeRef.current = controlledOnChange;
    isControlledRef.current = isControlled;
  });

  return { value, onChange };
};

export default useControlledState;
