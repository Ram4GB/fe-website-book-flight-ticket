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
import { loading } from "../../../common/effects";

const nowDate = new Date();

class FormRegisterHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      seatClass: [],
      locationTo: [],
      locationFrom: [],
      firstItem: {}
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
  handleChangeType(e) {
    console.log(e.target.value);
    this.setState({
      type: e.target.value
    });
  }
  async getSeatClass() {
    let result = await this.props.getListSeatClass();
    if (result && result.success) {
      this.setState({
        seatClass: result.data,
        firstItem: result.data[0]
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
    await loading(async () => {
      await Promise.all([
        this.getSeatClass(),
        this.getLocationTo(),
        this.getLocationFrom()
      ]);
    });
    this.setState(
      {
        type: this.props.paramsRegisterFly.type
      },
      () => {
        console.log("componentDidMount", this.state.type);
      }
    );
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
      return (
        <Select.Option key={location.id} value={location.id}>
          {location.name}
        </Select.Option>
      );
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
      return (
        <Select.Option key={location.id} value={location.id}>
          {location.name}
        </Select.Option>
      );
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
    const { type, firstItem } = this.state;
    console.log(type);
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="text-center">
          {getFieldDecorator("type", {
            initialValue:
              paramsRegisterFly && paramsRegisterFly.type
                ? paramsRegisterFly.type
                : 1
          })(
            <Radio.Group onChange={this.handleChangeType}>
              <Radio value={1}>Một chiều</Radio>
              <Radio value={2}>Khứ hồi</Radio>
            </Radio.Group>
          )}
        </div>
        <Form.Item label="Điểm đi">
          {getFieldDecorator("start_location", {
            rules: [
              {
                required: true,
                message: "Mời chọn điểm đi"
              }
            ],
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
            rules: [
              {
                required: true,
                message: "Mời chọn điểm đến"
              }
            ],
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
          <Col lg={type === 1 ? 24 : 12}>
            <Form.Item label="Ngày đi">
              {getFieldDecorator("flight_date", {
                initialValue:
                  paramsRegisterFly && paramsRegisterFly.flight_date
                    ? moment(paramsRegisterFly.flight_date)
                    : moment(nowDate)
              })(
                <DatePicker
                  style={{ width: "100%" }}
                  size={"large"}
                ></DatePicker>
              )}
            </Form.Item>
          </Col>
          {type === 2 ? (
            <Col lg={12}>
              <Form.Item label="Ngày về">
                {getFieldDecorator("flight_date_return", {
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
                initialValue:
                  paramsRegisterFly && paramsRegisterFly.seatClass
                    ? paramsRegisterFly.seatClass
                    : JSON.stringify(firstItem)
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
        <br />
        <Button block size="large" type="primary" htmlType="submit">
          Tìm chuyến bay
        </Button>
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
