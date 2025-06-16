import { TodoItemType } from "../hooks/useCtrlItems";

interface TodoItemProps extends TodoItemType {
  onClick: () => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
}

export default function TodoItem({
  text,
  onClick,
  draggable,
  onDragStart,
}: TodoItemProps) {
  return (
    <div
      className='todo-item'
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      {text}
    </div>
  );
}
