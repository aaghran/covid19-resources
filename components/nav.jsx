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
          <NavbarBrand className="text-white" href="/covid19-resources/">Covid19-Resources</NavbarBrand>
          <NavbarToggler onClick={toggle} className="text-white" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/covid19-resources/twitter">Search on Twitter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/covid19-resources/search">Search By City</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Menu;
