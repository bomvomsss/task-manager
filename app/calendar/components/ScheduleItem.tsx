import { useState } from "react";

export interface ScheduleItemProps {
  itemId: number;
  text: string;
  status: "todo" | "doing" | "done";
  dates: [string, string];
  currentDate: string;
  onClick: () => void;
  isStart?: boolean;
  isEnd?: boolean;
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
  currentDate,
  onClick,
  isStart,
  isEnd,
}: ScheduleItemProps) {
  const [isResizing, setIsResizing] = useState(false);

  return (
    <div className={`schedule-item ${statusColors[status]}`} onClick={onClick}>
      {text}
      <div
        className='resize-handle'
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsResizing(true);
        }}
      />
    </div>
  );
}
