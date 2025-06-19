"use client";

import { Container } from "react-bootstrap";
import ScheduleItem from "./ScheduleItem";
import { useTodos } from "@/app/context/TodoContext";
import AddItem from "@/app/components/AddItem";
import { differenceInCalendarDays } from "date-fns";
import { toStatusId } from "@/app/hooks/useAddItems";
import useCalendarContext from "../hooks/useCalendarContext";

export default function CalendarBody() {
  const {
    daysInMonth,
    selectedDate,
    currentDate,
    items,
    selectedItem,
    handleOpenDetail,
    handleCloseDetail,
    handleSaveItem,
  } = useCalendarContext();

  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  const { requestDelete } = useTodos();
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
        <div
          className='dayWrapper'
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {daysInMonth.map((date, idx) => {
            const yyyyMMdd = `${date.year}-${String(date.month).padStart(
              2,
              "0"
            )}-${String(date.day).padStart(2, "0")}`;

            // 해당 날짜에 시작하는 todo만 필터링
            const startingTodos = items.filter(
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
                style={{ width: "14.28%" }}
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

      <AddItem
        item={selectedItem}
        onSave={handleSaveItem}
        onDelete={
          selectedItem
            ? () =>
                requestDelete(
                  toStatusId(selectedItem.status),
                  String(selectedItem.id)
                )
            : undefined
        }
        show={!!selectedItem}
        onClose={handleCloseDetail}
      />
    </>
  );
}
