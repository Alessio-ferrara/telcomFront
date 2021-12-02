import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";

const TableAlerts = (props) => {
  return (
    <Table stackable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Alert  ID</Table.HeaderCell>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>Amount rejected</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.alerts.map((alert) => (
          <Table.Row>
            <Table.Cell> {alert.alertID}</Table.Cell>
            <Table.Cell> {alert.username}</Table.Cell>
            <Table.Cell> {alert.amountRejected}</Table.Cell>
            <Table.Cell> {alert.datetime}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TableAlerts;
