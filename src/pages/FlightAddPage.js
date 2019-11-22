import React, { Component } from "react";
import {
  Card,
  Typography,
  Form,
  Row,
  Col,
  Button,
  InputNumber,
  DatePicker,
  notification,
  Select,
  TimePicker
} from "antd";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";
import { catchErrorAndNotification } from "../common/utils/Notification";
import handlers from "../modules/flight/handlers";
import handlersSeat from "../modules/seat/handlers";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import uuid from "uuid";

export class FlightAddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seat: [
        {
          id: uuid.v4()
        }
      ],
      seatClass: [],
      airplanes: [],
      airports: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showSeatClass = this.showSeatClass.bind(this);
    this.addSeatClass = this.addSeatClass.bind(this);
    this.getAirplane = this.getAirplane.bind(this);
    this.handleSearchAirplane = this.handleSearchAirplane.bind(this);
    this.handleSearchAirport = this.handleSearchAirport.bind(this);
    this.getDataSeatClass = this.getDataSeatClass.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  componentWillMount() {
    document.title = "FlyNow | Thêm chuyến bay";
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        let result = await this.props.addFlight(values);
        if (result && result.success === true) {
          notification.success({
            message: "Thêm chuyến bay thành công"
          });
          this.props.history.push(`/admin/flight`);
        } else catchErrorAndNotification(result.error);
      }
    });
  }
  async getAirplane(name) {
    let result = await this.props.getListAirPlane(1, { name: name });
    if (result && result.success) {
      this.setState({
        airplanes: result.data
      });
    } else catchErrorAndNotification(result.error);
  }
  showAirPlane() {
    return this.state.airplanes.map(airplane => {
      return (
        <Select.Option key={airplane.id} value={airplane.id}>
          {airplane.name}
        </Select.Option>
      );
    });
  }
  async handleSearchAirplane(value) {
    await this.getAirplane(value);
  }

  async getAirport(name) {
    let result = await this.props.getListAirport(1, { name: name });
    if (result && result.success) {
      this.setState({
        airports: result.data
      });
    } else catchErrorAndNotification(result.error);
  }
  async handleSearchAirport(value) {
    await this.getAirport(value);
  }
  showAirport() {
    return this.state.airports.map(airport => {
      return (
        <Select.Option key={airport.id} value={airport.id}>
          {airport.name}
        </Select.Option>
      );
    });
  }

  showSeatClass() {
    let arr = [];
    const { getFieldDecorator } = this.props.form;
    for (let i = 0; i < this.state.seat.length; i++) {
      arr.push(
        <Row key={`seat-${i}`} gutter={8}>
          <Col lg={8}>
            <Form.Item label="Hạng ghế">
              {getFieldDecorator(`seat[${i}].seat_class_id`, {
                rules: [
                  {
                    required: true
                  }
                ]
              })(<Select>{this.showOption()}</Select>)}
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item label="Số lượng">
              {getFieldDecorator(`seat[${i}].quantity`, {
                rules: [
                  {
                    required: true
                  }
                ]
              })(<InputNumber style={{ width: "100%" }} min={0} />)}
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item label="Giá">
              {getFieldDecorator(`seat[${i}].price`, {
                rules: [
                  {
                    required: true
                  }
                ]
              })(
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                  min={0}
                />
              )}
            </Form.Item>
          </Col>
          <Col style={{ paddingTop: 50 }} lg={4}>
            {this.state.seat.length === 1 ? null : (
              <Button
                onClick={() => this.handleRemove(this.state.seat[i].id)}
                icon="minus"
              ></Button>
            )}
            {i === this.state.seat.length - 1 ? (
              <Button
                style={{ marginLeft: 5 }}
                type="primary"
                onClick={this.addSeatClass}
                icon="plus"
              ></Button>
            ) : null}
          </Col>
        </Row>
      );
    }
    return arr;
  }

  handleRemove(id) {
    let newArr = this.state.seat.filter(item => {
      return item.id !== id;
    });
    this.setState({
      seat: newArr
    });
  }

  addSeatClass() {
    this.setState({
      seat: [...this.state.seat, { id: uuid.v4() }]
    });
  }

  async componentDidMount() {
    await this.getAirplane();
    await this.getAirport();
    await this.getDataSeatClass();
  }
  async getDataSeatClass() {
    let result = await this.props.getListSeatClass(1);
    if (result && result.success) {
      this.setState({
        seatClass: result.data
      });
    } else catchErrorAndNotification(result.error);
  }
  showOption() {
    if (this.state.seatClass)
      return this.state.seatClass.map(seat => {
        return (
          <Select.Option key={seat.id} value={seat.id}>
            {seat.name}
          </Select.Option>
        );
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <CustomBreadcrumb
          items={[
            { url: "/admin/dashboard", icon: "home", title: "Bảng điều khiển" },
            {
              url: "/admin/flight",
              icon: "rocket",
              title: "Chuyến bay"
            },
            {
              url: "/admin/flight/create",
              icon: "rocket",
              title: "Tạo chuyến bay"
            }
          ]}
        ></CustomBreadcrumb>
        <Card
          title={<Typography.Title level={4}>Thêm chuyến bay</Typography.Title>}
        >
          <Form onSubmit={this.handleSubmit}>
            <Typography.Title level={4}>Nhập thông tin</Typography.Title>
            <Row gutter={15}>
              <Col lg={8}>
                <Form.Item label="Chọn hãng hàng không">
                  {getFieldDecorator("airline_id", {
                    rules: [
                      { message: "Mời chọn hãng hàng không", required: true }
                    ]
                  })(
                    <Select
                      showSearch
                      style={this.props.style}
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      filterOption={false}
                      onSearch={this.handleSearchAirport}
                      notFoundContent={null}
                    >
                      {this.showAirPlane()}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item label="Chọn điểm đi">
                  {getFieldDecorator("start_airport", {
                    rules: [{ message: "Mời chọn điểm đi", required: true }]
                  })(
                    <Select
                      showSearch
                      style={this.props.style}
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      filterOption={false}
                      onSearch={this.handleSearchAirport}
                      notFoundContent={null}
                    >
                      {this.showAirport()}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item label="Chọn điểm đến">
                  {getFieldDecorator("end_airport", {
                    rules: [{ message: "Mời chọn điểm đến", required: true }]
                  })(
                    <Select
                      showSearch
                      style={this.props.style}
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      filterOption={false}
                      onSearch={this.handleSearchAirplane}
                      notFoundContent={null}
                    >
                      {this.showAirport()}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={15}>
              <Col lg={8}>
                <Form.Item label="Chọn thời gian bay">
                  {getFieldDecorator("flight_time", {
                    rules: [
                      { message: "Mời chọn thời gian bay", required: true }
                    ]
                  })(<InputNumber />)}
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item label="Chọn ngày bay">
                  {getFieldDecorator("flight_date", {
                    rules: [{ message: "Mời chọn ngày bay", required: true }]
                  })(<DatePicker />)}
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item label="Chọn thời gian bắt đầu bay">
                  {getFieldDecorator("flight_start_time", {
                    rules: [
                      {
                        message: "Mời chọn thời gian bắt đầu bay",
                        required: true
                      }
                    ]
                  })(<TimePicker format={"HH:mm"} />)}
                </Form.Item>
              </Col>
            </Row>
            <Typography.Title level={4}>Nhập số lượng ghế</Typography.Title>
            <Row gutter={15}>
              <Col style={{ marginTop: 5 }} lg={24}>
                {this.showSeatClass()}
              </Col>
            </Row>
            <Row>
              <Col lg={24} style={{ textAlign: "right" }}>
                <Button>HỦY</Button>{" "}
                <Button htmlType="submit" type="primary">
                  TẠO MỚI
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    ...handlers(dispatch),
    ...handlersSeat(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Form.create({ name: "form-add-flight" })(FlightAddPage)));
