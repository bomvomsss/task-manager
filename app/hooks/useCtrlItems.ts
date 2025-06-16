import { useState } from "react";

// 할일 아이템 컨트롤 컴포넌트

export type TodoStatus = "todo" | "doing" | "done";

export interface TodoItemType {
  id: number; // 고유 번호
  text: string; // 내용
  tags: string[]; // 태그
  dates: string[]; // 날짜
  status: TodoStatus; // 상태
}

export default function useCtrlItems() {
  const [items, setItems] = useState<TodoItemType[]>([]);
  const [selectedItem, setSelectedItem] = useState<TodoItemType | null>(null);

  const handleAddItem = () => {
    const newItem: TodoItemType = {
      id: Date.now(),
      text: "",
      tags: [],
      dates: [],
      status: "todo", // 기본값
    };
    setSelectedItem(newItem);
  };

  const handleOpenDetail = (item: TodoItemType) => {
    setSelectedItem(item);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  const handleSaveItem = (updated: TodoItemType) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.id === updated.id);
      if (exists) {
        return prev.map((item) => (item.id === updated.id ? updated : item));
      } else {
        return [...prev, updated];
      }
    });
    handleCloseDetail();
  };

  const handleDeleteItem = (item: TodoItemType) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    handleCloseDetail();
  };

  return {
    items,
    setItems,
    selectedItem,
    handleAddItem,
    handleOpenDetail,
    handleCloseDetail,
    handleSaveItem,
    handleDeleteItem,
  };
}
