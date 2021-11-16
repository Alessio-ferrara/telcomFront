import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

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
import { Form, Card, Button, Icon, Header } from "semantic-ui-react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import ListaServizi from "../components/ListaServizi";

//dati che ci servono obbligatoriamente per prendere le cose
const confirmSchema = Yup.object().shape({
  id_pkg: Yup.number().integer().required(),
  name: Yup.string().required(),
  description: Yup.string().required(),
  validity: Yup.number().integer().required(),  //numero di mesi richiesti dall'utente
  price: Yup.number().integer().required()
})


const PackagePage = () => {
  let navigate = useNavigate();
  //query al database per ottenere i pacchetti
  const { sendRequest, isLoading } = useHttpClient();
  const id = useParams().pkgID; //per prendere l'id dall'URL
  const [infoPacchetto, setInfoPacchetto] = useState();
  // console.log(process.env.REACT_APP_FRONT_URL);
  const confirmationData = useFormik({
    initialValues: {
      id_pkg : id,
      name: "",
      description : "",
      validity : "",
      price : "",
      optionals : []
    },
    validationSchema: confirmSchema,
    onSubmit: async (values) => {
        navigate.push({pathname: "/confirmationPage", state: values})
    }
  })
  const handleChangeValidity = (validity) => {
    confirmationData.setFieldValue("validity" , validity);
    confirmationData.setFieldValue("price", validity*infoPacchetto.monthly_cost);

  }
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
        setInfoPacchetto(response);
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
    getInfoPacchetto();
  }, [sendRequest]);
  console.log(confirmationData.values);
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
                  <h2 class="card-title text-center"> Acquista Pacchetto </h2>
                  <p class="card-text">
                    Oltre ai servizi integrati nel pacchetto puoi selezionare dei servizi opzionali da aggiungere alla tua offerta
                  </p>
                  {/* INIZIO DEL FORM PER COMPLETARE L ACQUISTO */}
                  <Form size="large">
              <Form.Dropdown
                label="Number of months:"
                id="validity"
                value={confirmationData.values.validity}
                onChange={e => {handleChangeValidity(e.target.value)}}  //onchange
                onBlur={confirmationData.handleBlur}
                error={confirmationData.errors.validity && confirmationData.touched.validity}
              />
            </Form>
                </div>
                <a href="#" class="btn btn-primary btn-lg  btn-block mb-3">
                <FontAwesomeIcon icon={faShoppingBag} />
                    &nbsp; Completa l'acquisto
                  </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PackagePage;
