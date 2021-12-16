import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../../util/http-hook";
import {
  Form,
  Card,
  Button,
  Icon,
  Header,
  Image,
  Label,
} from "semantic-ui-react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import ListaServiziEmp from "../components/ListaServiziEmp";
import AggiungiServizio from "../components/AggiungiServizio";
import ListaValidity from "../components/ListaValidity";
import AggiungiValidity from "../components/AggiungiValidity";
import { useNavigate } from "react-router";

const HomePageEmp = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const navigate = useNavigate();

  const [servizi, setServizi] = useState();
  const [newService, setNewService] = useState();
  const [newValidityPeriod, setNewValidityPeriod] = useState();
  const [validityPeriods, setValidityPeriods] = useState([]);

  const handleClose = () => {
    setNewService(false);
  };
  const handleCloseValidity = () => {
    setNewValidityPeriod(false);
  };

  const addService = (service) => {
    let array = servizi;
    array.push(service);
    setServizi(array);
  };

  useEffect(() => {
    const getServizi = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/services",
          "GET",
          null
        );
        setServizi(response);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong...",
          text: error.message,
        });
      }
    };
    getServizi();
  }, [sendRequest]);

  const pkgData = useFormik({
    initialValues: {
      name: "",
      description: "",
      services: [],
      prices: [],
    },
    onSubmit: async (values) => {
      try {
        await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/package/createPackage",
          "POST",
          JSON.stringify({
            name: values.name,
            description: values.description,
            services: values.services,
            prices: values.prices,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        Swal.fire({
          icon: "success",
          title: "Package created!",
        }).then(() => navigate(0));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong...",
          text: error.message,
        });
      }
    },
  });

  const addValidityPeriod = (validity) => {
    let array = validityPeriods;
    array.push(validity);
    setValidityPeriods(array);
    pkgData.setFieldValue("prices", array);
  };

  const clickService = (id) => {
    let array = pkgData.values.services;
    let found = 0;

    for (let i = 0; i < array.length; i++) {
      if (array[i].id == id) {
        array.splice(i, 1);
        found = 1;
      }
    }
    if (!found) {
      array.push(id);
    }
    pkgData.setFieldValue("services", array);
  };

  return (
    <React.Fragment>
      <div className="container mt-2">
        {newService && (
          <AggiungiServizio handleClose={handleClose} addService={addService} />
        )}
        {newValidityPeriod && (
          <AggiungiValidity
            handleClose={handleCloseValidity}
            addValidity={addValidityPeriod}
          />
        )}
        <div style={{ margin: "10%" }}>
          <Card color="blue" centered fluid>
            <Card.Header>
              <Header as="h2" className="text-center my-3">
                Create a new Service Package
              </Header>
            </Card.Header>
            <Card.Content>
              <Form>
                <Form.Group widths="equal">
                  {" "}
                  <Form.Input
                    label="Name:"
                    id="name"
                    value={pkgData.values.name}
                    onChange={pkgData.handleChange}
                    onBlur={pkgData.handleBlur}
                    error={pkgData.errors.name && pkgData.touched.name}
                  />
                  <Form.Input
                    label="Description:"
                    id="description"
                    value={pkgData.values.description}
                    onChange={pkgData.handleChange}
                    onBlur={pkgData.handleBlur}
                    error={
                      pkgData.errors.description && pkgData.touched.description
                    }
                  />
                </Form.Group>
                <hr />
                <Label className="" color="">
                  Included Services
                </Label>
                <Button
                  className="mt-md-0 mt-3 col-lg-2 col-md-4 col-12 rounded-pill"
                  icon
                  labelPosition="left"
                  size="tiny"
                  floated="right"
                  color="green"
                  onClick={() => setNewService(true)}
                >
                  <Icon name="add" />
                  Add new service
                </Button>
                {servizi && !isLoading && (
                  <ListaServiziEmp
                    servizi={servizi}
                    clickService={clickService}
                  />
                )}
                <hr />
                <div className="mb-3 mt-3">
                  <Label color="">Validity and price</Label>
                  <Button
                    className="mt-md-0 mt-3 mb-md-0 mb-3 col-lg-2 col-md-4 col-12 rounded-pill"
                    icon
                    labelPosition="left"
                    size="tiny"
                    floated="right"
                    color="green"
                    onClick={() => setNewValidityPeriod(true)}
                  >
                    <Icon name="add" />
                    Add new validity
                  </Button>
                </div>

                {validityPeriods && (
                  <ListaValidity validity={validityPeriods} />
                )}
                <hr />
                <center>
                  <Button
                  className="rounded-pill"
                    type="submit"
                    color="blue"
                    onClick={pkgData.handleSubmit}
                  >
                    <Icon name="add" /> Add Service Package
                  </Button>
                </center>
              </Form>
            </Card.Content>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePageEmp;
