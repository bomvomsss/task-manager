"use client";
import { Container } from "react-bootstrap";
import AddItem from "@/app/components/AddItem";
import { useTodos } from "@/app/context/TodoContext";
import { toStatusId } from "@/app/hooks/useAddItems";
import useCalendarContext from "../hooks/useCalendarContext";
import useCellWidths from "../hooks/useCellWidths";
import WeekRow from "./WeekRow";

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
  const { requestDelete } = useTodos();

  // 요일 헤더
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];

  // daysInMonth를 주 단위로 분할
  const weeksInMonth = [];
  for (let i = 0; i < daysInMonth.length; i += 7) {
    weeksInMonth.push(daysInMonth.slice(i, i + 7));
  }

  // 날짜 셀별 ref와 width 측정 (커스텀 훅 사용)
  const { dayRefs, cellWidths } = useCellWidths(daysInMonth.length);

  return (
    <Container>
      <div className="weekWrapper">
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
      <div className="dayWrapper">
        {weeksInMonth.map((week, weekIdx) => {
          // 해당 주에 걸친 일정만 필터링
          const weekStart = week[0].date;
          const weekEnd = week[week.length - 1].date;
          let weekTodos = items.filter((todo) => {
            const [start, end] = todo.dates;
            return start <= weekEnd && end >= weekStart;
          });
          // 시작일 오름차순 정렬
          weekTodos = weekTodos.slice().sort((a, b) => {
            if (a.dates[0] < b.dates[0]) return -1;
            if (a.dates[0] > b.dates[0]) return 1;
            return 0;
          });
          return (
            <WeekRow
              key={`week-${weekIdx}`}
              week={week}
              weekTodos={weekTodos}
              weekIdx={weekIdx}
              cellWidths={cellWidths}
              handleOpenDetail={handleOpenDetail}
              selectedDate={selectedDate}
              currentDate={currentDate}
              dayRefs={dayRefs}
            />
          );
        })}
      </div>
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
    </Container>
  );
}
