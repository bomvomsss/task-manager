import { useState } from "react";

export interface TodoItemType {
  id: number;
  text: string;
  tags: string[];
}

export default function useCtrlItems() {
  const [items, setItems] = useState<TodoItemType[]>([]);
  const [selectedItem, setSelectedItem] = useState<TodoItemType | null>(null);

  const handleAddItem = () => {
    const newItem: TodoItemType = {
      id: Date.now(),
      text: "",
      tags: [],
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
    selectedItem,
    handleAddItem,
    handleOpenDetail,
    handleCloseDetail,
    handleSaveItem,
    handleDeleteItem,
  };
}
