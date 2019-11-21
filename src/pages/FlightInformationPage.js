import React, { Component } from "react";
import { Card } from "antd";

export class FlightInformationPage extends Component {
  componentWillMount() {
    document.title = "FlyNow | Thông tin Chuyến bay";
  }
  render() {
    return <Card>FlightInformationPage</Card>;
  }
}

export default FlightInformationPage;
