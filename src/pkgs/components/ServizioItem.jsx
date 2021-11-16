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
    <div className="container-fluid">
      <div className="row">
        <div className="col-1">
          <FontAwesomeIcon icon={faCube} />
        </div>
        <div className="col-11">
          {props.name}
          <br></br>
          <span className="text-muted" style={{fontSize:"0.8em"}}>{props.description}</span>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ServizioItem;
