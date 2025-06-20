import { TodoItemType } from "../../hooks/useCtrlItems";

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
}: TodoItemProps) {
  return (
    <div
      className='todo-item'
      onDoubleClick={onDoubleClick}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      {title}
    </div>
  );
}
