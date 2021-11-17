import React from "react";

 import ServizioItem from './ServizioItem'

const ListaOptional = (props) => {
    if (props.optionals.length > 0) {
        return (
          <React.Fragment>
            <div className=" my-2 mx-3">
              <div className="row">
                <ul>

              {props.optionals.map((optional) => (
                  // key={optioanl.serviceID}
                  // name={servizio.name}
              ))}
              </ul>

            </div>
            </div>

            <br></br>
          </React.Fragment>
        );
      }
};

export default ListaOptional;