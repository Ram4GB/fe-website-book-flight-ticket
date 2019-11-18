import React, { Component } from "react";
import { Steps, Button, message, Card, Form } from "antd";
import FindFly from "./FindFly";
import InformationCustomer from "./InformationCustomer";
import FinishStepRegister from "./FinishStepRegister";
import Payment from "./Payment";

const { Step } = Steps;
const steps = [
  {
    title: "Tìm Chuyến bay"
  },
  {
    title: "Thông tin khách hàng"
  },
  {
    title: "Thanh toán"
  },
  {
    title: "Hoàn thành"
  }
];

export class StepRegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
    this.next = this.next.bind(this);
  }
  next(id) {
    const current = this.state.current;
    const { validateFields } = this.props.form;
    switch (current) {
      case 0:
        this.props.setParamsRegisterFly({ flight_id: id });
        return this.setState({ current: current + 1 });
      case 1:
        validateFields((errors, values) => {
          if (!errors) {
            this.props.setParamsRegisterFly(values);
            return this.setState({ current: current + 1 });
          }
        });
        break;
      default:
        return this.setState({ current: current + 1 });
    }
  }

  prev() {
    this.setState({
      current: this.state.current - 1
    });
    setTimeout(() => {
      this.props.form.setFieldsValue(this.props.paramsRegisterFly);
    }, 100);
  }
  showStepContent(current) {
    const { paramsRegisterFly } = this.props;
    console.log(this.props.paramsRegisterFly);
    switch (current) {
      case 0:
        return (
          <FindFly
            next={this.next}
            paramsRegisterFly={paramsRegisterFly}
          ></FindFly>
        );
      case 1:
        return (
          <InformationCustomer
            user={this.props.user}
            history={this.props.history}
            next={this.next}
            paramsRegisterFly={paramsRegisterFly}
            form={this.props.form}
          ></InformationCustomer>
        );
      case 2:
        return <Payment next={this.next}></Payment>;
      case 3:
        return (
          <FinishStepRegister
            paramsRegisterFly={paramsRegisterFly}
          ></FinishStepRegister>
        );
      default:
        return null;
    }
  }
  render() {
    const { current } = this.state;
    return (
      <Card className="fix-card-padding-6" style={{ margin: 24 }}>
        <Steps className="fix-icon" current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          <Card className="card-step">{this.showStepContent(current)}</Card>
        </div>
      </Card>
    );
  }
}

export default Form.create({ name: "step-form" })(StepRegisterComponent);
