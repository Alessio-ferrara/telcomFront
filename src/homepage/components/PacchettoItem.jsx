import {
  faArrowRight,
  faBroadcastTower,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Label } from "semantic-ui-react";

const PacchettoItem = (props) => {
  return (
    <React.Fragment>
      <div class="col-md-12 mb-3 mt-3 px-auto mx-auto mt-4 col-lg-5 mt-3 mb-3 pt-3 pb-3 text-truncate">
        <div class="card text-center">
        
          <div class="card-body">
            {/* <Label as='a' color='red' ribbon>
          Overview
        </Label> */}
        <p style={{marginLeft: "45%"}} class="position-absolute top-0 start-50 translate-middle p-2 bg-danger border border-light rounded-pill badge">
        NEW </p>
            <h3 class="card-title"> {props.name}</h3>
            <p class="card-text w-100 text-muted mt-3">{props.description}</p>
            
            <Link
              to={`/packagedetails/${props.id_pkg}`}
              className=" btn btn-lg text-decoration-none mt-3 mb-3 rounded-pill"
              activeClassName="active"
              style={{backgroundColor:"#3b5998", color:"white"}}
            >
              Scopri di più &nbsp;
              <Icon name="arrow right"></Icon>
              {}
            </Link>
          </div>
        </div>
      </div>
      {/* <div
      className="card shadow col-sm-5 px-auto mx-auto mt-4 col-md-4 mt-3 mb-3 pt-3 pb-3"
      style={{ border: "none", borderRadius: "10px", height:"30vh" }}
    >
      <div style={{fontSize:"2em"}} class="display-6 text-center mb-3">
      {props.name}
    </div>
    <hr/>
    <div className="text-decoration-none text-muted text-center mt-3 mb-3">
    <strong>{props.description}</strong>
    </div>
    </div>
    <div className="col-1">
    </div> */}
    </React.Fragment>
  );
};

export default PacchettoItem;
