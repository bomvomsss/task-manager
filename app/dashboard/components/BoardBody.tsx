import { Card } from "react-bootstrap";
import TodoItem from "./TodoItem";
import { TodoItemType, TodoStatus } from "../../hooks/useCtrlItems";

interface BoardBodyProps {
  items: TodoItemType[];
  handleOpenDetail: (item: TodoItemType) => void;
  handleDragStart: (e: React.DragEvent, item: TodoItemType) => void;
  handleDrop: (e: React.DragEvent, status: TodoStatus) => void;
}

export default function BoardBody({
  items,
  handleOpenDetail,
  handleDragStart,
  handleDrop,
}: BoardBodyProps) {
  const today = new Date();
  const yyyyMMdd = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div id='dashBoard'>
      <Card
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "todo")}
        className='toDo'
      >
        <Card.Header>TO DO</Card.Header>
        <div className='card-body'>
          {items
            .filter((item) => item.status === "todo")
            .map((item) => (
              <TodoItem
                key={item.id}
                {...item}
                onDoubleClick={() => handleOpenDetail(item)}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
              />
            ))}
        </div>
      </Card>

      <Card
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "doing")}
        className='doing'
      >
        <Card.Header>DOING</Card.Header>
        <div className='card-body'>
          {items
            .filter((item) => item.status === "doing")
            .map((item) => (
              <TodoItem
                key={item.id}
                {...item}
                onDoubleClick={() => handleOpenDetail(item)}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
              />
            ))}
        </div>
      </Card>
      <Card
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "done")}
        className='done'
      >
        <Card.Header>DONE</Card.Header>
        <div className='card-body'>
          {items
            .filter(
              (item) => item.status === "done" && item.end_date >= yyyyMMdd // 오늘 이후(포함)만 표시
            )
            .map((item) => (
              <TodoItem
                key={item.id}
                {...item}
                onDoubleClick={() => handleOpenDetail(item)}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
              />
            ))}
        </div>
      </Card>
    </div>
  );
}
