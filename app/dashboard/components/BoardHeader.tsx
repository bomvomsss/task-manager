import { BsCalendarPlus } from "react-icons/bs";

interface BoardHeaderProps {
  onAddClick: () => void;
}

export default function BoardHeader({ onAddClick }: BoardHeaderProps) {
  return (
    <div id='boardHeader'>
      {/* <h3>대시보드</h3> */}
      <button className='plus-btn btn btn-outline-primary' onClick={onAddClick}>
        <BsCalendarPlus />
      </button>
    </div>
  );
}
