import React from "react";
import { Checkbox } from "semantic-ui-react";
import ServizioItem from "./ServizioItem";

const ListaOptional = (props) => {
  // console.log(props.optionals);
  if (props.optionals.length > 0) {
    return (
      <React.Fragment>
        <div className=" my-2 mx-3">
          <div className="row">
            <ul>
              {props.optionals.map((optional) => (
                <div className="col-md-6 mb-2">
                  <Checkbox
                    toggle
                    id={optional.optID}
                    label={optional.name}
                    name= {optional.name}
                    onChange={(e) => {
                      props.AddOptional(
                        e.target.id,
                        e.target.parentElement.parentElement.childNodes[1].getAttribute(
                          "value"
                        ),
                        e.target.name
                      );
                    }}
                  />
                  <span
                    value={optional.montlyCost}
                    style={{ display: "inline-block", marginLeft: "1vw" }}
                    className="align-right text-muted"
                  >
                    €{optional.montlyCost}
                  </span>
                </div>
              ))}
            </ul>
          </div>
        </div>

        <br></br>
      </React.Fragment>
    );
  } else {
    return <div></div>;
  }
};

export default ListaOptional;
