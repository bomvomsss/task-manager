import ScheduleItem from "./ScheduleItem";
import useTrackMatrix from "../hooks/useTrackMatrix";
import { CalendarItem, CalendarDate } from "../hooks/useCalendarContext";
import { TodoItemType } from "@/app/hooks/useCtrlItems";

interface DateInfo {
  year: string;
  month: string;
  day: string;
}

interface WeekRowProps {
  week: CalendarDate[];
  weekTodos: CalendarItem[];
  currentDate: DateInfo;
  handleOpenDetail: (item: CalendarItem) => void;
  items: TodoItemType[];
  handleUpdateItem: (
    id: string,
    newDates: { start_date: string; end_date: string }
  ) => void;
}

export default function WeekRow({
  week,
  weekTodos,
  currentDate,
  handleOpenDetail,
  items,
  handleUpdateItem,
}: WeekRowProps) {
  const trackMatrix = useTrackMatrix(week, weekTodos);
  return (
    <div className='weekRow' style={{ display: "flex" }}>
      {week.map((date, dayIdx) => {
        const isCurrentMonth = currentDate.month === date.month;
        // 오늘 날짜 계산을 시스템 날짜 기준으로 변경
        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
        const isCurrentDay = date.date === todayStr;
        const isSunday = date.dayIndexOfWeek === 0;
        const isSaturday = date.dayIndexOfWeek === 6;
        const classNames = [
          "dayItem",
          isCurrentMonth ? "currentMonth" : "otherMonth",
          isSunday ? "sunday" : "",
          isSaturday ? "saturday" : "",
          isCurrentDay ? "today" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <div
            className={classNames}
            key={`dayItem-${date.year}-${date.month}-${date.day}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const todoId = e.dataTransfer.getData("text/plain");
              const newDateStr = date.date; // yyyy-mm-dd 형태
              // 전체 items에서 todo 찾기
              const todo = items.find((t) => t.id === todoId);
              if (!todo) return;
              const diff =
                new Date(todo.end_date).getTime() -
                new Date(todo.start_date).getTime();
              const newStart = new Date(newDateStr);
              const newEnd = new Date(newStart.getTime() + diff);
              handleUpdateItem(todo.id, {
                start_date: newStart.toISOString().split("T")[0],
                end_date: newEnd.toISOString().split("T")[0],
              });
            }}
          >
            <span>{date.day}</span>
            {trackMatrix.map((track, rowIdx) => {
              const todo = track[dayIdx];
              if (!todo || dayIdx !== todo.startIdx)
                return (
                  <div
                    key={rowIdx}
                    className='itemBar'
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const todoId = e.dataTransfer.getData("text/plain");
                      const newDateStr = date.date; // yyyy-mm-dd 형태
                      // 전체 items에서 todo 찾기
                      const todo = items.find((t) => t.id === todoId);
                      if (!todo) return;
                      const diff =
                        new Date(todo.end_date).getTime() -
                        new Date(todo.start_date).getTime();
                      const newStart = new Date(newDateStr);
                      const newEnd = new Date(newStart.getTime() + diff);
                      handleUpdateItem(todo.id, {
                        start_date: newStart.toISOString().split("T")[0],
                        end_date: newEnd.toISOString().split("T")[0],
                      });
                    }}
                  />
                );
              const spanLength = todo.endIdx - todo.startIdx + 1;
              return (
                <div
                  key={todo.id}
                  className='multiDayWrapper'
                  style={{
                    width: `calc(${spanLength * 100}% + ${
                      (spanLength - 1) * 15
                    }px)`,
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const todoId = e.dataTransfer.getData("text/plain");
                    const newDateStr = date.date; // yyyy-mm-dd 형태
                    // 전체 items에서 todo 찾기
                    const todo = items.find((t) => t.id === todoId);
                    if (!todo) return;
                    const diff =
                      new Date(todo.end_date).getTime() -
                      new Date(todo.start_date).getTime();
                    const newStart = new Date(newDateStr);
                    const newEnd = new Date(newStart.getTime() + diff);
                    handleUpdateItem(todo.id, {
                      start_date: newStart.toISOString().split("T")[0],
                      end_date: newEnd.toISOString().split("T")[0],
                    });
                  }}
                >
                  <ScheduleItem
                    id={todo.id}
                    title={todo.title}
                    status={todo.status}
                    start_date={todo.start_date}
                    end_date={todo.end_date}
                    contents={todo.contents}
                    onDoubleClick={() => {
                      handleOpenDetail(todo);
                    }}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", todo.id);
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
}
