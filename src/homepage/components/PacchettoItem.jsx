import {

  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";


const PacchettoItem = (props) => {
  return (
    <div
      className="card shadow col-sm-9 mx-auto mt-4"
      style={{ border: "none", borderRadius: "10px" }}
    >
      <div
        className="d-flex justify-content-between mb-3 mt-2"
        style={{ fontSize: "105%" }}
      >
        <div>
          <FontAwesomeIcon icon={faUsers} />{" "}
          <span style={{ fontWeight: 700, fontSize: "110%" }} className="ml-1">
            {props.description} {props.name}
          </span>{" "}
        </div>
        <div>
      </div>

    </div>
    </div>
  );
};

export default PacchettoItem;
