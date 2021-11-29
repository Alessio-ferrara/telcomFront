import { faCube, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React from "react";

import { Button, Form, Icon, Modal } from "semantic-ui-react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useHttpClient } from "../../../util/http-hook";

const optionalSchema = Yup.object().shape({
  name: Yup.string().required(),
  montly_cost: Yup.number().required(),
});

const AddOptional = (props) => {
  const { sendRequest } = useHttpClient();

  const optionalData = useFormik({
    initialValues: {
      name: "",
      montly_cost: "",
    },
    validationSchema: optionalSchema,
    onSubmit: async (values) => {
      try {
        const optional = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + `/optional/createOptional/`,
          "POST",
          JSON.stringify({
            name: values.name,
            montlyCost: parseFloat(values.montly_cost),
          }),
          {
            "Content-Type": "application/json",
          }
        );
        Swal.fire({
          icon: "success",
          title: "A new optional was added correctly!",
        }).then(() => {
          props.insertOptional(optional);
          props.handleClose();
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong...",
          text: err,
        });
      }
    },
  });
  return (
    <Modal
      onClose={() => props.handleClose()}
      open={true}
      style={{ position: "relative", height: "auto" }}
    >
      <Modal.Header className="text-center">Add new optional</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                label="Name"
                id="name"
                fluid
                value={optionalData.values.name}
                error={optionalData.errors.name && optionalData.touched.name}
                onChange={optionalData.handleChange}
                onBlur={optionalData.handleBlur}
              />
              <Form.Input
                label="Monthly cost"
                id="montly_cost"
                fluid
                value={optionalData.values.montly_cost}
                error={
                  optionalData.errors.montly_cost &&
                  optionalData.touched.montly_cost
                }
                icon={<Icon name="euro sign"/>}
                onChange={optionalData.handleChange}
                onBlur={optionalData.handleBlur}
              />
            </Form.Group>
          </Form>
        </Modal.Description>
        <Modal.Actions>
          <Button
            positive
            className="float-right mt-md-2"
            onClick={optionalData.handleSubmit}
            floated="right"
          >
            Add optional
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
};

export default AddOptional;
