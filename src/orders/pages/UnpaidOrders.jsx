import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../util/http-hook";
import ListaPacchetti from "../components/ListaPacchetti";

import Swal from "sweetalert2";
import authService from "../../services/authService";

const LandingPage = () => {
  //query al database per ottenere i pacchetti
  const { sendRequest, isLoading } = useHttpClient();
  const [ordini, setOrdini] = useState();
  // console.log(process.env.REACT_APP_FRONT_URL);

  useEffect(() => {
    const getOrdini = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/order/unpaid",
          "GET",
          JSON.stringify({
            id: authService.getCurrentId()
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setOrdini(response);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Qualcosa è andato storto...",
          text: error.message,
        });
      }
    };
    getOrdini();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <div className="jumbotron">
        {}
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
