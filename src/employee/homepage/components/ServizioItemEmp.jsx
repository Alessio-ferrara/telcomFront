import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Checkbox } from "semantic-ui-react";

const ServizioItemEmp = (props) => {

  return (
    <div className="col-md-4 col-12 mt-3 p-0">
      <Checkbox toggle label={props.name} onClick={(e)=> props.clickService({serviceID: parseInt(props.id) , name: props.name, description: props.description })}/>
    </div>
  );
};

export default ServizioItemEmp;
