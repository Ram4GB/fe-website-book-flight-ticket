import React, { Component } from "react";
import { Steps, Button, Card, Form, notification } from "antd";
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
  next(flight) {
    const current = this.state.current;
    const { validateFields } = this.props.form;
    switch (current) {
      case 0:
        if (flight) {
          this.props.setParamsRegisterFly({ flight_id: flight.id, flight });
          return this.setState({ current: current + 1 });
        } else
          notification.error({
            message: "Mời bạn chọn chuyến bay"
          });
        break;
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
            flight={paramsRegisterFly.flight}
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
      <Card
        bordered={false}
        className="fix-card-padding-6"
        style={{ margin: 24 }}
      >
        <Steps className="fix-icon" current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          <Card className="card-step">{this.showStepContent(current)}</Card>
        </div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Tiếp theo
            </Button>
          )}
          {current > 0 && current !== steps.length - 1 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Lùi lại
            </Button>
          )}
        </div>
      </Card>
    );
  }
}

export default Form.create({ name: "step-form" })(StepRegisterComponent);
