import React, { Component } from "react";
import {
  Form,
  Radio,
  Input,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Button,
  Icon,
  Select
} from "antd";
import moment from "moment";
import { connect } from "react-redux";
import handlers from "../../seat/handlers";
import { catchErrorAndNotification } from "../../../common/utils/Notification";

const nowDate = new Date();

class FormRegisterHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      seatClass: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.showSeatClass = this.showSeatClass.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.setParamsRegisterFly(values);
        this.props.history.push("/step-register");
      }
    });
  }
  handleChangeType() {
    this.setState({
      type: this.state.type === 1 ? 2 : 1
    });
  }
  async getSeatClass() {
    let result = await this.props.getListSeatClass();
    if (result && result.success) {
      this.setState({
        seatClass: result.data
      });
    } else catchErrorAndNotification(result.error);
  }
  showSeatClass() {
    return this.state.seatClass.map(seat => {
      return (
        <Select.Option key={seat.id} value={JSON.stringify(seat)}>
          {seat.name}
        </Select.Option>
      );
    });
  }
  async componentDidMount() {
    await this.getSeatClass();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { paramsRegisterFly } = this.props;
    const { type } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("type", {
            initialValue: 2
          })(
            <Radio.Group onChange={this.handleChangeType}>
              <Radio value={1}>Khứ hồi</Radio>
              <Radio value={2}>Một chiều</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="Điểm đi">
          {getFieldDecorator("from", {
            initialValue: paramsRegisterFly ? paramsRegisterFly.from : ""
          })(<Input size={"large"} prefix={<Icon type="environment" />} />)}
        </Form.Item>
        <Form.Item label="Điểm đến">
          {getFieldDecorator("to", {
            initialValue: paramsRegisterFly ? paramsRegisterFly.to : ""
          })(<Input size={"large"} prefix={<Icon type="environment" />} />)}
        </Form.Item>
        <Row gutter={6}>
          <Col lg={type === 1 ? 12 : 24}>
            <Form.Item label="Ngày đi">
              {getFieldDecorator("date_from", {
                initialValue: moment(nowDate)
              })(
                <DatePicker
                  style={{ width: "100%" }}
                  size={"large"}
                ></DatePicker>
              )}
            </Form.Item>
          </Col>
          {type === 1 ? (
            <Col lg={12}>
              <Form.Item label="Ngày về">
                {getFieldDecorator("date_to", {
                  initialValue: moment(nowDate)
                })(
                  <DatePicker
                    style={{ width: "100%" }}
                    size={"large"}
                  ></DatePicker>
                )}
              </Form.Item>
            </Col>
          ) : null}
        </Row>
        <Row gutter={6}>
          <Col lg={12}>
            <Form.Item label="Loại ghế">
              {getFieldDecorator("seatClass", {
                rules: [
                  {
                    required: true,
                    message: "Mời chọn loại ghế"
                  }
                ],
                initialValue: paramsRegisterFly
                  ? paramsRegisterFly.seatClass
                  : ""
              })(<Select size={"large"}>{this.showSeatClass()}</Select>)}
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item label="Số lượng">
              {getFieldDecorator("count", {
                rules: [
                  {
                    required: true,
                    message: "Mời chọn số lượng"
                  }
                ],
                initialValue: paramsRegisterFly ? paramsRegisterFly.count : ""
              })(
                <InputNumber size={"large"} style={{ width: "100%" }} min={0} />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col lg={24}>
            <Form.Item style={{ paddingTop: 48 }}>
              <Button
                className="w-100"
                size="large"
                type="primary"
                htmlType="submit"
              >
                Tìm chuyến bay
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    ...handlers(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: "form-create" })(FormRegisterHomepage));
