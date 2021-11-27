import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import React from "react";
// import authService from "../../services/authService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import authService from "../../services/authService";
import { useNavigate } from "react-router";

const NavBar = () => {
  // var user = JSON.parse(localStorage.getItem('user'));
  const user = authService.getCurrentRuolo();
  const navigate = useNavigate()

  return (
    <Navbar bg="blue" expand="lg">
      <Container className="">
        <Navbar.Brand href="/">
          <img
            alt=""
            width="35"
            height="35"
            src="/logo.jpeg"
            className="d-inline-block align-end"
          />
          {"Telcom"}
        </Navbar.Brand>{" "}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">
              {/* <FontAwesomeIcon className="fa-lg" icon={faHome} /> */}
              {"Homepage"}
            </Nav.Link>
            {user === 'User' && (
            <Nav.Link href="/unpaidorders">Unpaid Orders</Nav.Link>
            )}
            {user === 'Emp' && (
              <Nav.Link href="/optionals">Optionals</Nav.Link>
            )}

            {}
            {/* <Nav.Link href="/">Orders History</Nav.Link> */}

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
            {user ? (
              <React.Fragment>
                {/* <Nav.Link
                  className=" btn btn-info rounded-pill text-dark mr-3 pl-3 pr-3"
                  href="/"
                >
                  impostazioni
                </Nav.Link> */}
                <Nav.Link
                  className="right-align btn btn-dark rounded-end text-light pl-3 pr-3"
                  style={{ marginLeft: 5 }}
                  onClick={() => {
                    authService.logout();
                    navigate(0);
                  }}
                >
                  Logout{" "}
                </Nav.Link>
              </React.Fragment>
            ) : (
              <Nav.Link
                className="right-align btn btn-primary rounded-pill text-light pl-3 pr-3"
                style={{ marginLeft: 5 }}
                // style={{ marginLeft: 5 , background: "#A770EF",  /* fallback for old browsers */
                //   background: "-webkit-linear-gradient(to right, #eaafc8, #654ea3)" ,  /* Chrome 10-25, Safari 5.1-6 */
                //   background: "linear-gradient(to right, #eaafc8, #654ea3)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                //   color: "#fff",
                //   border: "0px solid black"
                //   }}
                href="/login"
              >
                &nbsp;Log-in / Sign-up &nbsp;
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
