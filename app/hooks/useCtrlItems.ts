"use client";
import supabase from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import { useTodos } from "@/app/context/TodoContext";
import { toStatusId } from "./useAddItems";

export type TodoStatus = "todo" | "doing" | "done";

export interface TodoItemType {
  id: string;
  title: string; // 제목
  tags?: string[]; // 태그
  start_date: string; // 시작 날짜
  end_date: string; // 종료 날짜
  contents: string; // 내용
  status: TodoStatus; // 상태
}

export default function useCtrlItems() {
  const [items, setItems] = useState<TodoItemType[]>([]);
  const [selectedItem, setSelectedItem] = useState<TodoItemType | null>(null);
  const { requestDelete } = useTodos();

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: true }); // 필요시 정렬 기준 조정

      if (error) {
        console.error("Supabase fetch error:", error);
      } else if (data) {
        const normalized = data.map((item) => ({
          ...item,
          start_date: item.start_date ?? "",
          end_date: item.end_date ?? "",
        }));

        setItems(normalized);
      }
    };

    fetchTodos();
  }, [setItems]);

  const handleAddItem = () => {
    const newItem: Omit<TodoItemType, "id"> = {
      title: "",
      tags: [],
      contents: "",
      start_date: new Date().toISOString().split("T")[0],
      end_date: new Date().toISOString().split("T")[0],
      status: "todo", // 기본값
    };
    setSelectedItem(newItem as TodoItemType);
  };

  const handleOpenDetail = (item: TodoItemType) => {
    setSelectedItem(item);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  const handleSaveItem = async (item: TodoItemType) => {
    try {
      if (item.id !== "" && items.find((i) => i.id === item.id)) {
        const { data, error } = await supabase
          .from("todos")
          .update({
            title: item.title,
            tags: item.tags ?? [],
            start_date: item.start_date,
            end_date: item.end_date,
            contents: item.contents ?? "",
            status: item.status,
          })
          .eq("id", item.id)
          .select()
          .single();

        if (error) throw error;

        if (data) {
          setItems((prev) =>
            prev.map((i) =>
              i.id === item.id
                ? { ...i, ...data, contents: data.contents ?? i.contents }
                : i
            )
          );
        }
      } else {
        const { data, error } = await supabase
          .from("todos")
          .insert([
            {
              title: item.title,
              tags: item.tags ?? [],
              start_date: item.start_date,
              end_date: item.end_date,
              contents: item.contents ?? "",
              status: item.status,
            },
          ])
          .select()
          .single();

        if (error) throw error;

        setItems((prev) => [...prev, data]);
      }

      setSelectedItem(null);
    } catch (error) {
      console.error("Failed to save item:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteItem = (item: TodoItemType) => {
    const statusId = toStatusId(item.status);
    requestDelete(statusId, String(item.id));
  };

  const updateItem = (id: string, newDates: string[]) => {
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
    handleDeleteItem,
    updateItem,
  };
}
