import React from "react";
import moment from "moment";

import {
  faCube,
  faCubes,
  faAngleRight,
  faUsers,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card , Button} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
const ListaOrdini = (props) => {
  const navigate= useNavigate();

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
                   meta={"Starting from "+  moment(ord.startingdate).format("DD/MM/YYYY") +",  and valid for " + ord.duration+" months"}
                   description= {<div>
                  <p>
                    {"Package : " + ord.pkg.name}
                    <span className="text-muted">
                    {ord.pkg.description}
                    </span>
                  </p>
                  <p>
                    {"Total Amount: €" + ord.amount  }
                  </p>
                  <Button
                          
                          color="facebook"
                          size="big"
                          onClick={() => {
                            navigate("/confirmationpage", {
                              state: ord,

                            });
                          }}
                        >
                          <FontAwesomeIcon icon={faShoppingBag} />
                          &nbsp; Purchase
                        </Button>
                   </div>}
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
