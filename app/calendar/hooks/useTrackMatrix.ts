import { CalendarItem, CalendarDate } from "../hooks/useCalendarContext";

export interface TrackTodo extends CalendarItem {
  blockStart: string;
  blockEnd: string;
  startIdx: number;
  endIdx: number;
}

/**
 * 주간 일정(track) 매트릭스 생성
 * @param week 주간 날짜 배열
 * @param weekTodos 해당 주에 걸친 일정 배열
 */
export default function useTrackMatrix(
  week: CalendarDate[],
  weekTodos: CalendarItem[]
): (TrackTodo | null)[][] {
  const trackMatrix: (TrackTodo | null)[][] = [];
  weekTodos.forEach((todo) => {
    const start = todo.start_date;
    const end = todo.end_date;
    const weekStart = week[0].date;
    const weekEnd = week[week.length - 1].date;
    const blockStart = start < weekStart ? weekStart : start;
    const blockEnd = end > weekEnd ? weekEnd : end;
    const startIdx = week.findIndex((d) => d.date === blockStart);
    const endIdx = week.findIndex((d) => d.date === blockEnd);
    let trackIdx = 0;
    while (
      trackMatrix[trackIdx]?.slice(startIdx, endIdx + 1).some((cell) => cell)
    ) {
      trackIdx++;
    }
    if (!trackMatrix[trackIdx]) {
      trackMatrix[trackIdx] = Array(week.length).fill(null);
    }
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
  return trackMatrix;
}
