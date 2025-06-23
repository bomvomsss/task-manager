"use client";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
} from "date-fns";
import { useState, useEffect } from "react";
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
  useEffect(() => {
    if (currentDate?.year && currentDate?.month) {
      const days = generateDaysInMonth(currentDate.year, currentDate.month);
      setDaysInMonth(days);
    }
  }, [currentDate.year, currentDate.month]);

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
    scheduledDate: {
      date: scheduledDate,
      scheduled: setScheduledDate,
    },
  } as unknown as CalendarContextType;
}
