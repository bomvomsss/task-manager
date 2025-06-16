"use client";
import { useEffect, useState } from "react";
import CalendarPage from "./calendar/page";
import DashBoard from "./dashboard/page";
import { TodoItemType } from "./hooks/useCtrlItems";

export default function MainPage() {
  const [items, setItems] = useState<TodoItemType[]>([]);

  useEffect(() => {
    fetch("/test-todos.json")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <>
      <div>This is Home</div>
    </>
  );
}
