import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";

const TableSuspendedOrder = (props) => {
  return (
    <Table stackable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Order ID</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>Amount with Optionals</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.orders.map((order) => (
          <Table.Row>
            <Table.Cell> {order.orderID}</Table.Cell>
            <Table.Cell> {order.amount}</Table.Cell>
            <Table.Cell> {order.amountWithOptionals}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TableSuspendedOrder;
