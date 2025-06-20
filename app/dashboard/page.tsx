"use client";
import { useRef, useEffect } from "react";
import "../styles/dashboard.css";
import { Container } from "react-bootstrap";
import BoardHeader from "./components/BoardHeader";
import AddItem from "../components/AddItem";
import useCtrlItems, { TodoItemType, TodoStatus } from "../hooks/useCtrlItems";
import BoardBody from "./components/BoardBody";
import supabase from "@/lib/supabaseClient";

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
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Supabase fetch error:", error);
      } else if (data) {
        const normalized = data.map((item) => ({
          ...item,
          dates:
            item.dates?.length === 1
              ? [item.dates[0], item.dates[0]]
              : item.dates,
        }));

        setItems(normalized);
      }
    };

    fetchTodos();
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

      <BoardBody
        items={items}
        handleOpenDetail={handleOpenDetail}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
      />
    </Container>
  );
}
