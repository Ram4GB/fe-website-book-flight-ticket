import React, { Component } from "react";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";
import OrderInformationContainer from "../modules/order/containers/OrderInformationContainer";

export class OrderInformationPage extends Component {
  render() {
    return (
      <>
        <CustomBreadcrumb
          items={[
            { title: "Bảng điều khiển", icon: "home", url: "/admin/dashboard" },
            { title: "Hóa đơn", icon: "file-text", url: "/admin/order" },
            {
              title: "Chi tiết Hóa đơn",
              icon: "file-text",
              url: `/admin/order/${this.props.match.params.id}`
            }
          ]}
        ></CustomBreadcrumb>
        <OrderInformationContainer {...this.props}></OrderInformationContainer>
      </>
    );
  }
}

export default OrderInformationPage;
