import React from "react";
import ServizioItemEmp from "./ServizioItemEmp";

const ListaServiziEmp = (props) => {
  if (props.servizi.length === 0) {
    return (
      <div className="mx-0 justify-content-center">
        <div className="col-12">
          <p
            className="mt-3 "
            style={{ fontSize: "15px", fontWeight: "bolder" }}
          >
            No service was found, try to add some services before!
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className=" my-2 mx-3">
          <div className="row">
            {props.servizi.map((servizio) => (
              <ServizioItemEmp
                key={servizio.serviceID}
                id={servizio.serviceID}
                name={servizio.name}
                description = {servizio.description}
                clickService={props.clickService}
              />
            ))}
          </div>
        </div>

        <br></br>
      </React.Fragment>
    );
  }
};

export default ListaServiziEmp;
