import React, { Component } from "react";
import FlightListContainer from "../modules/flight/containers/FlightListContainer";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";

export class FlightPage extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <CustomBreadcrumb
          items={[
            { url: "/admin/dashboard", icon: "home", title: "Bảng điều khiển" },
            { url: "/admin/flight", icon: "rocket", title: "Chuyến bay" }
          ]}
        />
        <FlightListContainer history={history}></FlightListContainer>
      </>
    );
  }
}

export default FlightPage;
