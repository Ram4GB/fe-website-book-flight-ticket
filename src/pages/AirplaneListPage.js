import React, { Component } from "react";
import AirplaneListContainer from "../modules/flight/containers/AirplaneListContainer";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";

export class AirplaneListPage extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <CustomBreadcrumb
          items={[
            {
              url: "/admin/dashboard",
              icon: "home",
              title: "Bảng điều khiển"
            },
            { url: "/admin/airplane", icon: "rocket", title: "Hãng hàng không" }
          ]}
        ></CustomBreadcrumb>
        <AirplaneListContainer history={history}></AirplaneListContainer>
      </>
    );
  }
}

export default AirplaneListPage;
