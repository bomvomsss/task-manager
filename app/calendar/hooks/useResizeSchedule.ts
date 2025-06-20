// useResizeSchedule.ts
import { useState, useCallback, useEffect } from "react";

export function useResizeSchedule({ dates, cellWidth, updateItem, id }: any) {
  const [isResizing, setIsResizing] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragBaseDate, setDragBaseDate] = useState<Date | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setDragStartX(e.clientX);
    setDragBaseDate(new Date(dates[0]));
  };
  function generateDateRange(start: string, end: string): [string, string] {
    return start < end ? [start, end] : [end, start];
  }
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isResizing && dragStartX !== null && dragBaseDate) {
        const deltaX = e.clientX - dragStartX;
        const daysMoved = Math.round(deltaX / cellWidth);
        const newEndDate = new Date(dragBaseDate);
        newEndDate.setDate(dragBaseDate.getDate() + daysMoved);
        const newEndDateStr = newEndDate.toISOString().split("T")[0];
        const updatedDates = generateDateRange(dates[0], newEndDateStr);
        updateItem(id, updatedDates);
      }
    },
    [isResizing, dragStartX, dragBaseDate, cellWidth, dates, id, updateItem]
  );

  const onMouseUp = useCallback(() => {
    setIsResizing(false);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }, [onMouseMove]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isResizing, onMouseMove, onMouseUp]);

  return { onMouseDown };
}
