"use client";
import TodayTodo from "./components/TodayTodo";
import { CalendarContext } from "../calendar/hooks/useCalendarContext";
import useCalendar from "../calendar/hooks/useCalendar";
import "../styles/main.css";

export default function Main() {
  const calendar = useCalendar();
  return (
    <div>
      <CalendarContext.Provider value={calendar}>
        <TodayTodo />
      </CalendarContext.Provider>
    </div>
  );
}
