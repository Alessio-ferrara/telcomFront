import React from "react";
import { Checkbox, Label } from "semantic-ui-react";

const ListaOptionalEmp = (props) => {
  if (props.optionals.length > 0) {
    return (
      <React.Fragment>
        <div className="my-2 mx-3">
          <div className="row">
            {props.optionals.map((optional) => (
              <div className="col-md-3 p-0">
                <Label tag color="blue">
                  {optional.name}
                  <Label.Detail>{optional.montlyCost} €</Label.Detail>
                </Label>
              </div>
            ))}
          </div>
        </div>

        <br></br>
      </React.Fragment>
    );
  } else {
    return (
      <div className="row mx-0 justify-content-center">
        <div className="col-12">
          <p
            className="col card py-2 px-3 shadow mt-3"
            style={{ fontSize: "14px", borderRadius: "10px" }}
          >
            Al momento non ci sono pacchetti, aggiungi un nuovo pacchetto per
            visualizzarlo qui.
          </p>
        </div>
      </div>
    );
  }
};

export default ListaOptionalEmp;
