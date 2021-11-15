import React from "react";

import PacchettoItem from './PacchettoItem'

const ListaPacchetti = (props) => {
    if (props.pacchetti.length === 0) {
        return (
          <div className="row mx-0 justify-content-center">
            <div className="col-12">
              <p
                className="col card py-2 px-3 shadow mt-3"
                style={{ fontSize: "14px", borderRadius: "10px" }}
              >
                Al momento non ci sono pacchetti, aggiungi un nuovo pacchetto
                per visualizzarlo qui.
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <React.Fragment>
            <ul className=" p-0 my-2 mx-3">
              {props.pacchetti.map((pacchetto) => (
                <PacchettoItem
                  key={pacchetto.PkgID}
                  name={pacchetto.name}
                  description={pacchetto.description}
                />
              ))}
            </ul>
            <br></br>
          </React.Fragment>
        );
      }
};

export default ListaPacchetti;