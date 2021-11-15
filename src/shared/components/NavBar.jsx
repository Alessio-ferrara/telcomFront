import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'


const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container className="">
      <Navbar.Brand href="/">
        <img alt="" width="35" height="35"
          src="https://media.istockphoto.com/vectors/overlapping-one-line-letter-t-logotype-vector-id1193845414?k=20&m=1193845414&s=612x612&w=0&h=5YXK_HLsv_FMfigGUidvIZkPenZbHMyEhEuik16_E_Y="
          className="d-inline-block align-top"
        />{' '}
      Telcom
      </Navbar.Brand>        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* <Nav.Link href="">Link</Nav.Link> */}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
