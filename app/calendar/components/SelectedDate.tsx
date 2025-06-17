"use client";
import useCalendarContext from "../hooks/useCalendarContext";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  text: string;
  tags: string[];
  dates: string[];
  status: "todo" | "doing" | "done";
}

export default function SelectedDate() {
  const { selectedDate } = useCalendarContext();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("/test-todos.json")
      .then((res) => res.json())
      .then(setTodos)
      .catch((err) => console.error("Error loading todos", err));
  }, []);

  if (!selectedDate?.date) return null;

  const yyyyMMdd = selectedDate.date;

  const matchedTodos = todos.filter((todo) => todo.dates.includes(yyyyMMdd));

  return (
    <div className='selected-date-details'>
      <h4>{yyyyMMdd} 일정</h4>
      {matchedTodos.length === 0 ? (
        <p>일정이 없습니다.</p>
      ) : (
        <ul>
          {matchedTodos.map((todo) => (
            <li key={todo.id}>
              <strong>{todo.text}</strong> ({todo.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
