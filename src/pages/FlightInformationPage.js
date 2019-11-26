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
import uuid from "uuid";
import moment from "moment";
import FlightInformation from "./FlightInformation";

const flight = {
  id: 1,
  flight_date: "2019-11-12",
  flight_start_time: "15:30",
  flight_time: 3.5,
  start_airport_id: 1,
  end_airport_id: 1,
  start_airport: {
    id: 1,
    name: "Tân Sơn Nhất",
    description: "<p>Tân Sơn Nhất</p>",
    location_id: 1,
    Location: {
      id: 1,
      name: "TP Hồ Chí Minh"
    }
  },
  end_airport: {
    id: 1,
    name: "Tân Sơn Nhất",
    description: "<p>Tân Sơn Nhất</p>",
    location_id: 1,
    Location: {
      id: 1,
      name: "TP Hồ Chí Minh"
    }
  },
  Seats: [
    {
      flight_id: 3,
      seat_class_id: 1,
      quantity: 10,
      remaining_quantity: 10,
      price: 100000,
      SeatClass: {
        id: 1,
        name: "Vé em bé",
        description: null
      }
    },
    {
      flight_id: 3,
      seat_class_id: 2,
      quantity: 20,
      remaining_quantity: 20,
      price: 200000,
      SeatClass: {
        id: 2,
        name: "Vé thượng hạng",
        description: "Vé thượng hạng"
      }
    }
  ],
  Airline: {
    id: 5,
    logo: "uploads/1574128244194_airasia.png",
    name: "Airasia",
    short_name: "airasia",
    contact_info: "0123456789",
    website: "https://www.vietnamairlines.com/vn/vi/home",
    description: "Airasia"
  }
};

export class FlightInformationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seat: [
        {
          id: uuid.v4()
        }
      ],
      seatClass: [],
      airlines: [],
      airports: [],
      flight: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showSeatClass = this.showSeatClass.bind(this);
    this.addSeatClass = this.addSeatClass.bind(this);
    this.getAirline = this.getAirline.bind(this);
    this.handleSearchAirline = this.handleSearchAirline.bind(this);
    this.handleSearchAirport = this.handleSearchAirport.bind(this);
    this.getDataSeatClass = this.getDataSeatClass.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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
  async getAirline(name) {
    let result = await this.props.getListAirline(1, { name: name });
    if (result && result.success) {
      this.setState({
        airlines: result.data
      });
    } else catchErrorAndNotification(result.error);
  }
  showAirPlane() {
    return this.state.airlines.map(airline => {
      return (
        <Select.Option key={airline.id} value={airline.id}>
          {airline.name}
        </Select.Option>
      );
    });
  }
  async handleSearchAirline(value) {
    await this.getAirline(value);
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
                ],
                initialValue: this.state.seat[i].seat_class_id
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
                ],
                initialValue: this.state.seat[i].quantity
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
                ],
                initialValue: this.state.seat[i].price
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
          <Col style={{ paddingTop: 45 }} lg={4}>
            {this.state.seat.length === 1 ? null : (
              <Button
                onClick={() =>
                  this.handleRemove(this.state.seat[i].seat_class_id)
                }
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
      return item.seat_class_id !== id;
    });
    this.setState({
      seat: newArr
    });
  }

  addSeatClass() {
    this.setState({
      seat: [...this.state.seat, { seat_class_id: uuid.v4() }]
    });
  }

  async getDataFlight() {
    // let result = await getFlightById(this.props.match.params.id);
    // if (result && result.success) {
    //   this.setState(
    //     {
    //       flight: result.flight,
    //       seat: result.flight.Seats.length
    //     },
    //     () => {
    //       this.props.form.setFieldsValue({});
    //     }
    //   );
    // }
    let values = {};
    values.airline_id = flight.Airline.id;
    values.end_airport = flight.end_airport.id;
    values.flight_date = moment(flight.flight_date);
    values.start_airport = flight.start_airport.id;
    values.flight_start_time = moment(flight.flight_start_time, "HH:mm:aa");
    values.flight_time = flight.flight_time;
    this.setState({
      seat: flight.Seats
    });

    if (this.props.edit) this.props.form.setFieldsValue(values);
  }

  async componentDidMount() {
    await this.getAirline();
    await this.getAirport();
    await this.getDataSeatClass();
    await this.getDataFlight();
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
  componentWillMount() {
    document.title = "FlyNow | Thông tin Chuyến bay";
  }
  render() {
    const { edit } = this.props;
    const { id } = this.props.match.params;
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
              url: edit ? `/admin/flight/${id}/edit` : `/admin/flight/${id}`,
              icon: "rocket",
              title: !edit
                ? "Thông tin chi tết chuyến bay"
                : "Chỉnh sửa chuyến bay"
            }
          ]}
        ></CustomBreadcrumb>
        <Card
          title={
            <Typography.Title level={4}>
              {edit ? "Chỉnh sửa chuyến bay" : "Thông tin chuyến bay"}
            </Typography.Title>
          }
        >
          {edit ? (
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
                        onSearch={this.handleSearchAirline}
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
                  <Button onClick={() => this.props.history.goBack()}>
                    Hủy
                  </Button>{" "}
                  <Button htmlType="submit" type="primary">
                    Chỉnh sửa
                  </Button>
                </Col>
              </Row>
            </Form>
          ) : (
            <FlightInformation flight={flight}></FlightInformation>
          )}
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
)(Form.create({})(FlightInformationPage));
