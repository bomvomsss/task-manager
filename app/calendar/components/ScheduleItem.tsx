import { useRef } from "react";
import { TodoItemType } from "@/app/hooks/useCtrlItems";
import { BsExclamationCircle } from "react-icons/bs";

export interface ScheduleItemProps extends TodoItemType {
  onDoubleClick: () => void;
  currentDate?: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDropDateChange?: (
    id: string,
    newDate: string,
    type: "start" | "end"
  ) => void;
}

const statusColors = {
  todo: "schedule-todo",
  doing: "schedule-doing",
  done: "schedule-done",
};

function getDateOnly(dateStr: string) {
  return dateStr.split("T")[0];
}

export default function ScheduleItem({
  id,
  title,
  status,
  end_date,
  onDoubleClick,
  draggable,
  onDragStart,
}: ScheduleItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  // 아이템 전체 드래그
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("scheduleId", id);
    e.dataTransfer.setData("dateType", "move");
    if (onDragStart) onDragStart(e);
  };

  const todayStr = new Date().toISOString().split("T")[0];
  const isOverdue =
    end_date && getDateOnly(end_date) < todayStr && status !== "done";

  return (
    <div
      ref={itemRef}
      className={`schedule-item ${statusColors[status]}`}
      onDoubleClick={onDoubleClick}
      draggable={draggable}
      onDragStart={handleDragStart}
      style={{ display: "flex", alignItems: "center" }}
    >
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        {isOverdue && (
          <BsExclamationCircle color='red' style={{ marginRight: 4 }} />
        )}
        {title}
      </div>
    </div>
  );
}
