"use client";

import { Container } from "react-bootstrap";
import ScheduleItem from "./ScheduleItem";
import { useTodos } from "@/app/context/TodoContext";
import AddItem from "@/app/components/AddItem";
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

  const weeksInMonth = [];
  for (let i = 0; i < daysInMonth.length; i += 7) {
    weeksInMonth.push(daysInMonth.slice(i, i + 7));
  }

  // 주 단위로 렌더링
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
          const weekStart = week[0].date;
          const weekEnd = week[week.length - 1].date;
          // 1. 이 주에 걸친 일정만 필터링
          let weekTodos = items.filter((todo) => {
            const [start, end] = todo.dates;
            return start <= weekEnd && end >= weekStart;
          });
          // 2. 시작일 오름차순으로 정렬
          weekTodos = weekTodos.slice().sort((a, b) => {
            if (a.dates[0] < b.dates[0]) return -1;
            if (a.dates[0] > b.dates[0]) return 1;
            return 0;
          });
          // 3. 트랙(행) x 날짜(week.length) 2차원 배열 생성
          const trackMatrix: (any | null)[][] = [];
          weekTodos.forEach((todo) => {
            const [start, end] = todo.dates;
            const blockStart = start < weekStart ? weekStart : start;
            const blockEnd = end > weekEnd ? weekEnd : end;
            const startIdx = week.findIndex((d) => d.date === blockStart);
            const endIdx = week.findIndex((d) => d.date === blockEnd);

            // 빈 트랙 찾기
            let trackIdx = 0;
            while (
              trackMatrix[trackIdx]
                ?.slice(startIdx, endIdx + 1)
                .some((cell) => cell)
            ) {
              trackIdx++;
            }
            // 트랙이 없으면 새로 생성
            if (!trackMatrix[trackIdx]) {
              trackMatrix[trackIdx] = Array(week.length).fill(null);
            }
            // 해당 트랙에 일정 배치
            for (let i = startIdx; i <= endIdx; i++) {
              trackMatrix[trackIdx][i] = {
                ...todo,
                blockStart,
                blockEnd,
                startIdx,
                endIdx,
              };
            }
          });

          // 2. 날짜 칸 렌더링
          return (
            <div
              className='weekRow'
              key={`week-${weekIdx}`}
              style={{ display: "flex" }}
            >
              {week.map((date, dayIdx) => {
                const yyyyMMdd = date.date;
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

                // 3. 각 트랙(row)별로 일정이 있으면 ScheduleItem, 없으면 빈 div(공간 차지)
                return (
                  <div
                    onClick={() => selectedDate.selectDate(date.date)}
                    className={classNames}
                    key={`dayItem-${date.year}-${date.month}-${date.day}`}
                  >
                    <span>{date.day}</span>
                    {trackMatrix.map((track, rowIdx) => {
                      const todo = track[dayIdx];
                      // 이 날짜가 이 트랙에서 이 일정의 시작점인 경우만 Bar 렌더
                      if (!todo || dayIdx !== todo.startIdx)
                        return <div key={rowIdx} className='itemBar' />;
                      const spanLength = todo.endIdx - todo.startIdx + 1;
                      return (
                        <div
                          key={todo.id}
                          className='multiDayWrapper'
                          style={{
                            width: `calc(${spanLength * 100}% + ${
                              (spanLength - 1) * 15
                            }px)`,
                            // marginTop: rowIdx === 0 ? 0 : 5,
                          }}
                        >
                          <ScheduleItem
                            itemId={todo.id}
                            text={todo.text}
                            status={todo.status}
                            dates={[
                              todo.dates[0],
                              todo.dates[1] ?? todo.dates[0],
                            ]}
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
