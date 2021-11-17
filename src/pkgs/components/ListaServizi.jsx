import React from "react";

 import ServizioItem from './ServizioItem'

const ListaServizi = (props) => {
    if (props.servizi.length === 0) {
        return (
          <div className="mx-0 justify-content-center">
            <div className="col-12">
              <p
                className="mt-3 text-danger"
                style={{ fontSize: "30px", fontWeight:"bolder" }}
              >
                Il pacchetto selezionato non ha nessun servizio abilitato!
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
                <ServizioItem
                  key={servizio.serviceID}
                  name={servizio.name}
                  description={servizio.description}
                  />
              ))}
            </div>
            </div>

            <br></br>
          </React.Fragment>
        );
      }
};

export default ListaServizi;