import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHttpClient } from "../../util/http-hook";

import { Button, Label, Header, Segment } from "semantic-ui-react";
import Swal from "sweetalert2";

import authService from "../../services/authService";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";

const ConfirmationPage = (props) => {
  const location = useLocation();

  const { sendRequest, isLoading } = useHttpClient();
  const data = location.state;
  const navigate = useNavigate();
  const utente = authService.getCurrentToken();

  console.log(data);

  const createOrder = async (s) => {
    try {
      console.log(s)
      const success = s != null ? s : (Math.random() < 0.5 ? true : false);
      //I check if the data have an orderID, in this case the data are coming from an unpaid order
      if (data.orderID) {
        await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL +
            "/order/payOrder/" +
            data.orderID,
          "POST",
          JSON.stringify({
            paid: success,
            userID: parseInt(authService.getCurrentId()),
          }),
          {
            "Content-Type": "application/json",
          }
        );
      } else {
        await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/order/createOrder",
          "POST",
          JSON.stringify({
            refUser: parseInt(authService.getCurrentId()),
            refPkg: parseInt(data.id_pkg),
            datetime: moment().format("DD/MM/YYYY"),
            paid: success,
            amount: parseInt(data.price),
            amountWithOptionals: parseInt(data.priceWithOptionals),
            startingDate: moment(data.date).format("DD/MM/YYYY"),
            duration: parseInt(data.validity),
            optionals: data.optionals,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      }

      if (success) {
        Swal.fire({
          icon: "success",
          title: "Payment completed.",
        }).then(() => navigate("/"));
      } else if (!success) {
        Swal.fire({
          icon: "warning",
          title: "Something went wrong...",
          text: "Payment not completed. The order is created but you need to finalize the payment.",
        }).then(() => navigate("/unpaidorders"));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong...",
        text: error.message,
      });
    }
  };

  return (
    <div className="container mt-3">
      <div className="display-6 col-6">
        Service Package:
        {" " + data.name}
      </div>
      <div className="row h4">
        <div className="col-8 text-muted">
          Description:
          <span> {data.description}</span>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-6">
          <h4 style={{ fontWeight: "bold" }}>Included services:</h4>
        </div>
        <div className="col-6">
          <ul>
            {data.services.map((service) => (
              <Label fluid color="blue" size="large" className="mb-2 col-12">
                <div style={{ fontSize: "0.9em" }} className="row">
                  <div className="col-6">
                    {" "}
                    <FontAwesomeIcon icon={faCube} /> {service.type}
                  </div>
                  <div className="col-6 mt-3"> {service.name}</div>
                </div>

                {service.type === "Mobile Phone" && (
                  <div style={{ fontSize: "0.8em" }} className="row mt-2">
                    <div className="col-6">
                      <span style={{ fontWeight: "bold" }}>
                        Minutes every month:{" "}
                      </span>
                      {service.numberOfMinutes}
                    </div>
                    <div className="col-6">
                      <span style={{ fontWeight: "bold" }}>
                        Sms every month:{" "}
                      </span>
                      {service.numberOfSms}
                    </div>
                    <div className="col-6">
                      <span style={{ fontWeight: "bold" }}>
                        Fee for extra minute:{" "}
                      </span>
                      {service.feeMinutes} €
                    </div>
                    <div className="col-6">
                      <span style={{ fontWeight: "bold" }}>
                        Fee for extra sms:{" "}
                      </span>
                      {service.feeSms} €
                    </div>
                  </div>
                )}
                {(service.type == "Mobile Internet" ||
                  service.type === "Fixed Internet") && (
                  <div style={{ fontSize: "0.8em" }} className="row mt-2">
                    <div className="col-6">
                      <span style={{ fontWeight: "bold" }}>
                        GigaBytes every month:{" "}
                      </span>
                      {service.numberOfGB}
                    </div>
                    <div className="col-6">
                      <span style={{ fontWeight: "bold" }}>
                        Fee for extra GigaByte:{" "}
                      </span>
                      {service.feeGB} €
                    </div>
                  </div>
                )}
              </Label>
            ))}
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <h4 style={{ fontWeight: "bold" }}>Added optionals:</h4>
        </div>
        <span className="col-6">
          <ul>
            {data.optionals.map((optional) => (
              <Label color="blue" size="large" className="mb-2">
                {optional.name}
              </Label>
            ))}
          </ul>
        </span>
      </div>
      <Segment className="mt-3 rounded-pill text-center" secondary attached>
        Confirming the purchase will lead to the payment page, not completing
        the payment the unpaid order will be added to your "Unpaid Orders" in
        order to let you complete the purchasing.
      </Segment>
      <div style={{ marginTop: "50px" }}>
        <div className="row">
          <div className="col-md-9 col-12"></div>
          <div className="col-md-3 col-12 display-6 text-center">
            Total Cost: €{data.priceWithOptionals}
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 col-12"></div>
          <div className="col-md-3 col-12 display-6">
            <p
              style={{
                fontWeight: "",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              Validity:
              {" " + data.validity + " months"}
              <p>
                Starting from:
                {" " + moment(data.date).format("DD/MM/YYYY")}
              </p>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 col-12"></div>
          <div className="col-md-3 col-12">
            <div className="mt-3 text-center">
              {!utente ? (
                <div>
                  <Button.Group size="huge">
                    <Button
                      color="facebook"
                      onClick={() => {
                        navigate("/login", {
                          state: { info: data, from: "/confirmationpage" },
                        });
                      }}
                    >
                      &nbsp;Log-in&nbsp;
                    </Button>
                    <Button.Or />
                    <Button
                      onClick={() => {
                        navigate("/signup", {
                          state: { info: data, from: "/confirmationpage" },
                        });
                      }}
                    >
                      Sign-up
                    </Button>
                  </Button.Group>
                </div>
              ) : (
                <div>
                  <Button
                    className="rounded-pill"
                    size="huge"
                    color="facebook"
                    onClick={() => createOrder()}
                  >
                    Confirm Purchase
                  </Button>
                  <Button
                    className="rounded-pill mt-3"
                    size="mini"
                    color="green"
                    onClick={() => createOrder(true)}
                  >
                    Complete payment
                  </Button>
                  <Button
                    className="rounded-pill mt-3"
                    size="mini"
                    color="red"
                    onClick={() => createOrder(false)}
                  >
                    Fail payment
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationPage;
