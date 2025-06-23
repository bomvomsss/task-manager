"use client";
import { Nav } from "react-bootstrap";
import Link from "next/link";

export default function Navigation() {
  return (
    <div id='navBar' className={"bg-body-tertiary"}>
      <div className='brand'>
        <h1>Task Manager</h1>
      </div>
      <Nav defaultActiveKey='/' className='flex-column'>
        <Nav.Item>
          <Nav.Link as={Link} className='py-3' href='/main'>
            Main
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} className='py-3' href='/calendar'>
            Calendar
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} className='py-3' href='/dashboard'>
            Dash Board
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
