"use client";
import { useState, useEffect } from "react";

// 할일 아이템 컨트롤 컴포넌트

export type TodoStatus = "todo" | "doing" | "done";

export interface TodoItemType {
  id: number; // 고유 번호
  text: string; // 제목
  tags: string[]; // 태그
  dates: string[]; // 시작, 종료 날짜
  contents: string; // 내용
  status: TodoStatus; // 상태
}

export default function useCtrlItems() {
  const [items, setItems] = useState<TodoItemType[]>([]);
  const [selectedItem, setSelectedItem] = useState<TodoItemType | null>(null);

  // ✅ JSON 파일에서 초기 데이터 불러오기
  useEffect(() => {
    fetch("/test-todos.json")
      .then((res) => res.json())
      .then((data) => {
        // 만약 dates가 배열 한 개만 있는 경우 [start, end]로 맞춰줌
        const normalized = data.map((item: TodoItemType) => ({
          ...item,
          dates:
            item.dates.length === 1
              ? [item.dates[0], item.dates[0]]
              : item.dates,
        }));
        setItems(normalized);
      })
      .catch(console.error);
  }, []);

  const handleAddItem = () => {
    const newItem: TodoItemType = {
      id: Date.now(),
      text: "",
      tags: [],
      contents: "",
      dates: [
        new Date().toISOString().split("T")[0],
        new Date().toISOString().split("T")[0],
      ],
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

  // ✅ updateItem 함수: 드래그 등으로 날짜 변경 시 사용
  const updateItem = (id: number, newDates: [string, string]) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, dates: newDates } : item))
    );
  };

  return {
    items,
    setItems,
    selectedItem,
    handleAddItem,
    handleOpenDetail,
    handleCloseDetail,
    handleSaveItem,
    updateItem,
  };
}
