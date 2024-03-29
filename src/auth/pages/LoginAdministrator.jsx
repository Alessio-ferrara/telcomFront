import React, { useState } from "react";

import { useFormik } from "formik";
import { Form, Card, Button, Icon, Header } from "semantic-ui-react";
import Swal from "sweetalert2";
import * as Yup from "yup";

import { useHttpClient } from "../../util/http-hook";
import authService from "../../services/authService";
import { useNavigate } from "react-router";

const loginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const LoginAdministrator = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const navigate = useNavigate();

  const loginData = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/auth/loginEmployee",
          "POST",
          JSON.stringify({
            username: values.username,
            password: values.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        authService.login(
          responseData.id,
          responseData.username,
          responseData.token,
          responseData.type
        );
        navigate("/");
        navigate(0);
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
                  LOGIN AS ADMINISTRATOR
                </Header>
              </Card.Header>
              <Card.Content>
                <Form size="large">
                  <Form.Input
                    label="Username:"
                    id="username"
                    value={loginData.values.username}
                    onChange={loginData.handleChange}
                    onBlur={loginData.handleBlur}
                    error={
                      loginData.errors.username && loginData.touched.username
                    }
                  />
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
                    className="rounded-pill" 
                    onClick={loginData.handleSubmit}
                  >
                    <Icon name="sign in" /> ACCEDI
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

export default LoginAdministrator;
