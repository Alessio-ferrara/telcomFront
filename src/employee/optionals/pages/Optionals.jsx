import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../../util/http-hook";

import Swal from "sweetalert2";
import { Icon, Button } from "semantic-ui-react";
import ListaOptionalEmp from "../components/ListaOptionalEmp";
import AddOptional from "../components/AddOptional";

const Optionals = () => {
  //query al database per ottenere i pacchetti
  const { sendRequest, isLoading } = useHttpClient();
  const [optionals, setOptionals] = useState();
  const [newOptional, setNewOptional] = useState();

  const handleClose = () => {
    setNewOptional(false);
  };

  const insertOptional = (optional) => {
    let array = optionals;
    array.push(optional);
    setOptionals(array);
  };

  useEffect(() => {
    const getOptionals = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/optional",
          "GET",
          null
        );
        setOptionals(response);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Qualcosa è andato storto...",
          text: error.message,
        });
      }
    };
    getOptionals();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {newOptional && (
        <AddOptional
          handleClose={handleClose}
          insertOptional={insertOptional}
        />
      )}
      {/* usare un component in cui importare i dati per formattarli nel frontend */}
      <div className="jumbotron mt-2">
        <div className="container mt-3 ">
          <p className="display-6">List of optional services</p>
          <hr />
          {!isLoading && optionals && (
            <ListaOptionalEmp optionals={optionals} />
          )}
          <center>
            <Button
              className="mt-md-0 mt-3 mb-3 col-lg-2 col-md-4 col-12 rounded-pill"
              icon
              size="medium"
              color="blue"
              onClick={() => setNewOptional(true)}
            >
              <Icon name="add" />
               Add new optional
            </Button>
          </center>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Optionals;
