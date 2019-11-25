import React, { Component } from "react";
import { Card, Form, Input, Icon, Col, Row, Tag, Button, Alert } from "antd";
import point1 from "../../../common/assets/images/01-point.png";
import point2 from "../../../common/assets/images/02-point.png";
import numeral from "numeral";
import { withRouter } from "react-router";
import moment from "moment";

class InformationCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayPrice: []
    };
  }
  showSumTotalPrice(arrayPrice) {
    return arrayPrice.reduce((a, b) => a + b);
  }
  showTotalPrice(count, seats, seatClass) {
    let ticket = seats.filter(item => {
      let id = JSON.parse(seatClass).id;
      if (id === item.seat_class_id) return true;
      else return false;
    })[0];
    if (ticket) {
      this.state.arrayPrice.push(ticket.price * count);
      return ticket.price * count;
    } else return "No API";
  }
  showPrice(count, seats, seatClass) {
    let ticket = seats.filter(item => {
      let id = JSON.parse(seatClass).id;
      if (id === item.seat_class_id) return true;
      else return false;
    })[0];
    if (ticket) return ticket.price;
    else return "No API";
  }
  showCustomer(count) {
    const { paramsRegisterFly } = this.props;
    const { getFieldDecorator } = this.props.form;
    let arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(
        <Row key={i} gutter={6}>
          <Col lg={12}>
            <Form.Item
              key={i}
              className="text-left"
              label={<strong>Họ và tên hành khách {i + 1}</strong>}
            >
              {getFieldDecorator(`passengers[${i}].name`, {
                initialValue:
                  paramsRegisterFly &&
                  paramsRegisterFly.passengers &&
                  paramsRegisterFly.passengers[i]
                    ? paramsRegisterFly.passengers[i].name
                    : "",
                rules: [
                  {
                    required: true,
                    message: "Mời bạn điền tên"
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="user" />}
                  style={{ width: "100%" }}
                  placeholder="Họ và tên khách hàng"
                ></Input>
              )}
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item
              key={i}
              className="text-left"
              label={<strong>CMND hành khách {i + 1}</strong>}
            >
              {getFieldDecorator(`passengers[${i}].identifier`, {
                initialValue:
                  paramsRegisterFly &&
                  paramsRegisterFly.passengers &&
                  paramsRegisterFly.passengers[i]
                    ? paramsRegisterFly.passengers[i].identifier
                    : "",
                rules: [
                  {
                    required: true,
                    message: "Mời bạn điền CMND"
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="code" />}
                  style={{ width: "100%" }}
                  placeholder="CMND"
                ></Input>
              )}
            </Form.Item>
          </Col>
        </Row>
      );
    }
    return arr;
  }
  combineDateAndTime(date, time) {
    return moment(date + " " + time);
  }
  render() {
    const { paramsRegisterFly, user, flight, flight_return } = this.props;
    const { arrayPrice } = this.state;
    const customer = user && user.Customer ? user.Customer : null;
    const { getFieldDecorator } = this.props.form;
    const { count } = this.props.paramsRegisterFly;
    const start_location = JSON.parse(paramsRegisterFly.start_location);
    const end_location = JSON.parse(paramsRegisterFly.end_location);
    const { type } = paramsRegisterFly;
    console.log(flight_return);
    return (
      <Card>
        <h5 className="font-weight-bold">
          Tìm chuyến bay {type === 2 ? "khứ hồi " : ""} {start_location.name} -{" "}
          {end_location.name}
        </h5>
        <div className="row">
          <div className="col-lg-12 card-step-1">
            <div
              style={{
                marginBottom: 10
              }}
              className="card border border-primary p-3"
            >
              <div className="flex-direction-column row align-items-center d-flex flex-lg-row flex-md-column flex-sm-column">
                <div
                  className="flex-direction-column col d-flex"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <p className="font-weight-bold">
                      {flight.start_airport.location}
                    </p>
                    <Tag>
                      {moment(flight.flight_start_time, "HH:mm:ss").format(
                        "HH:mm"
                      )}
                      , {moment(flight.flight_date).format("DD/MM/YYYY")}
                    </Tag>
                    <p className="strong">{flight.start_airport.name}</p>
                  </div>
                  <div>
                    <p>{flight.flight_time}h</p>
                    <img alt="" src={point1} />
                  </div>
                  <div>
                    <p className="font-weight-bold">
                      {flight.end_airport.location}
                    </p>
                    <Tag>
                      {this.combineDateAndTime(
                        flight.flight_date,
                        flight.flight_start_time
                      )
                        .add(flight.flight_time, "hours")
                        .format("HH:ss")}
                      ,{" "}
                      {this.combineDateAndTime(
                        flight.flight_date,
                        flight.flight_start_time
                      )
                        .add(flight.flight_time, "hours")
                        .format("DD/MM/YYYY")}
                    </Tag>
                    <p className="strong">{flight.end_airport.name}</p>
                  </div>
                </div>
                <div className="col">
                  <p className="strong">Loại vé:</p>
                  <p>{JSON.parse(paramsRegisterFly.seatClass).name}</p>
                </div>
                <div className="col">
                  <p className="strong">Số lượng:</p>
                  <p>
                    {paramsRegisterFly && paramsRegisterFly.count
                      ? paramsRegisterFly.count
                      : 0}
                  </p>
                </div>
                <div className="col">
                  <p className="strong">Giá vé:</p>
                  <p>
                    {numeral(
                      this.showPrice(
                        paramsRegisterFly.count,
                        flight.Seats,
                        paramsRegisterFly.seatClass
                      )
                    ).format("0,0")}
                    đ
                  </p>
                </div>
                <div className="col">
                  <p className="font-weight-bold strong">Tổng cộng</p>
                  <p>
                    {numeral(
                      this.showTotalPrice(
                        paramsRegisterFly.count,
                        flight.Seats,
                        paramsRegisterFly.seatClass
                      )
                    ).format("0,0")}
                    đ
                  </p>
                </div>
              </div>
              {type === 2 ? (
                <>
                  <hr></hr>
                  <div className="flex-direction-column row align-items-center d-flex flex-lg-row flex-md-column flex-sm-column">
                    <div
                      className="flex-direction-column col d-flex"
                      style={{
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <div>
                        <p className="font-weight-bold">
                          {flight_return.end_airport.location}
                        </p>
                        <Tag>
                          {this.combineDateAndTime(
                            flight_return.flight_date,
                            flight_return.flight_start_time
                          )
                            .add(flight_return.flight_time, "hours")
                            .format("HH:ss")}
                          ,{" "}
                          {this.combineDateAndTime(
                            flight_return.flight_date,
                            flight_return.flight_start_time
                          )
                            .add(flight_return.flight_time, "hours")
                            .format("DD/MM/YYYY")}
                        </Tag>
                        <p className="strong">
                          {flight_return.end_airport.name}
                        </p>
                      </div>

                      <div>
                        <p>{flight_return.flight_time}h</p>
                        <img alt="" src={point2} />
                      </div>
                      <div>
                        <p className="font-weight-bold">
                          {flight_return.start_airport.location}
                        </p>
                        <Tag>
                          {moment(
                            flight_return.flight_start_time,
                            "HH:mm:ss"
                          ).format("HH:mm")}
                          ,{" "}
                          {moment(flight_return.flight_date).format(
                            "DD/MM/YYYY"
                          )}
                        </Tag>
                        <p className="strong">
                          {flight_return.start_airport.name}
                        </p>
                      </div>
                    </div>
                    <div className="col">
                      <p className="strong">Loại vé:</p>
                      <p>{JSON.parse(paramsRegisterFly.seatClass).name}</p>
                    </div>
                    <div className="col">
                      <p className="strong">Số lượng:</p>
                      <p>
                        {paramsRegisterFly && paramsRegisterFly.count
                          ? paramsRegisterFly.count
                          : 0}
                      </p>
                    </div>
                    <div className="col">
                      <p className="strong">Giá vé:</p>
                      <p>
                        {numeral(
                          this.showPrice(
                            paramsRegisterFly.count,
                            flight_return.Seats,
                            paramsRegisterFly.seatClass
                          )
                        ).format("0,0")}
                        đ
                      </p>
                    </div>
                    <div className="col">
                      <p className="font-weight-bold strong">Tổng cộng</p>
                      <p>
                        {numeral(
                          this.showTotalPrice(
                            paramsRegisterFly.count,
                            flight_return.Seats,
                            paramsRegisterFly.seatClass
                          )
                        ).format("0,0")}
                        đ
                      </p>
                    </div>
                  </div>
                </>
              ) : null}
              <div className="row">
                <div className="strong col-lg-12 text-right">
                  Số tiền bạn phải trả:{" "}
                  <span
                    className="font-weight-bold"
                    style={{ color: "#FFA801" }}
                  >
                    {numeral(this.showSumTotalPrice(arrayPrice)).format("0,0")}đ
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row d-flex" style={{ justifyContent: "center" }}>
              <div className="col-lg-6">
                <Card title={<strong>THÔNG TIN KHÁCH HÀNG</strong>}>
                  <Form style={{ margin: 20 }}>{this.showCustomer(count)}</Form>
                </Card>
              </div>
              <div className="col-lg-6">
                <Card title={<strong>THÔNG TIN NGƯỜI ĐẶT</strong>}>
                  <p className="text-left font-weight-bold">
                    Fly now liên hệ vé theo thông tin người đặt
                  </p>
                  <Form>
                    {customer ? (
                      <>
                        <Form.Item
                          className="text-left"
                          label={<strong>Họ và tên</strong>}
                        >
                          {getFieldDecorator("fullname_customer_book", {
                            initialValue: customer ? customer.name : ""
                          })(
                            <Input
                              disabled
                              prefix={<Icon type="user" />}
                              style={{ width: "100%" }}
                            ></Input>
                          )}
                        </Form.Item>
                        <Form.Item
                          className="text-left"
                          label={<strong>Email</strong>}
                        >
                          {getFieldDecorator("email_customer_book", {
                            initialValue: customer ? customer.email : ""
                          })(
                            <Input
                              disabled
                              prefix={<Icon type="mail" />}
                              style={{ width: "100%" }}
                            ></Input>
                          )}
                        </Form.Item>
                        <Form.Item
                          className="text-left"
                          label={<strong>Số điện thoại</strong>}
                        >
                          {getFieldDecorator("phonenumber_customer_book", {
                            initialValue: customer ? customer.phone : ""
                          })(
                            <Input
                              disabled
                              prefix={<Icon type="phone" />}
                              style={{ width: "100%" }}
                            ></Input>
                          )}
                        </Form.Item>
                      </>
                    ) : (
                      <Alert
                        style={{ margin: "20px 0px" }}
                        message={<strong>Cảnh bảo</strong>}
                        description={
                          <>
                            <p>Bạn chưa đăng nhập vào hệ thống</p>
                            <Button
                              type="ghost"
                              onClick={() => this.props.history.push(`/login`)}
                            >
                              Đăng nhập
                            </Button>
                          </>
                        }
                        type="warning"
                        showIcon
                      />
                    )}
                    {/* <Row>
                      <Button
                        style={{ width: "80%" }}
                        type="primary"
                        onClick={() => this.props.next()}
                        size="large"
                      >
                        BƯỚC TIẾP THEO
                      </Button>
                    </Row> */}
                  </Form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(InformationCustomer);
