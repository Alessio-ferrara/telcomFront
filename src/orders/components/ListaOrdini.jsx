import React from "react";
import {
  faCube,
  faCubes,
  faAngleRight,
  faUsers,
  faBroadcastTower,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "semantic-ui-react";

const ListaOrdini = (props) => {
  if (props.orders.length === 0) {
    return (
      <div className="mx-0 justify-content-center">
        <div className="col-12">
          <p
            className="mt-3 text-danger"
            style={{ fontSize: "30px", fontWeight: "bolder" }}
          >
            All orders have been correctly paid
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className=" my-2 mx-3 mt-3">
          <div className="row mt-3">
            <Card.Group className="mt-3 h5">
              {props.orders.map((ord) => (
                <Card
                  fluid
                  className="mb-4"
                  color="red"
                  header={"Order No. " + ord.orderID}
                  meta={"Starting from "+ ord.startingDate +",  for " + ord.duration+" months"}
                  description= {"Total Amount: €"+ ord.amount}
                >
                  </Card>
              ))}
            </Card.Group>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default ListaOrdini;
