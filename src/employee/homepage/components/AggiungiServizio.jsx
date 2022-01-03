import { faCube, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";

import { Button, Dropdown, Form, FormGroup, Modal } from "semantic-ui-react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useHttpClient } from "../../../util/http-hook";

const serviceSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  type: Yup.string().required(),
});

const typeOptions = [
  {
    key: 1,
    text: "Fixed Phone",
    value: "Fixed Phone",
  },
  {
    key: 2,
    text: "Mobile Phone",
    value: "Mobile Phone",
  },
  {
    key: 3,
    text: "Fixed Internet",
    value: "Fixed Internet",
  },
  {
    key: 4,
    text: "Mobile Internet",
    value: "Mobile Internet",
  },
];

const AggiungiServizio = (props) => {
  const { sendRequest } = useHttpClient();
  const [type, setType] = useState();

  const serviceData = useFormik({
    initialValues: {
      name: "",
      description: "",
      type: "",
      smsN: 0,
      minuteN: 0,
      minuteFee: 0,
      smsFee: 0,
      gbN: 0,
      gbFee: 0
    },
    validationSchema: serviceSchema,
    onSubmit: async (values) => {
      try {
        const service = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + `/services/createService/`,
          "POST",
          JSON.stringify({
            name: values.name,
            type: values.type,
            description: values.description,
            numberOfMinutes: parseInt(values.minuteN) ,
            numberOfSms: parseInt(values.smsN),
            feeSms: parseFloat(values.smsFee),
            feeMinutes: parseFloat(values.minuteFee),
            numberOfGB: parseInt(values.gbN),
            feeGB: parseFloat(values.gbFee)
          }),
          {
            "Content-Type": "application/json",
          }
        );
        Swal.fire({
          icon: "success",
          title: "A new service was added correctly!",
        }).then(() => {
          props.addService(service);
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

  const handleOnChange = (e, data) => {
    serviceData.setFieldValue("type", data.value);
    setType(data.value);
  };

  console.log(serviceData.values);
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
                error={serviceData.errors.description && serviceData.touched.description}
                onChange={serviceData.handleChange}
                onBlur={serviceData.handleBlur}
              />
              <Form.Field>
                <label>Type:</label>
                <Dropdown
                  id="type"
                  fluid
                  search
                  selection
                  options={typeOptions}
                  error={serviceData.errors.type && serviceData.touched.type}
                  onChange={handleOnChange}
                />
              </Form.Field>
            </Form.Group>
            {type == "Mobile Phone" && (
              <Form >
                <Form.Group widths="equal">
                  <Form.Input
                    label="Number of SMS"
                    id="smsN"
                    fluid
                    value={serviceData.values.smsN}
                    error={serviceData.errors.smsN && serviceData.touched.smsN}
                    onChange={serviceData.handleChange}
                    onBlur={serviceData.handleBlur}
                  />
                  <Form.Input
                    label="Fee for extra sms"
                    id="minuteN"
                    fluid
                    value={serviceData.values.minuteN}
                    error={
                      serviceData.errors.minuteN && serviceData.touched.minuteN
                    }
                    onChange={serviceData.handleChange}
                    onBlur={serviceData.handleBlur}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Number of SMS"
                    id="smsFee"
                    fluid
                    value={serviceData.values.smsFee}
                    error={serviceData.errors.smsFee && serviceData.touched.smsFee}
                    onChange={serviceData.handleChange}
                    onBlur={serviceData.handleBlur}
                  />
                  <Form.Input
                    label="Fee for extra minute"
                    id="minuteFee"
                    fluid
                    value={serviceData.values.minuteFee}
                    error={
                      serviceData.errors.minuteFee && serviceData.touched.minuteFee
                    }
                    onChange={serviceData.handleChange}
                    onBlur={serviceData.handleBlur}
                  />
                </Form.Group>
              </Form>
            )} 
            {(type=="Mobile Internet" || type=="Fixed Internet") && (
              <Form.Group widths="equal">
              <Form.Input
                label="Number of GB"
                id="gbN"
                fluid
                value={serviceData.values.gbN}
                error={serviceData.errors.gbN && serviceData.touched.gbN}
                onChange={serviceData.handleChange}
                onBlur={serviceData.handleBlur}
              />
              <Form.Input
                label="Fee for extra GB"
                id="gbFee"
                fluid
                value={serviceData.values.gbFee}
                error={
                  serviceData.errors.gbFee && serviceData.touched.gbFee
                }
                onChange={serviceData.handleChange}
                onBlur={serviceData.handleBlur}
              />
            </Form.Group>
            )}
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
