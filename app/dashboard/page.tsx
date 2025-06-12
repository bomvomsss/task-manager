"use client";
import "../styles/dashboard.css";
import { Card } from "react-bootstrap";

export default function DashBoard() {
  return (
    <div id='dashBoard'>
      <Card className='text-center'>
        <Card.Header>할 일</Card.Header>
        <Card.Body></Card.Body>
      </Card>
      <Card className='text-center'>
        <Card.Header>진행중</Card.Header>
        <Card.Body></Card.Body>
      </Card>
      <Card className='text-center'>
        <Card.Header>완료</Card.Header>
        <Card.Body></Card.Body>
      </Card>
    </div>
  );
}
