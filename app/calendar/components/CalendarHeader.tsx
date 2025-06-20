import useCalendarContext from "../hooks/useCalendarContext";
import { Container, Button } from "react-bootstrap";
import { BsChevronRight, BsChevronLeft, BsPlusLg } from "react-icons/bs";

interface CalHeadProps {
  onAddClick: () => void;
}

export default function CalendarHeader({ onAddClick }: CalHeadProps) {
  const { currentDate, dispatch } = useCalendarContext();

  return (
    <Container>
      <div className='calBtnGroup'>
        <div className='btnWrap years'>
          <button onClick={dispatch.handlePrevYear} className='calArr'>
            <BsChevronLeft />
          </button>
          <span>{currentDate.year}</span>
          <button onClick={dispatch.handleNextYear} className='calArr'>
            <BsChevronRight />
          </button>
        </div>
        <div className='btnWrap months'>
          <button onClick={dispatch.handlePrevMonth} className='calArr'>
            <BsChevronLeft />
          </button>
          <span>{currentDate.month}</span>
          <button onClick={dispatch.handleNextMonth} className='calArr'>
            <BsChevronRight />
          </button>
        </div>
        <Button
          variant='outline-primary'
          className='addBtn'
          onClick={onAddClick}
        >
          <BsPlusLg />
        </Button>
      </div>
    </Container>
  );
}
