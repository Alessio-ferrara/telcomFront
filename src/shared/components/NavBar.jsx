import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import React, { useEffect, useState } from "react";
// import authService from "../../services/authService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import authService from "../../services/authService";
import { useNavigate } from "react-router";
import { useHttpClient } from "../../util/http-hook";
import Swal from "sweetalert2";

const NavBar = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const user = authService.getCurrentRuolo();
  const [nOrdersUnpaid, setnOrdersUnpaid] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrdini = async () => {
      if (user) {
        try {
          const response = await sendRequest(
            process.env.REACT_APP_JAVA_BASE_URL +
              "/order/unpaidOrders/" +
              authService.getCurrentId(),
            "GET",
            null
          );
          setnOrdersUnpaid(response.length);
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Something went wrong...",
            text: error.message,
          });
        }
      }
    };
    getOrdini();
  }, [sendRequest]);

  console.log(nOrdersUnpaid);

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
            {!isLoading && user === "User" && nOrdersUnpaid > 0 && (
              <Nav.Link href="/unpaidorders">Unpaid Orders</Nav.Link>
            )}
            {user === "Emp" && (
              <React.Fragment>
                <Nav.Link href="/optionals">Optionals</Nav.Link>
                <Nav.Link href="/salesReport">Sales Report</Nav.Link>
              </React.Fragment>
            )}

          </Nav>
          <Nav>
            {user ? (
              <React.Fragment>
                <Nav.Link
                  className="right-align btn btn-dark rounded-pill text-light pl-3 pr-3"
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
