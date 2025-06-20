"use client";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "../styles/modal.css";

export default function DateRangeInput({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  startId,
  endId,
}: {
  startDate: string;
  endDate: string;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  startId: string;
  endId: string;
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
    <Form.Group className='mb-2'>
      <div className='flexBox'>
        <form>
          <Form.Label className='mb-2' htmlFor={startId}>
            시작 날짜
          </Form.Label>
          <Form.Control
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            name='start date'
            id={startId}
          />
        </form>
        <form>
          <Form.Label className='mb-2' htmlFor={endId}>
            종료 날짜
          </Form.Label>
          <Form.Control
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            name='end date'
            id={endId}
          />
        </form>
      </div>
      {error && <div className='text-danger mt-2'>{error}</div>}
    </Form.Group>
  );
}
