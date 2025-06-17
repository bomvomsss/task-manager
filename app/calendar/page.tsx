"use client";
import "../styles/calendar.css";
import CalendarBody from "./components/CalendarBody";
import CalendarHeader from "./components/CalendarHeader";
import SelectedDate from "./components/SelectedDate";
import { CalendarContext } from "./hooks/useCalendarContext";
import useCalendar from "./hooks/useCalendar";
import useCtrlItems from "../hooks/useCtrlItems";

export default function CalendarPage() {
  const calendar = useCalendar();
  const {
    items,
    selectedItem,
    handleOpenDetail,
    handleCloseDetail,
    handleSaveItem,
    handleDeleteItem,
  } = useCtrlItems();
  return (
    <CalendarContext.Provider value={calendar}>
      <CalendarHeader />
      <CalendarBody
        daysInMonth={calendar.daysInMonth}
        selectedDate={calendar.selectedDate}
        currentDate={calendar.currentDate}
        items={items ?? []}
        selectedItem={selectedItem}
        handleOpenDetail={handleOpenDetail}
        handleCloseDetail={handleCloseDetail}
        handleSaveItem={handleSaveItem}
        handleDeleteItem={handleDeleteItem}
      />
      <SelectedDate />
    </CalendarContext.Provider>
  );
}
