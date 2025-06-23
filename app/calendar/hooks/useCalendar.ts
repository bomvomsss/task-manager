"use client";
import supabase from "@/lib/supabaseClient";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
} from "date-fns";
import { useState, useEffect } from "react";
import { TodoItemType } from "@/app/hooks/useCtrlItems";
import type { CalendarContextType } from "./useCalendarContext";

export default function useCalendar(): CalendarContextType {
  // 캘린더 날짜, 선택된 날짜, 현재 날짜 등
  type DayInMonth = {
    year: string;
    month: string;
    day: string;
    date: string;
    dayIndexOfWeek: number;
  };
  const [daysInMonth, setDaysInMonth] = useState<DayInMonth[]>([]);
  // const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [scheduledDate, setScheduledDate] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<{
    year: string;
    month: string;
    day: string;
    date: string;
  }>(() => {
    const now = new Date();
    return {
      year: String(now.getFullYear()),
      month: String(now.getMonth() + 1).padStart(2, "0"),
      day: String(now.getDate()).padStart(2, "0"),
      date: format(now, "yyyy-MM-dd"),
    };
  });
  function generateDaysInMonth(year: string, month: string) {
    const firstDay = startOfMonth(new Date(Number(year), Number(month) - 1));
    const lastDay = endOfMonth(firstDay);
    const calendarStart = startOfWeek(firstDay, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(lastDay, { weekStartsOn: 0 });

    const days: DayInMonth[] = [];
    let day = calendarStart;
    while (day <= calendarEnd) {
      days.push({
        year: String(day.getFullYear()),
        month: String(day.getMonth() + 1).padStart(2, "0"),
        day: String(day.getDate()).padStart(2, "0"),
        date: format(day, "yyyy-MM-dd"),
        dayIndexOfWeek: day.getDay(),
      });
      day = addDays(day, 1);
    }
    return days;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (currentDate?.year && currentDate?.month) {
      const days = generateDaysInMonth(currentDate.year, currentDate.month);
      setDaysInMonth(days);
    }
  }, [currentDate.year, currentDate.month]);
  // 할 일 관련 상태
  const [items, setItems] = useState<TodoItemType[]>([]);
  const [selectedItem, setSelectedItem] = useState<TodoItemType | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: true }); // 필요시 정렬 기준 조정

      if (error) {
        console.error("Supabase fetch error:", error);
      } else if (data) {
        const normalized = data.map((item) => ({
          ...item,
          start_date: item.start_date ?? "",
          end_date: item.end_date ?? "",
        }));

        setItems(normalized);
      }
    };

    fetchTodos();
  }, [setItems]);

  // 할 일 상세/저장/삭제 등 메서드
  const handleOpenDetail = (item: TodoItemType) => setSelectedItem(item);
  const handleCloseDetail = () => setSelectedItem(null);
  const handleSaveItem = (item: TodoItemType) => {
    setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    setSelectedItem(null);
  };
  const handleDeleteItem = (item: TodoItemType) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    setSelectedItem(null);
  };

  // 캘린더 이동 메서드 예시
  const handlePrevYear = () => {
    setCurrentDate((prev) => ({
      ...prev,
      year: String(Number(prev.year) - 1),
    }));
  };
  const handleNextYear = () => {
    setCurrentDate((prev) => ({
      ...prev,
      year: String(Number(prev.year) + 1),
    }));
  };
  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      let month = Number(prev.month) - 1;
      let year = Number(prev.year);
      if (month < 1) {
        month = 12;
        year -= 1;
      }
      return {
        ...prev,
        year: String(year),
        month: String(month).padStart(2, "0"),
      };
    });
  };
  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      let month = Number(prev.month) + 1;
      let year = Number(prev.year);
      if (month > 12) {
        month = 1;
        year += 1;
      }
      return {
        ...prev,
        year: String(year),
        month: String(month).padStart(2, "0"),
      };
    });
  };

  return {
    currentDate,
    daysInMonth,
    dispatch: {
      handlePrevYear,
      handleNextYear,
      handlePrevMonth,
      handleNextMonth,
    },
    // selectedDate: {
    //   date: selectedDate,
    //   selectDate: setSelectedDate,
    // },
    scheduledDate: {
      date: scheduledDate,
      scheduled: setScheduledDate,
    },
    items,
    setItems,
    selectedItem,
    setSelectedItem,
    handleOpenDetail,
    handleCloseDetail,
    handleSaveItem,
    handleDeleteItem,
  };
}
