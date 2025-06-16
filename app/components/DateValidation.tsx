import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "../styles/modal.css";

export default function DateRangeInput({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: {
  startDate: string;
  endDate: string;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
}) {
  const [error, setError] = useState("");

  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      setError("시작 날짜는 종료 날짜보다 이후일 수 없습니다.");
    } else {
      setError("");
    }
  }, [startDate, endDate]);

  return (
    <Form.Group className='mb-2' controlId='dateCtrl'>
      <div className='flexBox'>
        <div>
          <Form.Label className='mb-2'>시작 날짜</Form.Label>
          <Form.Control
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            name='start date'
          />
        </div>
        <div>
          <Form.Label className='mb-2'>종료 날짜</Form.Label>
          <Form.Control
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            name='end date'
          />
        </div>
      </div>
      {error && <div className='text-danger mt-2'>{error}</div>}
    </Form.Group>
  );
}
