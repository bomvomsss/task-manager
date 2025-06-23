import ScheduleItem from "./ScheduleItem";
import useTrackMatrix from "../hooks/useTrackMatrix";
import { CalendarItem, CalendarDate } from "../hooks/useCalendarContext";

interface WeekRowProps {
  week: CalendarDate[];
  weekTodos: CalendarItem[];
  handleOpenDetail: (item: CalendarItem) => void;
  // selectedDate: any;
  currentDate: any;
}

export default function WeekRow({
  week,
  weekTodos,
  handleOpenDetail,
  // selectedDate,
  currentDate,
}: WeekRowProps) {
  const trackMatrix = useTrackMatrix(week, weekTodos);
  return (
    <div className='weekRow' style={{ display: "flex" }}>
      {week.map((date, dayIdx) => {
        const isCurrentMonth = currentDate.month === date.month;
        // const isSelectedDate = selectedDate?.date === date.date;
        const isCurrentDay =
          currentDate.year === date.year &&
          currentDate.month === date.month &&
          currentDate.day === date.day;
        const isSunday = date.dayIndexOfWeek === 0;
        const isSaturday = date.dayIndexOfWeek === 6;
        const classNames = [
          "dayItem",
          isCurrentMonth ? "currentMonth" : "otherMonth",
          // isSelectedDate ? "selected" : "",
          isSunday ? "sunday" : "",
          isSaturday ? "saturday" : "",
          isCurrentDay ? "today" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <div
            // onClick={() => selectedDate.selectDate(date.date)}
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
                    currentDate={String(date.date)}
                    onDoubleClick={() => {
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
