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
    <div className="text-decoration-none text-muted text-center mt-2 mb-3">
    <strong>{props.description}</strong>
    </div>
<Link to={`/packagedetails/${props.id_pkg}`} className=" btn btn-primary btn-lg text-decoration-none mt-3" activeClassName="active">Scopri di più...</Link>
    </div>
  );
};

export default PacchettoItem;
