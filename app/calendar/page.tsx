"use client";
import "../styles/calendar.css";
import CalendarBody from "./components/CalendarBody";
import CalendarHeader from "./components/CalendarHeader";
import AddItem from "../components/AddItem";
import { CalendarContext } from "./hooks/useCalendarContext";
import useCtrlItems from "../hooks/useCtrlItems";
import useCalendar from "./hooks/useCalendar";

export default function CalendarPage() {
  const calendar = useCalendar();
  const { handleAddItem, selectedItem, handleSaveItem, handleCloseDetail } =
    useCtrlItems();
  return (
    <CalendarContext.Provider value={calendar}>
      <CalendarHeader onAddClick={handleAddItem} />
      <CalendarBody />
      <AddItem
        show={!!selectedItem}
        item={selectedItem}
        onSave={handleSaveItem}
        onClose={handleCloseDetail}
      />
    </CalendarContext.Provider>
  );
}
