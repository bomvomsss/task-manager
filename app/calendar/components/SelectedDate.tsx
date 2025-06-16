import useCalendarContext from "../hooks/useCalendarContext";

const SelectedDate = () => {
  const { selectedDate } = useCalendarContext();
  return <div>{selectedDate.date}</div>;
};

export default SelectedDate;
