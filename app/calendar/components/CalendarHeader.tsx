import useCalendarContext from "../hooks/useCalendarContext";
import { Container, Button } from "react-bootstrap";
import {
  BsChevronRight,
  BsChevronLeft,
  BsFillCalendarHeartFill,
} from "react-icons/bs";

interface CalHeadProps {
  onAddClick: () => void;
}

export default function CalendarHeader({ onAddClick }: CalHeadProps) {
  const { currentDate, dispatch } = useCalendarContext();

  return (
    <Container className='calHead'>
      <div className='calBtnGroup'>
        <button onClick={dispatch.handlePrevMonth} className='calArr'>
          <BsChevronLeft />
        </button>
        <div className='btnWrap years'>
          <span>{currentDate.year} 년</span>
        </div>
        <div className='btnWrap months'>
          <span>{currentDate.month} 월</span>
          <button onClick={dispatch.handleNextMonth} className='calArr'>
            <BsChevronRight />
          </button>
        </div>
        <Button
          variant='outline-primary'
          className='addBtn'
          onClick={onAddClick}
        >
          <BsFillCalendarHeartFill />
        </Button>
      </div>
    </Container>
  );
}
