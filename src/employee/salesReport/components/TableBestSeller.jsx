import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";

const TableBestSeller = (props) => {
  return (
    <Table stackable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Optional ID</Table.HeaderCell>
          <Table.HeaderCell>Number of sales</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
          <Table.Row>
            <Table.Cell> {props.opt.optID}</Table.Cell>
            <Table.Cell> {props.opt.nSold}</Table.Cell>
          </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default TableBestSeller;
