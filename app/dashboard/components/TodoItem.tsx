import { TodoItemType } from "../../hooks/useCtrlItems";
import { BsExclamationCircle } from "react-icons/bs";
import { useRef } from "react";

function getDateOnly(dateStr: string) {
  return dateStr.split("T")[0];
}
interface TodoItemProps extends TodoItemType {
  onDoubleClick: () => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
}
export default function TodoItem({
  title,
  onDoubleClick,
  draggable,
  onDragStart,
  end_date,
}: TodoItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const todayStr = new Date().toISOString().split("T")[0];
  const isOverdue =
    end_date && getDateOnly(end_date) < todayStr && status !== "done";
  return (
    <div
      ref={itemRef}
      className='todo-item'
      onDoubleClick={onDoubleClick}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      {isOverdue && (
        <BsExclamationCircle color='red' style={{ marginRight: 6 }} />
      )}
      {title}
    </div>
  );
}
