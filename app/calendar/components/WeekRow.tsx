import ScheduleItem from "./ScheduleItem";
import useTrackMatrix from "../hooks/useTrackMatrix";
import { CalendarItem, CalendarDate } from "../hooks/useCalendarContext";

interface WeekRowProps {
  week: CalendarDate[];
  weekTodos: CalendarItem[];
  handleOpenDetail: (item: CalendarItem) => void;
  currentDate: any;
}

export default function WeekRow({
  week,
  weekTodos,
  handleOpenDetail,
  currentDate,
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
          >
            <span>{date.day}</span>
            {trackMatrix.map((track, rowIdx) => {
              const todo = track[dayIdx];
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
                  }}
                >
                  <ScheduleItem
                    id={todo.id}
                    title={todo.title}
                    status={todo.status}
                    start_date={todo.start_date}
                    end_date={todo.end_date}
                    contents={todo.contents}
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
}
