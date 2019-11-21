import React, { Component } from "react";
import LocationListContainer from "../modules/flight/containers/LocationListContainer";

export class LocationListPage extends Component {
  componentWillMount() {
    document.title = "FlyNow | Quản lí Địa điểm";
  }
  render() {
    return <LocationListContainer></LocationListContainer>;
  }
}

export default LocationListPage;
