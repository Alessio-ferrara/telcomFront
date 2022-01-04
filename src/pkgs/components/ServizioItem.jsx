import {
  faCube,
  faCubes,
  faUsers,
  faBroadcastTower,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const ServizioItem = (props) => {
  return (
    <div className="container-fluid mb-2">
      <div style={{ fontWeight: "bold" }}>
      <hr/>
        <FontAwesomeIcon icon={faCube} /> {props.servizio.type}
      </div>
      {props.name}
      <div>
        <span className="text-muted mt-0" style={{ fontSize: "0.6em" }}>
          {props.description}
        </span>
      </div>

      {props.servizio.type == "Mobile Phone" && (
        <div style={{ fontSize: "0.6em" }}>
          <div className="row">
            <div className="col-6">
              <span style={{ fontWeight: "bold" }}>Minutes every month: </span>
              {props.servizio.numberOfMinutes}
            </div>
            <div className="col-6">
              <span style={{ fontWeight: "bold" }}>Sms every month: </span>
              {props.servizio.numberOfSms}
            </div>
            <div className="col-6">
              <span style={{ fontWeight: "bold" }}>Fee for extra minute: </span>
              {props.servizio.feeMinutes} €
            </div>
            <div className="col-6">
              <span style={{ fontWeight: "bold" }}>Fee for extra sms: </span>
              {props.servizio.feeSms} €
            </div>
          </div>
        </div>
      )}

      {(props.servizio.type == "Mobile Internet" || props.servizio.type === "Fixed Internet") && (
        <div style={{ fontSize: "0.6em" }}>
          <div className="row">
            <div className="col-6">
              <span style={{ fontWeight: "bold" }}>GigaBytes every month: </span>
              {props.servizio.numberOfGB}
            </div>
            <div className="col-6">
              <span style={{ fontWeight: "bold" }}>Fee for extra GigaByte: </span>
              {props.servizio.feeGB} €
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServizioItem;
