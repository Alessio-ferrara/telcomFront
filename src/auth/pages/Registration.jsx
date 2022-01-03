import React, { useState } from "react";

import { useFormik } from "formik";
import { Form, Card, Button, Icon, Header } from "semantic-ui-react";
import Swal from "sweetalert2";
import * as Yup from "yup";

import { useHttpClient } from "../../util/http-hook";
import authService from "../../services/authService";
import { useLocation, useNavigate } from "react-router";

const registrationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
  email: Yup.string().required(),
});

const Registration = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  console.log(data)

  const loginData = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/auth/registration",
          "POST",
          JSON.stringify({
            username: values.username,
            password: values.password,
            email: values.email,
          }),
          {
            "Content-Type": "application/json",
          }
        );
          console.log(data)
        if (data && data.from) {
          navigate("/login", {
            state: data,
          });
        } else {
          navigate("/login")
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong...",
          text: error.message,
        });
      }
    },
  });
  return (
    <React.Fragment>
      <div className="container mt-2">
        {!isLoading && (
          <div style={{ margin: "10%" }}>
            <Card color="blue" centered fluid>
              <Card.Header>
                <Header as="h2" className="text-center my-3">
                  Sign up
                </Header>
              </Card.Header>
              <Card.Content>
                <Form size="large">
                  <Form.Group widths="equal">
                    <Form.Input
                      label="Username:"
                      id="username"
                      value={loginData.values.username}
                      fluid
                      onChange={loginData.handleChange}
                      onBlur={loginData.handleBlur}
                      error={
                        loginData.errors.username && loginData.touched.username
                      }
                    />
                    <Form.Input
                      label="Email:"
                      id="email"
                      fluid
                      value={loginData.values.email}
                      onChange={loginData.handleChange}
                      onBlur={loginData.handleBlur}
                      error={loginData.errors.email && loginData.touched.email}
                    />
                  </Form.Group>

                  <Form.Input
                    label="Password:"
                    id="password"
                    type="password"
                    value={loginData.values.password}
                    onChange={loginData.handleChange}
                    onBlur={loginData.handleBlur}
                    error={
                      loginData.errors.password && loginData.touched.password
                    }
                  />

                  <Button
                    type="submit"
                    color="facebook"
                    floated="right"
                    onClick={loginData.handleSubmit}
                  >
                    <Icon name="signup" /> Sign-up
                  </Button>
                </Form>
              </Card.Content>
            </Card>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Registration;
