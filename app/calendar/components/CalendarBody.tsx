"use client";
import { Container } from "react-bootstrap";
import useCalendarContext from "../hooks/useCalendarContext";
import WeekRow from "./WeekRow";

export default function CalendarBody() {
  const { daysInMonth, currentDate, items, handleOpenDetail } =
    useCalendarContext();

  // 요일 헤더
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];

  // daysInMonth를 주 단위로 분할
  const weeksInMonth = [];
  for (let i = 0; i < daysInMonth.length; i += 7) {
    weeksInMonth.push(daysInMonth.slice(i, i + 7));
  }

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
        {weeksInMonth.map((week, weekIdx) => {
          // 해당 주에 걸친 일정만 필터링
          const weekStart = week[0].date;
          const weekEnd = week[week.length - 1].date;
          let weekTodos = (items || []).filter((todo) => {
            const startDate = todo.start_date;
            const endDate = todo.end_date;
            return startDate <= weekEnd && endDate >= weekStart;
          });
          // 시작일 오름차순 정렬
          weekTodos = weekTodos.slice().sort((a, b) => {
            if (a.start_date < b.start_date) return -1;
            if (a.start_date > b.start_date) return 1;
            return 0;
          });
          return (
            <WeekRow
              key={`week-${weekIdx}`}
              week={week}
              weekTodos={weekTodos}
              handleOpenDetail={handleOpenDetail}
              currentDate={currentDate}
            />
          );
        })}
      </div>
    </Container>
  );
}
