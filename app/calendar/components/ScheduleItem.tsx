import { TodoItemType, TodoStatus } from "@/app/hooks/useCtrlItems";

export interface ScheduleItemProps extends TodoItemType {
  onClick: () => void;
  isStart?: boolean;
  isEnd?: boolean;
  currentDate?: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
}

const statusColors = {
  todo: "schedule-todo",
  doing: "schedule-doing",
  done: "schedule-done",
};

export default function ScheduleItem({
  id,
  title,
  status,
  onClick,
  draggable,
  onDragStart,
}: ScheduleItemProps & { onDropDateChange?: (newDate: string) => void }) {
  return (
    <div
      className={`schedule-item ${statusColors[status]}`}
      onClick={onClick}
      draggable={draggable}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", id);
        if (onDragStart) onDragStart(e);
      }}
    >
      {title}
    </div>
  );
}
