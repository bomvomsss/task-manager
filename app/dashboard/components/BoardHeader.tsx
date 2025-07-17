import { BsFillCalendarHeartFill } from "react-icons/bs";

interface BoardHeaderProps {
  onAddClick: () => void;
}

export default function BoardHeader({ onAddClick }: BoardHeaderProps) {
  return (
    <div id='boardHeader'>
      {/* <h3>대시보드</h3> */}
      <button className='plus-btn' onClick={onAddClick}>
        <BsFillCalendarHeartFill />
      </button>
    </div>
  );
}
