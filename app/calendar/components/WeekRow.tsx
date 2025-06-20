import ScheduleItem from "./ScheduleItem";
import useTrackMatrix, { TrackTodo } from "../hooks/useTrackMatrix";
import { CalendarItem, CalendarDate } from "../hooks/useCalendarContext";

interface WeekRowProps {
  week: CalendarDate[];
  weekTodos: CalendarItem[];
  weekIdx: number;
  handleOpenDetail: (item: CalendarItem) => void;
  selectedDate: any;
  currentDate: any;
  dayRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export default function WeekRow({
  week,
  weekTodos,
  weekIdx,
  handleOpenDetail,
  selectedDate,
  currentDate,
  dayRefs,
}: WeekRowProps) {
  const trackMatrix = useTrackMatrix(week, weekTodos);
  return (
    <div className='weekRow' style={{ display: "flex" }}>
      {week.map((date, dayIdx) => {
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
        const cellIndex = weekIdx * 7 + dayIdx;
        return (
          <div
            ref={(el) => {
              dayRefs.current[cellIndex] = el;
            }}
            onClick={() => selectedDate.selectDate(date.date)}
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
                    itemId={todo.id}
                    text={todo.text}
                    status={todo.status}
                    dates={[todo.dates[0], todo.dates[1] ?? todo.dates[0]]}
                    currentDate={date.date}
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
