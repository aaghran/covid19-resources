import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" expand="md" className="" fixed>
        <Container>
          <NavbarBrand className="text-white" href="/twitter-search">Covid19-Resources</NavbarBrand>
          <NavbarToggler onClick={toggle} className="text-white" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/twitter-search">Search on Twitter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/vaccine-slots">Check Vaccine slots</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Menu;
