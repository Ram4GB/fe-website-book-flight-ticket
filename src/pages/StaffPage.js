import React, { Component } from "react";
import StaffListContainer from "../modules/user/containers/StaffListContainer";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";

export class CashierPage extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <CustomBreadcrumb
          items={[
            { url: "/admin/dashboard", icon: "home", title: "Bảng điều khiển" },
            { url: "/admin/staff", icon: "user", title: "Nhân viên" }
          ]}
        />
        <StaffListContainer history={history} />
      </>
    );
  }
}

export default CashierPage;
