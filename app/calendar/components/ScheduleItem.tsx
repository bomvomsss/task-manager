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
  text,
  status,
  onClick,
}: ScheduleItemProps) {
  return (
    <div className={`schedule-item ${statusColors[status]}`} onClick={onClick}>
      {text}
      <div
        className='resize-handle'
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      />
    </div>
  );
}
