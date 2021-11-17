import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { useHttpClient } from "../../util/http-hook";
import {
  faCartPlus,
  faShoppingCart,
  faShoppingBag,
  faBroadcastTower,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useFormik } from "formik";
import {
  Form,
  Input,
  input,
  Icon,
  Header,
  Label,
  Button,
} from "semantic-ui-react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import ListaServizi from "../components/ListaServizi";

//dati che ci servono obbligatoriamente per prendere le cose
const confirmSchema = Yup.object().shape({
  id_pkg: Yup.number().integer().required(),
  name: Yup.string().required(),
  description: Yup.string().required(),
  validity: Yup.number().integer().required(), //numero di mesi richiesti dall'utente
  price: Yup.number().integer().moreThan(0),
});

const PackagePage = () => {
  let navigate = useNavigate();
  //query al database per ottenere i pacchetti
  const { sendRequest, isLoading } = useHttpClient();
  const id = useParams().pkgID; //per prendere l'id dall'URL
  const [infoPacchetto, setInfoPacchetto] = useState();
  const [prices, setPrices] = useState();
  const [optional, setOptional] = useState();
  // console.log(process.env.REACT_APP_FRONT_URL);
  const confirmationData = useFormik({
    initialValues: {
      id_pkg: id,
      name: "",
      description: "",
      validity: "",
      price: 0,
      optionals: [],
    },
    validationSchema: confirmSchema,
    onSubmit: async (values) => {
      navigate.push({ pathname: "/confirmationPage", state: values });
    },
  });
  const handleChangeValidity = (validity) => {
    let amount = validity.childNodes[0].innerText;
    let months = validity.childNodes[1].innerText;
    confirmationData.setFieldValue("price", amount);
    confirmationData.setFieldTouched("price");
    confirmationData.setFieldValue("validity", months);
  };
  useEffect(() => {
    const getInfoPacchetto = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/package/info/" + id,
          // prendiamoci anche i price e nella dropdown del validitu stampiamo price.validity e al change del valore aggiornaimo il costo
          //prendendo il dato inserito e moltiplicandolo per price.duration
          //creiamo una mappa delle coppie di ogni tupla price e troviamo il costo come proce.validiy*(Map(price.validity.value()))
          "GET",
          null
        );
        // console.log(response);
        setInfoPacchetto(response);
        if (response.prices) {
          const pricesResponse = [];
          response.prices.forEach((price) => {
            pricesResponse.push({
              key: price.duration,
              value: price.duration,
              text: price.duration,
              description: "€ "+price.amount,
            });
          });
          setPrices(pricesResponse);
        }
        confirmationData.setFieldValue("name", response.name);
        confirmationData.setFieldValue("description", response.description);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Qualcosa è andato storto...",
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
        // console.log(response);
        setOptional(response);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Qualcosa è andato storto...",
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
              <h1 className="" style={{ fontWeight: "bold" }}>
                {infoPacchetto.name}
              </h1>
              <h3 className="text-muted">{infoPacchetto.description}</h3>
            </div>
            <div className="container-fluid row" style={{ padding: "0 0 0 0" }}>
              <div
                id="description"
                style={{ fontSize: "1.7em" }}
                className="col-md-6 col-12"
              >
                {/* nbsp for life */}
                &nbsp;&nbsp;Servizi inclusi nel pacchetto:
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
                  <h2 class="card-title text-center"> Purchase Package </h2>
                  <p class="card-text">
                    You can add optional services to your standar package by
                    selecting them in the form below
                  </p>
                  {/* INIZIO DEL FORM PER COMPLETARE L ACQUISTO */}
                  <Form size="large">
                    {!isLoading && prices && (
                      <Form.Dropdown
                        label="Number of months:"
                        id="validity"
                        selection
                        compact
                        options={prices}
                        onChange={(e) => {
                          handleChangeValidity(e.target);
                        }} //onchange
                        onBlur={confirmationData.handleBlur}
                        //error={confirmationData.errors.validity && confirmationData.touched.validity}
                      />
                    )}
                    {/* <ListaOptional */}
                    <center>
                      <Button fluid color="facebook" size="big">
                        <FontAwesomeIcon icon={faShoppingBag} />
                        &nbsp; Completa l'acquisto >
                      </Button>
                    </center>
                    <hr />
                    <div>
                      <div className="row text-decoration-underline" style={{fontWeight : "bold",  fontSize: "1.1em"}}>
                        <div className="col-10">
                        Totale:
                        </div>
                        <div className="col-2">
                        €12.00
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
