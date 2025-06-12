"use client";
import "../styles/calendar.css";
import CalendarBody from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";
import { CalendarContext } from "./hooks/useCalendarContext";
import useCalendar from "./hooks/useCalendar";

export default function CalendarPage() {
  const calendar = useCalendar();

  return (
    <CalendarContext.Provider value={calendar}>
      <CalendarHeader />
      <CalendarBody />
    </CalendarContext.Provider>
  );
}
