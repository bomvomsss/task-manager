import { TodoItemType } from "../hooks/useCtrlItems";

interface TodoItemProps extends TodoItemType {
  onClick: () => void;
}

export default function TodoItem({ text, onClick }: TodoItemProps) {
  return (
    <div className='todo-item' onClick={onClick}>
      {text}
    </div>
  );
}
