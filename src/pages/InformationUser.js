import React, { Component } from "react";
import InformationUserContainer from "../modules/user/containers/InformationUserContainer";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";

export class InformationUser extends Component {
  render() {
    return (
      <>
        <CustomBreadcrumb
          items={[
            { url: "/admin/dashboard", icon: "home", title: "Bảng điều khiển" },
            { url: "/admin/profile", icon: "user", title: "Thông tin cá nhân" }
          ]}
        />
        <InformationUserContainer></InformationUserContainer>
      </>
    );
  }
}

export default InformationUser;
