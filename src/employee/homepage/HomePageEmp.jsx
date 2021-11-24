import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../util/http-hook";
import { Form, Card, Button, Icon, Header, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const HomePageEmp = () => {
  const { sendRequest, isLoading } = useHttpClient();

  const loginData = useFormik({
    initialValues: {
      name: "",
      description: "",
      services: [],
      prices: [],
    },
    onSubmit: async (values) => {
      try {
        const responseData = await sendRequest(
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
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Qualcosa è andato storto...",
          text: error.message,
        });
      }
    },
  });

  return (
    <React.Fragment>
      <div style={{ margin: "10%" }}>
        <Card color="blue" centered fluid>
          <Card.Header>
            <Header as="h2" className="text-center my-3">
              Add new package service
            </Header>
          </Card.Header>
          <Card.Content>
            <Form>
              <Form.Group widths="equal">
                {" "}
                <Form.Input
                  label="Name:"
                  id="name"
                  value={loginData.values.name}
                  onChange={loginData.handleChange}
                  onBlur={loginData.handleBlur}
                  error={loginData.errors.name && loginData.touched.name}
                />
                <Form.Input
                  label="Description:"
                  id="description"
                  value={loginData.values.description}
                  onChange={loginData.handleChange}
                  onBlur={loginData.handleBlur}
                  error={
                    loginData.errors.description &&
                    loginData.touched.description
                  }
                />
              </Form.Group>

              <Button
                type="submit"
                color="blue"
                floated="right"
                onClick={loginData.handleSubmit}
              >
                <Icon name="sign in" /> Insert
              </Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default HomePageEmp;
