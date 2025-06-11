"use client";

import { Container, Nav, Navbar } from "react-bootstrap";

export default function Navigation() {
  return (
    <Navbar className='bg-body-tertiary px-3 mx-auto' expand='lg' sticky='top'>
      <Container>
        <Navbar.Brand href='/'>Task Manager</Navbar.Brand>
      </Container>
      <Container>
        <Nav.Link href='/'>Main</Nav.Link>
        <Nav.Link href='/'>Calendar</Nav.Link>
        <Nav.Link href='/'>Dash Board</Nav.Link>
        <Nav.Link href='/'>Analysis</Nav.Link>
      </Container>
    </Navbar>
  );
}
