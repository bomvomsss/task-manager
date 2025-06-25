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
  const yyyyMMdd = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div id='dashBoard'>
      <Card
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "todo")}
      >
        <Card.Header className='toDo'>할 일</Card.Header>
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
      >
        <Card.Header className='doing'>진행중</Card.Header>
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
      >
        <Card.Header className='done'>완료</Card.Header>
        <div className='card-body'>
          {items
            .filter(
              (item) =>
                item.status === "done" &&
                item.end_date >= yyyyMMdd // 오늘 이후(포함)만 표시
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
