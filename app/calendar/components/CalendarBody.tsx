"use client";
import useCalendarContext from "../hooks/useCalendarContext";
import { Container } from "react-bootstrap";

export default function CalendarBody() {
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  const { daysInMonth, selectedDate, currentDate } = useCalendarContext();

  return (
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
          const isCurrentMonth = currentDate.month === date.month;
          const isSelectedDate = selectedDate?.date === date.date;
          const isCurrentDay = currentDate.day === date.day;
          const isSunday = date.dayIndexOfWeek === 0;
          const isSatyrday = date.dayIndexOfWeek === 6;

          const classNames = [
            "dayItem",
            isCurrentMonth ? "currentMonth" : "otherMonth",
            isSelectedDate ? "selected" : "",
            isSunday ? "sunday" : "",
            isSatyrday ? "saturday" : "",
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
            </div>
          );
        })}
      </div>
    </Container>
  );
}
