import React, { Component } from "react";
import StaffListContainer from "../modules/user/containers/StaffListContainer";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";

export class CashierPage extends Component {
  render() {
    return (
      <>
        <CustomBreadcrumb
          items={[
            { url: "/admin/dashboard", icon: "home", title: "Dashboard" },
            { url: "/admin/staff", icon: "user", title: "Staff" }
          ]}
        />
        <StaffListContainer />
      </>
    );
  }
}

export default CashierPage;
