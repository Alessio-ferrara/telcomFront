import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";

const TablePurchasePkgValidity = (props) => {
  return (
    <Table stackable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Package ID</Table.HeaderCell>
          <Table.HeaderCell>Validity</Table.HeaderCell>
          <Table.HeaderCell>Number of sales</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.pkgs.map((pkg) => (
          <Table.Row>
            <Table.Cell> {pkg.pkgID}</Table.Cell>
            <Table.Cell> {pkg.pkgID}</Table.Cell>
            <Table.Cell> {pkg.validity}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TablePurchasePkgValidity;
