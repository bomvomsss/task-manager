"use client";
import { createContext, useContext } from "react";
import { TodoItemType } from "@/app/hooks/useCtrlItems";

interface DateInfo {
  year: string;
  month: string;
  day: string;
}
export type CalendarDate = DateInfo & { date: string; dayIndexOfWeek: number };
export type { TodoItemType as CalendarItem } from "@/app/hooks/useCtrlItems";

export interface CalendarContextType {
  currentDate: DateInfo;
  daysInMonth: (DateInfo & { date: string; dayIndexOfWeek: number })[];
  dispatch: {
    handlePrevYear: () => void;
    handleNextYear: () => void;
    handlePrevMonth: () => void;
    handleNextMonth: () => void;
  };
  scheduledDate: {
    date: string | null;
    scheduled: (date: string) => void;
  };
  // 할일 관련 필드 및 메서드
  items: TodoItemType[];
  setItems: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
  selectedItem: TodoItemType | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<TodoItemType | null>>;
  handleUpdateItem: (
    id: string,
    newDates: { start_date: string; end_date: string }
  ) => void;
  handleOpenDetail: (item: TodoItemType) => void;
  handleCloseDetail: () => void;
  update: (id: string, updates: Partial<TodoItemType>) => void;
}

export const CalendarContext = createContext<CalendarContextType | null>(null);

export default function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendarContext must be used within CalendarProvider");
  }
  return context;
}
