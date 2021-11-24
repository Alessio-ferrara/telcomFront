import React, { useState } from "react";


import { useFormik } from "formik";
import { Form, Card, Button, Icon, Header } from "semantic-ui-react";
import Swal from "sweetalert2";
import * as Yup from "yup";

import { useHttpClient } from "../../util/http-hook";
import authService from "../../services/authService";

const loginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required()
})

const Login = () => {

  const { sendRequest, isLoading } = useHttpClient();
  const [recupera, setRecupera] = useState();

  const loginData = useFormik({
    initialValues: {
      username : "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/auth/login",
          "POST",
          JSON.stringify({
            username: values.username,
            password: values.password
          }),
          {
            "Content-Type" : "application/json"
          }
        )
        authService.login(
          responseData.userID,
          responseData.username,
          responseData.token,
          responseData.type
        );
      } catch(error) {
        Swal.fire({
          icon: "error",
          title: "Qualcosa è andato storto...",
          text: error.message,
        });
      }
    }
  })
  return (
    <React.Fragment>
{!isLoading && (
      <div style={{ margin: "10%" }}>
        <Card color="blue" centered fluid>
          <Card.Header>
            <Header as="h2" className="text-center my-3">
              Accedi
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
                error={loginData.errors.username && loginData.touched.username}
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
              <label type="button" style={{ color: "gray", fontSize: "70%" }} onClick={() => setRecupera(true)}>
                 Password dimenticata?
              </label>
              <Button
                type="submit"
                color="blue"
                floated="right"
                onClick={loginData.handleSubmit}
              >
                <Icon name="sign in" /> Accedi
              </Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    )}
    </React.Fragment>
    
  );
};

export default Login;
