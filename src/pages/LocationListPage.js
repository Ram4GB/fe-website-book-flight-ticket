import React, { Component } from "react";
import LocationListContainer from "../modules/flight/containers/LocationListContainer";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";

export class LocationListPage extends Component {
  componentWillMount() {
    document.title = "FlyNow | Quản lí Địa điểm";
  }
  render() {
    return <><CustomBreadcrumb
    items={[
      { url: "/admin/dashboard", icon: "home", title: "Bảng điều khiển" },
      { url: "/admin/location", icon: "environment", title: "Quản lí Địa điểm" }
    ]}
  /><LocationListContainer></LocationListContainer></>;
  }
}

export default LocationListPage;
