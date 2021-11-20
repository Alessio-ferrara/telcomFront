import {

  faUsers,
  faBroadcastTower,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from 'react-router-dom';


const PacchettoItem = (props) => {

  return (
    <div
      className="card shadow col-sm-9 mx-auto mt-4 col-md-4 mt-3 mb-3 pt-3 pb-3"
      style={{ border: "none", borderRadius: "10px" }}
    >
      <div style={{fontSize:"2em"}} class="display-6 text-center">
      {props.name}
    </div>
    <hr/>
    <div className="text-decoration-none text-muted text-center mt-2">
    <strong>{props.description}</strong>
    </div>
<Link to={`/packagedetails/${props.id_pkg}`} className=" btn btn-primary btn-lg text-decoration-none mt-3" activeClassName="active">Scopri di più...</Link>
      {/* <div
        className="d-flex mb-3 mt-2"
        style={{ fontSize: "105%" }}
      >
        <div>
          <FontAwesomeIcon className="fa-lg text-muted" icon={faBroadcastTower} />{" "}
          <span style={{ fontWeight: 800 }} className="ml-1">
            <h3>
            {props.name}
            </h3>
          </span>
          <span>
          {props.description}
          <br/>
          <Link to={`/packagedetails/${props.id_pkg}`} className=" btn btn-primary text-decoration-none" activeClassName="active">Scopri di più...</Link>
          </span>
        </div>
        <div>
      </div>

    </div> */}
    </div>
  );
};

export default PacchettoItem;
