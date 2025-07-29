"use client";
import { Nav } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  return (
    <div id='navBar' className={"bg-body-tertiary"}>
      <div className='brand'>
        <h1>
          <Link href='/'>Task Manager</Link>
        </h1>
      </div>
      <Nav className='flex'>
        <Nav.Item className={pathname === "/main/" ? "on" : ""}>
          <Nav.Link as={Link} className='py-3' href='/main'>
            Main
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className={pathname === "/dashboard/" ? "on" : ""}>
          <Nav.Link as={Link} className='py-3' href='/dashboard'>
            Dash Board
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className={pathname === "/calendar/" ? "on" : ""}>
          <Nav.Link as={Link} className='py-3' href='/calendar'>
            Calendar
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
