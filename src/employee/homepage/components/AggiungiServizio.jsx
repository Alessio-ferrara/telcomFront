import { faCube, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React from "react";

import { Button, Form, Modal } from "semantic-ui-react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useHttpClient } from "../../../util/http-hook";

const serviceSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
});

const AggiungiServizio = (props) => {
  const { sendRequest } = useHttpClient();

  const serviceData = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: serviceSchema,
    onSubmit: async (values) => {
      try {
        const service = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + `/services/createService/`,
          "POST",
          JSON.stringify({
            name: values.name,
            description: values.description,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        Swal.fire({
          icon: "success",
          title: "A new service was added correctly!",
        }).then(() => {
          props.addService(service)
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
      <Modal.Header className="text-center">
        Add new service <FontAwesomeIcon className="ml-2" icon={faCube} />
      </Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                label="Name"
                id="name"
                fluid
                value={serviceData.values.name}
                error={serviceData.errors.name && serviceData.touched.name}
                onChange={serviceData.handleChange}
                onBlur={serviceData.handleBlur}
              />
              <Form.Input
                label="Description"
                id="description"
                fluid
                value={serviceData.values.description}
                error={
                  serviceData.errors.description &&
                  serviceData.touched.description
                }
                onChange={serviceData.handleChange}
                onBlur={serviceData.handleBlur}
              />
            </Form.Group>
          </Form>
        </Modal.Description>
        <Modal.Actions>
          <Button
            positive
            className="float-right mt-md-2"
            onClick={serviceData.handleSubmit}
            floated="right"
          >
            Add service
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
};

export default AggiungiServizio;
