"use client";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ScheduleItem from "./ScheduleItem";
import { TodoItemType } from "@/app/hooks/useCtrlItems";
import AddItem from "@/app/components/AddItem";
import { differenceInCalendarDays } from "date-fns";
export interface CalendarBodyProps {
  daysInMonth: any[];
  selectedDate: any;
  currentDate: any;
  items: TodoItemType[];
  selectedItem: TodoItemType | null;
  handleOpenDetail: (item: TodoItemType) => void;
  handleCloseDetail: () => void;
  handleSaveItem: (item: TodoItemType) => void;
  handleDeleteItem: (item: TodoItemType) => void;
}

export default function CalendarBody({
  daysInMonth,
  selectedDate,
  currentDate,
  selectedItem,
  items,
  handleOpenDetail,
  handleCloseDetail,
  handleSaveItem,
  handleDeleteItem,
}: CalendarBodyProps) {
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  useEffect(() => {
    fetch("/test-todos.json")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Failed to load todos", err));
  }, []);

  const weeks = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <>
      <Container>
        <div className='weekWrapper'>
          {weeks.map((week: string, index) => (
            <div
              key={week}
              className={`weekItem ${
                index === 0 ? "sunday" : index === 6 ? "saturday" : ""
              }`}
            >
              {week}
            </div>
          ))}
        </div>
        <div className='dayWrapper'>
          {daysInMonth.map((date) => {
            const yyyyMMdd = `${date.year}-${String(date.month).padStart(
              2,
              "0"
            )}-${String(date.day).padStart(2, "0")}`;

            // 해당 날짜에 시작하는 todo만 필터링
            const startingTodos = todos.filter(
              (todo) => todo.dates && todo.dates[0] === yyyyMMdd
            );
            const isCurrentMonth = currentDate.month === date.month;
            const isSelectedDate = selectedDate?.date === date.date;
            const isCurrentDay = currentDate.day === date.day;
            const isSunday = date.dayIndexOfWeek === 0;
            const isSaturday = date.dayIndexOfWeek === 6;

            const classNames = [
              "dayItem",
              isCurrentMonth ? "currentMonth" : "otherMonth",
              isSelectedDate ? "selected" : "",
              isSunday ? "sunday" : "",
              isSaturday ? "saturday" : "",
              isCurrentDay ? "today" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                onClick={() => selectedDate.selectDate(date.date)}
                className={classNames}
                key={`dayItem-${date.year}-${date.month}-${date.day}`}
              >
                <span>{date.day}</span>
                {startingTodos.map((todo) => {
                  // spanLength 계산 (종료일 - 시작일 + 1)
                  const [start, end] =
                    todo.dates.length === 2
                      ? todo.dates
                      : [todo.dates[0], todo.dates[0]];
                  const spanLength =
                    start && end
                      ? differenceInCalendarDays(
                          new Date(end),
                          new Date(start)
                        ) + 1
                      : 1;
                  return (
                    <div
                      key={todo.id}
                      className='multiDayWrapper'
                      style={{
                        gridColumn: `span ${spanLength}`,
                        width: `calc(${spanLength * 100}% + ${
                          (spanLength - 1) * 30
                        }px)`,
                      }}
                    >
                      <ScheduleItem
                        itemId={todo.id}
                        text={todo.text}
                        status={todo.status}
                        dates={[start, end]}
                        currentDate={yyyyMMdd}
                        onClick={() => {
                          handleOpenDetail(todo);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Container>

      {/* 📌 AddItem 모달 */}
      <AddItem
        item={selectedItem}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
        show={!!selectedItem}
        onClose={handleCloseDetail}
      />
    </>
  );
}
