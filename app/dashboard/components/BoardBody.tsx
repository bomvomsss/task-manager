import { Card } from "react-bootstrap";
import TodoItem from "../../components/TodoItem";
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
  return (
    <div id='dashBoard'>
      <Card
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "todo")}
      >
        <Card.Header>할 일</Card.Header>
        <div className='card-body'>
          {items
            .filter((item) => item.status === "todo")
            .map((item) => (
              <TodoItem
                key={item.id}
                {...item}
                onClick={() => handleOpenDetail(item)}
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
        <Card.Header>진행중</Card.Header>
        <div className='card-body'>
          {items
            .filter((item) => item.status === "doing")
            .map((item) => (
              <TodoItem
                key={item.id}
                {...item}
                onClick={() => handleOpenDetail(item)}
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
        <Card.Header>완료</Card.Header>
        <div className='card-body'>
          {items
            .filter((item) => item.status === "done")
            .map((item) => (
              <TodoItem
                key={item.id}
                {...item}
                onClick={() => handleOpenDetail(item)}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
              />
            ))}
        </div>
      </Card>
    </div>
  );
}
