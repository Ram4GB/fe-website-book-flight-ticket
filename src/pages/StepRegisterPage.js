import React, { Component } from "react";
import StepRegisterContainer from "../modules/frontpage/containers/StepRegisterContainer";

class StepRegisterPage extends Component {
  render() {
    const { history } = this.props;
    return <StepRegisterContainer history={history}></StepRegisterContainer>;
  }
}

export default StepRegisterPage;
