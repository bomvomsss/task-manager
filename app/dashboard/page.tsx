"use client";
import { useRef, useEffect } from "react";
import "../styles/dashboard.css";
import { Container, Card } from "react-bootstrap";
import BoardHeader from "./components/BoardHeader";
import TodoItem from "../components/TodoItem";
import AddItem from "../components/AddItem";
import useCtrlItems, { TodoItemType, TodoStatus } from "../hooks/useCtrlItems";

export default function DashBoard() {
  const {
    items,
    selectedItem,
    setItems,
    handleAddItem,
    handleOpenDetail,
    handleCloseDetail,
    handleSaveItem,
    handleDeleteItem,
  } = useCtrlItems();

  useEffect(() => {
    fetch("/test-todos.json")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, [setItems]);

  const dragItem = useRef<TodoItemType | null>(null);

  const handleDragStart = (e: React.DragEvent, item: TodoItemType) => {
    dragItem.current = item;
  };

  const handleDrop = (e: React.DragEvent, status: TodoStatus) => {
    e.preventDefault();
    if (dragItem.current) {
      handleSaveItem({ ...dragItem.current, status });
      dragItem.current = null;
    }
  };
  return (
    <Container>
      <BoardHeader onAddClick={handleAddItem} />
      <AddItem
        show={!!selectedItem}
        item={selectedItem}
        onSave={handleSaveItem}
        onClose={handleCloseDetail}
        onDelete={handleDeleteItem}
      />

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
    </Container>
  );
}
