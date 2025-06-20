import { useRef, useEffect, useState } from "react";

export default function useCellWidths(cellCount: number) {
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cellWidths, setCellWidths] = useState<number[]>([]);

  useEffect(() => {
    setCellWidths(dayRefs.current.map((el) => el?.offsetWidth || 160));
  }, [cellCount]);

  return { dayRefs, cellWidths };
}
