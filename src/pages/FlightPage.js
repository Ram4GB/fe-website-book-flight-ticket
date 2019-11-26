import React, { Component } from "react";
import FlightListContainer from "../modules/flight/containers/FlightListContainer";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";

export class FlightPage extends Component {
  componentWillMount() {
    document.title = "FlyNow | Quản lí Chuyến bay";
  }
  render() {
    const { history, match } = this.props;
    return (
      <>
        <CustomBreadcrumb
          items={[
            { url: "/admin/dashboard", icon: "home", title: "Bảng điều khiển" },
            { url: "/admin/flight", icon: "rocket", title: "Chuyến bay" }
          ]}
        />
        <FlightListContainer
          history={history}
          match={match}
        ></FlightListContainer>
      </>
    );
  }
}

export default FlightPage;
