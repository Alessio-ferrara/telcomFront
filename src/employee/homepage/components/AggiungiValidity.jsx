import { faCube, faDollarSign, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React from "react";

import { Button, Form, Modal } from "semantic-ui-react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useHttpClient } from "../../../util/http-hook";

const validitySchema = Yup.object().shape({
  duration: Yup.number().integer().required(),
  amount: Yup.number(),
});

const AggiungiValidity = (props) => {
  const validityData = useFormik({
    initialValues: {
      duration: "",
      amount: "",
    },
    validationSchema: validitySchema,
    onSubmit: async (values) => {
      Swal.fire({
        icon: "success",
        title: "A new validity period was added correctly!",
      }).then(() => {
        props.addValidity({
          duration: parseInt(values.duration),
          amount: parseInt(values.amount),
        });
        props.handleClose();
      });
    },
  });

  return (
    <Modal
      onClose={() => props.handleClose()}
      open={true}
      style={{ position: "relative", height: "auto" }}
    >
      <Modal.Header className="text-center">
        Add new validity and price{" "}
        <FontAwesomeIcon className="ml-2" icon={faDollarSign} />
      </Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                label="Duration"
                id="duration"
                fluid
                value={validityData.values.duration}
                error={
                  validityData.errors.duration && validityData.touched.duration
                }
                onChange={validityData.handleChange}
                onBlur={validityData.handleBlur}
              />
              <Form.Input
                label="Amount"
                id="amount"
                fluid
                value={validityData.values.amount}
                error={
                  validityData.errors.amount && validityData.touched.amount
                }
                onChange={validityData.handleChange}
                onBlur={validityData.handleBlur}
              />
            </Form.Group>
          </Form>
        </Modal.Description>
        <Modal.Actions>
          <Button
            positive
            className="float-right mt-md-2"
            onClick={validityData.handleSubmit}
            floated="right"
            type="submit"
          >
            Add
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
};

export default AggiungiValidity;
