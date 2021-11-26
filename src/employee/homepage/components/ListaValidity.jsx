import React from "react";
import { Table } from "semantic-ui-react";
import ServizioItemEmp from "./ServizioItemEmp";
import ValidityItem from "./ValidityItem";

const ListaValidity = (props) => {
  if (props.validity.length === 0) {
    return (
      <div className="mx-0 justify-content-center">
        <div className="col-12">
          <p
            className="mt-3 "
            style={{ fontSize: "15px", fontWeight: "bolder" }}
          >
            No validity periods added , try to add some before inserting the package!
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <Table celled unstackable> 
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Duration</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.validity.map((v, i) => (
              <ValidityItem
                key={i}
                duration={v.duration}
                amount={v.amount}
              />
            ))}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
};

export default ListaValidity;
