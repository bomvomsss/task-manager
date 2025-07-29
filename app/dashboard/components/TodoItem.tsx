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
  start_date,
  end_date,
  contents,
  tags,
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
      <div className='todo-title'>{title}</div>
      <div className='todo-content'>{contents}</div>
      <div className='todo-dates'>
        {start_date && <span>{getDateOnly(start_date)}</span>}
        {start_date && end_date && <span> ― </span>}
        {end_date && <span>{getDateOnly(end_date)}</span>}
      </div>
      <div className='todo-tags-list'>
        {Array.isArray(tags)
          ? tags.map((tag: string, idx: number) => (
              <span key={idx} className='todo-tags'>
                {tag}
              </span>
            ))
          : tags}
      </div>
    </div>
  );
}
