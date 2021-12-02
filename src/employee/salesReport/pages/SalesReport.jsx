import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../../util/http-hook";

import Swal from "sweetalert2";
import { Menu, Segment } from "semantic-ui-react";
import TablePurchasePackage from "../components/TablePurchasePackage";
import TablePurchasePkgValidity from "../components/TablePurchasePkgValidity";
import TableAvg from "../components/TableAvg";
import TableInsolvent from "../components/TableInsolvent";
import TableAlerts from "../components/TableAlerts";
import TableSuspendedOrder from "../components/TableSuspendedOrder";

const SalesReport = () => {
  const { sendRequest, isLoading } = useHttpClient();

  const [reports, setReports] = useState();
  const [activeItem, setActiveItem] = useState("Purchase Package");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  useState(() => {
    const getReports = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/report",
          "GET",
          null
        );
        setReports(response);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Qualcosa è andato storto...",
          text: error.message,
        });
      }
    };
    getReports();
  }, [sendRequest]);

  console.log(reports);

  return (
    <div className="container mt-2">
      <Menu pointing secondary stackable>
        <Menu.Item
          name="Purchase Package"
          active={activeItem === "Purchase Package"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Purchase Package Validity"
          active={activeItem === "Purchase Package Validity"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Average Optional Package"
          active={activeItem === "Average Optional Package"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Insolvent Users"
          active={activeItem === "Insolvent Users"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Alerts"
          active={activeItem === "Alerts"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Suspended Orders"
          active={activeItem === "Suspended Orders"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="BestSeller Optional"
          active={activeItem === "BestSeller Optional"}
          onClick={handleItemClick}
        />
      </Menu>
      <Segment attached="bottom">
          {!isLoading && reports && activeItem === "Purchase Package" && (
              <TablePurchasePackage pkgs = {reports.pkgPurchased} />
          )}
          {!isLoading && reports && activeItem === "Purchase Package Validity" && (
              <TablePurchasePkgValidity pkgs = {reports.pkgPurchasedValidity} />
          )}
          {!isLoading && reports && activeItem === "Average Optional Package" && (
              <TableAvg pkgs = {reports.avgOptionalsPackage} />
          )}
          {!isLoading && reports && activeItem === "Insolvent Users" && (
              <TableInsolvent usrs = {reports.insolventUsers} />
          )}
          {!isLoading && reports && activeItem === "Alerts" && (
              <TableAlerts alerts = {reports.alerts} />
          )}
          {!isLoading && reports && activeItem === "Suspended Orders" && (
              <TableSuspendedOrder orders = {reports.suspendedOrders} />
          )}
      </Segment>

    </div>
  );
};

export default SalesReport;
