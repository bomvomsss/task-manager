"use client";
import "../styles/calendar.css";
import CalendarBody from "./components/CalendarBody";
import CalendarHeader from "./components/CalendarHeader";
import SelectedDate from "./components/SelectedDate";
import { CalendarContext } from "./hooks/useCalendarContext";
import useCalendar from "./hooks/useCalendar";

export default function CalendarPage() {
  const calendar = useCalendar();

  return (
    <CalendarContext.Provider value={calendar}>
      <CalendarHeader />
      <CalendarBody />
      <SelectedDate />
    </CalendarContext.Provider>
  );
}
