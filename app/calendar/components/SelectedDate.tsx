interface SelectedDateType {
  date: string | null;
  selectDate: (date: string) => void;
}

export default function SelectedDate({
  selectedDate,
}: {
  selectedDate: SelectedDateType;
}) {
  return <div>{selectedDate.date}</div>;
}
