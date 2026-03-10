import { type RefObject, useEffect, useState } from "react";

interface UseFillHeightParams {
  ref?: RefObject<HTMLDivElement | null>;
  offset?: number;
}

export const useFillHeight = ({
  ref,
  offset = 130,
}: UseFillHeightParams): number => {
  const [tableHeight, setTableHeight] = useState<number>(0);

  useEffect(() => {
    const calculateHeight = (): void => {
      if (!ref?.current) return;
      const rect = ref.current.getBoundingClientRect();
      const availableHeight = window.innerHeight - rect.top - offset;
      setTableHeight(availableHeight);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, [ref, offset]);

  return tableHeight;
};
