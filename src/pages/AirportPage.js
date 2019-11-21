import React, { Component } from "react";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";
import AirportListContainer from "../modules/flight/containers/AirportListContainer";

export class AirportPage extends Component {
  componentWillMount() {
    document.title = "FlyNow | Quản lí Sân bay";
  }
  render() {
    const { history, match } = this.props;
    return (
      <>
        <CustomBreadcrumb
          items={[
            { url: "/admin/dashboard", icon: "home", title: "Bảng điều khiển" },
            { url: "/admin/airport", icon: "bank", title: "Sân bay" }
          ]}
        />
        <AirportListContainer
          history={history}
          match={match}
        ></AirportListContainer>
      </>
    );
  }
}

export default AirportPage;
