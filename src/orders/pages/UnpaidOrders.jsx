import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../util/http-hook";

import Swal from "sweetalert2";
import authService from "../../services/authService";
import { Form, Button, Label, Header, Segment } from "semantic-ui-react";
import ListaOrdini from "../components/ListaOrdini"

const UnpaidOrders = () => {
  //query al database per ottenere i pacchetti
  const { sendRequest, isLoading } = useHttpClient();
  const [ordini, setOrdini] = useState();
  const id = parseInt(authService.getCurrentId());


  useEffect(() => {
    const getOrdini = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/order/unpaidOrders/" + id,
          "GET",
            null
        );

        setOrdini(response);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong...",
          text: error.message,
        });
      }
    };
    getOrdini();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <div className="jumbotron">
        <div className="container mt-2">
          <div className="display-5">
            Unpaid Orders
          </div>
          <hr />
          {!isLoading && ordini && (
              <ListaOrdini
              orders={ordini}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UnpaidOrders;
