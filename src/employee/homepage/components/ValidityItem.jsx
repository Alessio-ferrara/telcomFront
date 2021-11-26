import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Checkbox, Header, Table } from "semantic-ui-react";

const ValidityItem = (props) => {
  return (
    <Table.Row>
      <Table.Cell>{props.duration}</Table.Cell>
      <Table.Cell>{props.amount} €</Table.Cell>
    </Table.Row>
  );
};

export default ValidityItem;
