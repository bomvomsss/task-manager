"use client";
import supabase from "@/lib/supabaseClient";
import useCalendarContext from "../../calendar/hooks/useCalendarContext";
import { useEffect, useState } from "react";
import { TodoItemType } from "@/app/hooks/useCtrlItems";
import { Container } from "react-bootstrap";

export default function TodayTodo() {
  const { currentDate } = useCalendarContext();
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

  // 오늘 날짜(yyyy-MM-dd)
  const yyyyMMdd = currentDate
    ? `${currentDate.year}-${String(currentDate.month).padStart(
        2,
        "0"
      )}-${String(currentDate.day).padStart(2, "0")}`
    : null;
  if (!yyyyMMdd) return null;

  // 기간 내에 포함된 일정도 모두 표시
  const matchedTodos = items.filter((item) => {
    const start = item.start_date;
    const end = item.end_date;
    return start <= yyyyMMdd && end >= yyyyMMdd;
  });

  return (
    <Container className='pt-5'>
      <div className='current-date-details'>
        <h4 className='mb-5'>{yyyyMMdd} 일정</h4>
        {matchedTodos.length === 0 ? (
          <p>일정이 없습니다.</p>
        ) : (
          <ul className='list-group'>
            {matchedTodos.map((todo) => (
              <li key={todo.id} className='list-group-item'>
                <div className='d-flex align-items-center'>
                  <span
                    className={`badge rounded-pill ${
                      todo.status === "todo"
                        ? "bg-primary"
                        : todo.status === "doing"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {todo.status}
                  </span>
                  <h5 className='ms-2'>{todo.title}</h5>
                </div>
                <p className='ms-2 mt-3'>{todo.contents}</p>
                <div className='todo-badge-list'>
                  {Array.isArray(todo.tags)
                    ? todo.tags.map((tag: string, idx: number) => (
                        <span key={idx} className='todo-badge'>
                          {tag}
                        </span>
                      ))
                    : todo.tags}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}
