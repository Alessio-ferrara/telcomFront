import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";

const TableInsolvent = (props) => {
  return (
    <Table stackable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>User ID</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.usrs.map((usr) => (
          <Table.Row>
            <Table.Cell> {usr.userID}</Table.Cell>
            <Table.Cell> {usr.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TableInsolvent;
