import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHttpClient } from "../../util/http-hook";
import {
  faCartPlus,
  faShoppingCart,
  faShoppingBag,
  faBroadcastTower,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useFormik } from "formik";
import { Form, Button, Label, Header, Segment } from "semantic-ui-react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import ListaServizi from "../components/ListaServizi";
import ListaOptional from "../components/ListaOptional";
import authService from "../../services/authService";
import moment from "moment";

const ConfirmationPage = (props) => {
  const location = useLocation();
  const { sendRequest, isLoading } = useHttpClient();
  const data = location.state;
  const navigate = useNavigate();
  const utente = authService.getCurrentToken();

  const createOrder = async () => {
    try {
      const success = Math.random() < 0.5 ? true : false;
      await sendRequest(
        process.env.REACT_APP_JAVA_BASE_URL + "/order/createOrder",
        "POST",
        JSON.stringify({
          refUser: parseInt(authService.getCurrentId()),
          refPkg: parseInt(data.id_pkg),
          datetime: moment().format("DD/MM/YYYY"),
          paid: success,
          amount: parseInt(data.price),
          startingDate: moment(data.date).format("DD/MM/YYYY"),
          duration: parseInt(data.validity),
        }),
        {
          "Content-Type": "application/json",
        }
      );

      if (success) {
        Swal.fire({
          icon: "success",
          title: "Qualcosa è andato storto...",
          text: "Payment completed.",
        }).then(() => navigate("/"));
      } else if (!success) {
        Swal.fire({
          icon: "warning",
          title: "Qualcosa è andato storto...",
          text: "Payment not completed. The order is created but you need to finalize the payment.",
        }).then(() => navigate("/unpaidorders"));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Qualcosa è andato storto...",
        text: error.message,
      });
    }
  };

  // console.log(orderData);

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
        <span className="col-6">
          <ul>
            {data.services.map((service) => (
              <Label color="blue" size="large" className="mb-2">
                {service.name}
              </Label>
            ))}
          </ul>
        </span>
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
            Total Cost: €{data.price}
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
                    <Button href="/login" color="blue">
                      &nbsp;Log-in&nbsp;
                    </Button>
                    <Button.Or />
                    <Button>Sign-up</Button>
                  </Button.Group>
                </div>
              ) : (
                <Button size="huge" color="facebook" onClick={createOrder}>
                  Confirm Purchase
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationPage;
