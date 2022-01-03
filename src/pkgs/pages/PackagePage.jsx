import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SemanticDatepicker from 'react-semantic-ui-datepickers';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { useHttpClient } from "../../util/http-hook";
import {
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useFormik } from "formik";
import { Form, Button } from "semantic-ui-react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import ListaServizi from "../components/ListaServizi";
import ListaOptional from "../components/ListaOptional";

const today = new Date();
today.setHours(0, 0, 0, 0)

//dati che ci servono obbligatoriamente per prendere le cose
const confirmSchema = Yup.object().shape({
  id_pkg: Yup.number().integer().required(),
  name: Yup.string().required(),
  description: Yup.string().required(),
  validity: Yup.number().integer().required(), //numero di mesi richiesti dall'utente
  price: Yup.number().integer().moreThan(0),
  priceWithOptionals: Yup.number().integer().moreThan(0),
  date: Yup.date().min(today, "Date cannot be in the past")
});

const PackagePage = () => {
  let navigate = useNavigate();
  //query al database per ottenere i pacchetti
  const { sendRequest, isLoading } = useHttpClient();
  const id = useParams().pkgID; //per prendere l'id dall'URL
  const [infoPacchetto, setInfoPacchetto] = useState();
  const [prices, setPrices] = useState();
  const [optionals, setOptionals] = useState();
  const [currentDate, setNewDate] = useState();
  const confirmationData = useFormik({
    initialValues: {
      id_pkg: id,
      name: "",
      description: "",
      validity: "",
      price: 0,
      priceWithOptionals: 0,
      optionals: [],
      services : [],
      date : new Date(),
    },
    validationSchema: confirmSchema,
    onSubmit: async (values) => {
      navigate("/confirmationPage", {state: values });
    },
  });

  const handleChangeValidity = (validity) => {
    let amount = validity.childNodes[0].innerText;
    let months = validity.childNodes[1].innerText;
    confirmationData.setFieldValue("price", parseFloat(amount.split(" ")[1]) * months);
    confirmationData.setFieldValue("priceWithOptionals", parseFloat(amount.split(" ")[1]) * months)
    confirmationData.setFieldTouched("price");
    confirmationData.setFieldValue("validity", months);
  };

  const changeData = (event, data) => {
    setNewDate(data.value);
    confirmationData.setFieldValue("date", data.value)
  }


  const AddOptional = (id, montlycost, name) => {
    let array = confirmationData.values.optionals;
    let found = 0;

    for (let i = 0; i < array.length; i++) {
      if (array[i].OptID == id) {
        array.splice(i, 1);
        confirmationData.values.priceWithOptionals -= parseFloat(montlycost * confirmationData.values.validity);
        found = 1;
      }
    }
    if (!found) {
      array.push({ OptID: parseInt(id), montlycost, name });
      confirmationData.values.priceWithOptionals += parseFloat(montlycost * confirmationData.values.validity);;
    }

    confirmationData.setFieldValue("optionals", array);

  };
  useEffect(() => {
    const getInfoPacchetto = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/package/info/" + id,
          "GET",
          null
        );
        setInfoPacchetto(response);
        if (response.prices) {
          const pricesResponse = [];
          response.prices.forEach((price) => {
            pricesResponse.push({
              key: price.duration,
              value: price.duration,
              text: price.duration,
              description: "€ " + price.amount,
            });
          });
          setPrices(pricesResponse);
        }
        confirmationData.setFieldValue("name", response.name);
        confirmationData.setFieldValue("description", response.description);
        confirmationData.setFieldValue("services", response.services)
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong...",
          text: error.message,
        });
      }
    };
    const getOptionals = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/optional/",
          "GET",
          null
        );

        setOptionals(response);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong...",
          text: error.message,
        });
      }
    };
    getInfoPacchetto();
    getOptionals();
  }, [sendRequest]);
  return (
    <React.Fragment>
      {/* usare un component in cui importare i dati per formattarli nel frontend */}
      <div className="jumbotron mt-3">
        {!isLoading && infoPacchetto && (
          <div className="container mt-3">
            <div className="container" style={{ paddingBottom: "5vh" }}>
              <div className="display-6" style={{ fontWeight: "normal" }}>
                {infoPacchetto.name}
              </div>
              <h3 className="text-muted">{infoPacchetto.description}</h3>
            </div>
            <div className="container-fluid row" style={{ padding: "0 0 0 0" }}>
              <div
                id="description"
                style={{ fontSize: "1.7em" }}
                className="col-md-6 col-12"
              >
                {/* nbsp for life */}
                &nbsp;&nbsp;Services included:
                {!isLoading && infoPacchetto && (
                  <ListaServizi
                    servizi={infoPacchetto.services}
                    pkg={infoPacchetto}
                  />
                  // uso il component listapacchetti passando i pacchetti ricevuti dopo la query al backend
                )}
              </div>
              <div className="card col-md-6 col-12">
                <div class="card-body">
                  <div class="card-title text-center display-6"> Purchase Package </div>
                  <p class="card-text">
                    You can add optional services to the default package by
                    selecting them in the form below
                  </p>
                  {/* INIZIO DEL FORM PER COMPLETARE L ACQUISTO */}
                  <Form size="large">
                    {!isLoading && prices && (
                      <Form.Dropdown
                        label="Number of months:"
                        id="validity"
                        selection
                        error={confirmationData.errors.validity}
                        compact
                        options={prices}
                        onChange={(e) => {
                          handleChangeValidity(e.target);
                        }} //onchange
                        onBlur={confirmationData.handleBlur}
                        //error={confirmationData.errors.validity && confirmationData.touched.validity}
                      />
                    )}
                    <SemanticDatepicker
                    locale="it-IT"
                    error={confirmationData.errors.date}
                    label = "Starting from:"
                    filterDate={(date) => {
                      const now = new Date();
                      return date >= now;
                    }}
                    style={{display:"block"}}
                    onChange={changeData}/>
                    {!isLoading && optionals && (
                      <ListaOptional
                        optionals={optionals}
                        AddOptional={AddOptional}
                      />
                    )}
                    <center>
                      {confirmationData.values && (
                        <Button
                          fluid
                          color="facebook"
                          className="rounded-pill" 
                          size="big"
                          onClick={confirmationData.handleSubmit}
                        >
                          <FontAwesomeIcon icon={faShoppingBag} />
                          &nbsp; Purchase
                        </Button>
                      )}
                    </center>
                    <hr />
                    <div>
                      <div
                        className="row text-decoration-underline"
                        style={{ fontWeight: "bold" }}
                      >
                        <div className="col-9 mb-2">Price package: </div>
                        <div className="col">
                          {"€ " + confirmationData.values.price}
                        </div>
                        <div className="col-9">Total with optionals:</div>
                        <div className="col">
                          {"€ " + confirmationData.values.priceWithOptionals}
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PackagePage;
