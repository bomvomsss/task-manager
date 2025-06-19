"use client";
import { useRef, useEffect } from "react";
import "../styles/dashboard.css";
import { Container } from "react-bootstrap";
import BoardHeader from "./components/BoardHeader";
import AddItem from "../components/AddItem";
import useCtrlItems, { TodoItemType, TodoStatus } from "../hooks/useCtrlItems";
import BoardBody from "./components/BoardBody";

export default function DashBoard() {
  const {
    items,
    selectedItem,
    setItems,
    handleAddItem,
    handleOpenDetail,
    handleCloseDetail,
    handleSaveItem,
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
      />

      <BoardBody
        items={items}
        handleOpenDetail={handleOpenDetail}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
      />
    </Container>
  );
}
