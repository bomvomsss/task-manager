"use client";
import "../styles/calendar.css";
import CalendarBody from "./components/CalendarBody";
import CalendarHeader from "./components/CalendarHeader";
import SelectedDate from "./components/SelectedDate";
import useCalendar from "./hooks/useCalendar";

export default function CalendarPage() {
  const calendar = useCalendar();

  return (
    <>
      <CalendarHeader
        dispatch={calendar.dispatch}
        currentDate={calendar.currentDate}
      />
      <CalendarBody
        daysInMonth={calendar.daysInMonth}
        selectedDate={calendar.selectedDate}
        currentDate={calendar.currentDate}
      />
      <SelectedDate selectedDate={calendar.selectedDate} />
    </>
  );
}
