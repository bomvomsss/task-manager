"use client";
import useCalendarContext from "../hooks/useCalendarContext";
import { useEffect, useState } from "react";
import { TodoItemType } from "@/app/hooks/useCtrlItems";
import supabase from "@/lib/supabaseClient";

export default function SelectedDate() {
  const { selectedDate } = useCalendarContext();
  const [items, setItems] = useState<TodoItemType[]>([]);

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

  if (!selectedDate?.date) return null;

  const yyyyMMdd = selectedDate.date;

  // 기간 내에 포함된 일정도 모두 표시
  const matchedTodos = items.filter((item) => {
    const start = item.start_date;
    const end = item.end_date;
    return start <= yyyyMMdd && end >= yyyyMMdd;
  });

  return (
    <div className='selected-date-details'>
      <h4>{yyyyMMdd} 일정</h4>
      {matchedTodos.length === 0 ? (
        <p>일정이 없습니다.</p>
      ) : (
        <ul>
          {matchedTodos.map((todo) => (
            <li key={todo.id}>
              <strong>{todo.title}</strong> ({todo.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
