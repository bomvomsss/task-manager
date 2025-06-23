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
  const ctrl = useCtrlItems();

  return (
    <CalendarContext.Provider value={{ ...calendar, ...ctrl }}>
      <CalendarHeader onAddClick={ctrl.handleAddItem} />
      <CalendarBody />
      <AddItem
        show={!!ctrl.selectedItem}
        item={ctrl.selectedItem}
        onSave={ctrl.handleSaveItem}
        onClose={ctrl.handleCloseDetail}
        onDelete={ctrl.handleDeleteItem}
      />
    </CalendarContext.Provider>
  );
}
