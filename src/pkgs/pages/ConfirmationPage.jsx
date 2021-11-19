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
import { Form, Button, Label } from "semantic-ui-react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import ListaServizi from "../components/ListaServizi";
import ListaOptional from "../components/ListaOptional";
import authService from "../../services/authService";
import moment from "moment";

const ConfirmationPage = (props) => {
  const location = useLocation();
  const data = location.state;

  const utente = authService.getCurrentToken();

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
        <div className="row">
          <div className="col">
            Validity:
            <span className="col"> {data.validity + " mesi "}</span>
            <br />
            Starting from:
            {" " + moment(data.date).format("DD/MM/YYYY")}
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-6">
          <h4 style={{ fontWeight: "bold" }}>Chosen services:</h4>
        </div>
        <span className="col-6">
          <ul>
            {data.services.map((service) => (
              <Label color="blue">{service.name}</Label>
            ))}
          </ul>
        </span>
      </div>
      <div className="row">
        <div className="col-6">
          <h4 style={{ fontWeight: "bold" }}>Chosen optionals:</h4>
        </div>
        <span className="col-6">
          <ul>
            {data.optionals.map((optional) => (
              <Label color="blue">{optional.name}</Label>
            ))}
          </ul>
        </span>
      </div>
      <div style={{ marginTop: "50px" }}>
        <div className="h3" style={{ fontWeight: "bold", textAlign: "right" }}>
          Total Cost: €{data.price}
          <div className="mt-3">
            {!utente ? (
              <Button.Group size="large">
                <Button>&nbsp;Login&nbsp;</Button>
                <Button.Or />
                <Button positive>Register</Button>
              </Button.Group>
            ) : (
              <Button>Acquista</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationPage;
