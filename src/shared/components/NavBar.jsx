import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import {
  faBriefcase,
  faEnvelope,
  faHome,
  faMobile,
  faPassport,
  faSearchPlus,
  faUser,
  faGlobeEurope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {
  var user = JSON.parse(localStorage.getItem('user'));

  return (
    <Navbar bg="light" expand="lg">
      <Container className="">
      <Navbar.Brand href="/">
        <img alt="" width="35" height="35"
          src="/logo.jpeg"
          className="d-inline-block align-top"
        />{' '}
      Telcom
      </Navbar.Brand>        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">
              <FontAwesomeIcon className="fa-lg" icon={faHome} />{'Homepage'}
            </Nav.Link>
            <Nav.Link href="/">I miei acquisti</Nav.Link>

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
          <Nav>
          {/* <Nav.Link eventKey={2} href="#memes">
          <FontAwesomeIcon className="fa-lg" icon={faUser} />{user}
          Utente Loggato
          </Nav.Link> */}

          <Nav.Link className=" btn btn-info rounded-pill text-dark mr-3 pl-3 pr-3" href="/">impostazioni</Nav.Link>

          <Nav.Link className="right-align btn btn-dark rounded-pill text-light pl-3 pr-3" style={{marginLeft: 5}} href="/">Logout </Nav.Link>
    </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
