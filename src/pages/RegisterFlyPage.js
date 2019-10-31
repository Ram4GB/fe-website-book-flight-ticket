import React, { Component } from "react";
import RegiterFlyContainer from "../modules/frontpage/containers/RegisterFlyContainer";

class RegisterFlyPage extends Component {
  render() {
    const { history } = this.props;
    return <RegiterFlyContainer history={history}></RegiterFlyContainer>;
  }
}

export default RegisterFlyPage;
