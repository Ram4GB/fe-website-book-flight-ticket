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
      current: 2
    };
  }
  next() {
    const current = this.state.current;
    const { validateFields } = this.props.form;
    switch (current) {
      case 0:
        return this.setState({ current: current + 1 });
      case 1:
        validateFields((errors, values) => {
          if (!errors) {
            console.log(values);
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
    switch (current) {
      case 0:
        return <FindFly paramsRegisterFly={paramsRegisterFly}></FindFly>;
      case 1:
        return (
          <InformationCustomer
            paramsRegisterFly={paramsRegisterFly}
            form={this.props.form}
          ></InformationCustomer>
        );
      case 2:
        return <Payment></Payment>;
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
      <Card style={{ margin: 24 }}>
        <Steps className="fix-icon" current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          <Card>{this.showStepContent(current)}</Card>
        </div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </Card>
    );
  }
}

export default Form.create({ name: "step-form" })(StepRegisterComponent);
