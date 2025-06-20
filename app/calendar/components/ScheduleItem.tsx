import useCtrlItems, { generateDateRange } from "@/app/hooks/useCtrlItems";
import { useResizeSchedule } from "../hooks/useResizeSchedule";

export interface ScheduleItemProps {
  itemId: number;
  text: string;
  status: "todo" | "doing" | "done";
  dates: [string, string];
  currentDate: string;
  onClick: () => void;
  isStart?: boolean;
  isEnd?: boolean;
  cellWidth: number;
}

const statusColors = {
  todo: "schedule-todo",
  doing: "schedule-doing",
  done: "schedule-done",
};

export default function ScheduleItem({
  itemId,
  text,
  status,
  dates,
  onClick,
  cellWidth,
}: ScheduleItemProps) {
  const { updateItem } = useCtrlItems(); // 일정 수정 훅
  const id = itemId;

  const { onMouseDown: handleMouseDown } = useResizeSchedule({
    dates,
    cellWidth,
    updateItem,
    id,
  });

  return (
    <div className={`schedule-item ${statusColors[status]}`} onClick={onClick}>
      {text}
      <div className='resize-handle' onMouseDown={handleMouseDown} />
    </div>
  );
}
