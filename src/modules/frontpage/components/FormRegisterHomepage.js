import React, { Component } from "react";
import {
  Form,
  Radio,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Button,
  Select
} from "antd";
import moment from "moment";
import { connect } from "react-redux";
import handlers from "../../seat/handlers";
import handlersFlight from "../../flight/handlers";
import { catchErrorAndNotification } from "../../../common/utils/Notification";

const nowDate = new Date();

class FormRegisterHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 2,
      seatClass: [],
      locationTo: [],
      locationFrom: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.showSeatClass = this.showSeatClass.bind(this);
    this.getLocationTo = this.getLocationTo.bind(this);
    this.handleSearchLocationTo = this.handleSearchLocationTo.bind(this);
    this.timeOutTo = 0;
    this.getLocationFrom = this.getLocationFrom.bind(this);
    this.handleSearchLocationFrom = this.handleSearchLocationFrom.bind(this);
    this.timeOutFrom = 0;
    this.showLocationTo = this.showLocationTo.bind(this);
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
    await this.getLocationTo();
    await this.getLocationFrom();
  }
  async getLocationTo(value) {
    let result = await this.props.getListLocation(1, {
      offset: 100,
      name: value
    });
    if (result && result.success) {
      this.setState({
        locationTo: result.data
      });
    } else catchErrorAndNotification(result.error);
  }
  showLocationTo() {
    return this.state.locationTo.map(location => {
      return <Select.Option value={location.id}>{location.name}</Select.Option>;
    });
  }
  async handleSearchLocationTo(value) {
    if (this.timeOutTo) clearTimeout(this.timeOutTo);
    this.timeOutTo = setTimeout(async () => {
      await this.getLocationTo(value);
    }, 1000);
  }
  async getLocationFrom(value) {
    let result = await this.props.getListLocation(1, {
      offset: 100,
      name: value
    });
    if (result && result.success) {
      this.setState({
        locationFrom: result.data
      });
    } else catchErrorAndNotification(result.error);
  }
  showLocationFrom() {
    return this.state.locationFrom.map(location => {
      return <Select.Option value={location.id}>{location.name}</Select.Option>;
    });
  }
  async handleSearchLocationFrom(value) {
    if (this.timeOutFrom) clearTimeout(this.timeOutFrom);
    this.timeOutFrom = setTimeout(async () => {
      await this.getLocationFrom(value);
    }, 1000);
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
          {getFieldDecorator("start_location", {
            initialValue: paramsRegisterFly
              ? paramsRegisterFly.start_location
              : ""
          })(
            <Select
              showSearch
              style={this.props.style}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={this.handleSearchLocationFrom}
              notFoundContent={null}
            >
              {this.showLocationFrom()}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Điểm đến">
          {getFieldDecorator("end_location", {
            initialValue: paramsRegisterFly
              ? paramsRegisterFly.end_location
              : ""
          })(
            <Select
              showSearch
              style={this.props.style}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={this.handleSearchLocationTo}
              notFoundContent={null}
            >
              {this.showLocationTo()}
            </Select>
          )}
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
                initialValue:
                  paramsRegisterFly && paramsRegisterFly.count
                    ? paramsRegisterFly.count
                    : 1
              })(
                <InputNumber size={"large"} style={{ width: "100%" }} min={1} />
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
    ...handlers(dispatch),
    ...handlersFlight(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: "form-create" })(FormRegisterHomepage));
