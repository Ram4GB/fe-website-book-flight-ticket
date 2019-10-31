import React, { Component } from "react";
import OrderListContainer from "../modules/order/containers/OrderListContainer";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";

export class OrderListPage extends Component {
  render() {
    return (
      <>
        <CustomBreadcrumb
          items={[
            { url: "/admin/dashboard", icon: "home", title: "Bảng điều khiển" },
            { url: "/admin/order", icon: "file-text", title: "Hóa đơn" }
          ]}
        />
        <OrderListContainer></OrderListContainer>
      </>
    );
  }
}

export default OrderListPage;
