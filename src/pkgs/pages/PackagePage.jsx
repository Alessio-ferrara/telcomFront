import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { useHttpClient } from "../../util/http-hook";
// import ListaPacchetti from '../components/ListaPacchetti'

import { useFormik } from "formik";
import { Form, Card, Button, Icon, Header } from "semantic-ui-react";
import Swal from "sweetalert2";

const PackagePage = () => {
  //query al database per ottenere i pacchetti
  const { sendRequest, isLoading } = useHttpClient();
  const id = useParams(); //per prendere l'id dall'URL

  const [servizi, setServizi] = useState();
  // console.log(process.env.REACT_APP_FRONT_URL);

  useEffect(() => {
    const getServizi = async () => {
      try {
        const response = await sendRequest( //passo l'id al backend per cercare i servizi inclusi nel pacchetto
          process.env.REACT_APP_JAVA_BASE_URL + "/package/info/" + {id},
          "GET",
          null
        );
        setServizi(response);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Qualcosa è andato storto...",
          text: error.message,
        });
      }
    };
    getServizi();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {/* usare un component in cui importare i dati per formattarli nel frontend */}
      <div className="jumbotron">
        <div className="container mt-2">
            <h1>
              {servizi}
            </h1>
        </div>
        </div>
    </React.Fragment>
  );
};

export default PackagePage;
