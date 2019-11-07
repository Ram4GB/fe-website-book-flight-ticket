import React, { Component } from "react";
import LocationListContainer from "../modules/flight/containers/LocationListContainer";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";

export class LocationListPage extends Component {
  render() {
    return (
      <>
        <CustomBreadcrumb
          items={[
            { url: "/admin/dashboard", icon: "home", title: "Bảng điểu khiển" },
            { url: "/admin/location", icon: "bank", title: "Địa điểm" }
          ]}
        ></CustomBreadcrumb>
        <LocationListContainer></LocationListContainer>
      </>
    );
  }
}

export default LocationListPage;
