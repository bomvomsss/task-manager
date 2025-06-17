import { useState } from "react";

interface ScheduleItemProps {
  itemId: number;
  text: string;
  status: "todo" | "doing" | "done";
  dates: [string, string];
  currentDate: string;
  onClick: () => void;
}

const statusColors = {
  todo: "schedule-todo",
  doing: "schedule-doing",
  done: "schedule-done",
};

export default function ScheduleItem({
  text,
  status,
  onClick,
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
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "6px",
          cursor: "ew-resize",
        }}
      />
    </div>
  );
}
