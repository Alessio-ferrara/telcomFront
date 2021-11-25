import React, { StrictMode } from "react";
import moment from "moment";

import {
  faCube,
  faCubes,
  faAngleRight,
  faUsers,
  faShoppingBag,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
const ListaOrdini = (props) => {
  const navigate = useNavigate();

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
                  description={
                    <div className="row mt-3">
                      <div className="col-md-8 col-12">
                        <p>
                          {ord.pkg.name}
                          <p className="text-muted">{ord.pkg.description}</p>
                          <p>
                            {"Starting from " +
                              moment(
                                ord.startingDate,
                                "YYYY-MM-DDTHH:mm"
                              ).format("DD/MM/YYYY") +
                              ",  and valid for " +
                              ord.duration +
                              " months"}
                          </p>
                        </p>
                        <p>{"Total Amount: €" + ord.amount}</p>
                      </div>
                      <div className="col-md-4 col-12 text-center mb-3">
                        <Button
                          color="google plus"
                          size="big"
                          onClick={() => {
                            let array = [];
                            for (
                              let i = 0;
                              i < ord.orderPackageOptionals.length;
                              i++
                            ) {
                              array.push(
                                ord.orderPackageOptionals[i].optionalService
                              );
                            }
                            ord.pkg.optionals = array;
                            ord.pkg.price = ord.amount;
                            ord.pkg.validity = ord.duration;
                            ord.pkg.date = moment(
                              ord.startingDate,
                              "YYYY-MM-DDTHH:mm"
                            ).format();
                            navigate("/confirmationpage", {
                              state: ord.pkg,
                            });
                          }}
                        >
                          <FontAwesomeIcon icon={faCartPlus} />
                          &nbsp; Complete Purchase
                        </Button>
                      </div>
                    </div>
                  }
                ></Card>
              ))}
            </Card.Group>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default ListaOrdini;
