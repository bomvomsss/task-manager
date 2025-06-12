import useCalendarContext from "./hooks/useCalendarContext";
import { Container } from "react-bootstrap";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

export default function CalendarHeader() {
  const { dispatch, currentDate } = useCalendarContext();
  return (
    <Container>
      <div className='wrapWrap'>
        <div className='btnWrap'>
          <button onClick={dispatch.handlePrevYear}>
            <BsArrowLeft />
          </button>
          <span>{currentDate.year}</span>
          <button onClick={dispatch.handleNextYear}>
            <BsArrowRight />
          </button>
        </div>
        <div className='btnWrap'>
          <button onClick={dispatch.handlePrevMonth}>
            <BsArrowLeft />
          </button>
          <span>{currentDate.month}</span>
          <button onClick={dispatch.handleNextMonth}>
            <BsArrowRight />
          </button>
        </div>
      </div>
    </Container>
  );
}
