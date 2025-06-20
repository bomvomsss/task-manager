import { TodoItemType } from "@/app/hooks/useCtrlItems";

export interface ScheduleItemProps extends TodoItemType {
  onDoubleClick: () => void;
  isStart?: boolean;
  isEnd?: boolean;
  // currentDate: string;
}

const statusColors = {
  todo: "schedule-todo",
  doing: "schedule-doing",
  done: "schedule-done",
};

export default function ScheduleItem({
  title,
  status,
  onDoubleClick,
}: // currentDate,
ScheduleItemProps) {
  return (
    <div
      className={`schedule-item ${statusColors[status]}`}
      onDoubleClick={onDoubleClick}
    >
      {title}
    </div>
  );
}
