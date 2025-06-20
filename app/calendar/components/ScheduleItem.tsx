import useCtrlItems from "@/app/hooks/useCtrlItems";

export interface ScheduleItemProps {
  itemId: number;
  text: string;
  status: "todo" | "doing" | "done";
  dates: [string, string];
  currentDate: string;
  onDoubleClick: () => void;
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
  onDoubleClick,
}: ScheduleItemProps) {
  const id = itemId;

  return (
    <div
      className={`schedule-item ${statusColors[status]}`}
      onDoubleClick={onDoubleClick}
    >
      {text}
    </div>
  );
}
