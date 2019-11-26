import React, { Component } from "react";
import { Card, Col, Row, Typography, Tag } from "antd";
import { getFlightById } from "../modules/flight/handlers";
import { catchErrorAndNotification } from "../common/utils/Notification";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";
import numeral from "numeral";
import moment from "moment";

class FlightInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: null
    };
    this.getFlight = this.getFlight.bind(this);
    this.showSeatClass = this.showSeatClass.bind(this);
  }
  async getFlight() {
    if (this.props.match.params.id) {
      let result = await getFlightById(this.props.match.params.id);
      if (result && result.success === true) {
        this.setState({
          flight: result.flight
        });
      } else catchErrorAndNotification(result.error);
    }
  }
  componentDidMount() {
    this.getFlight();
  }
  showSeatClass(seats) {
    return seats.map(seat => {
      return (
        <Row key={seat.seat_class_id}>
          <Col lg={8}>
            <p>{seat.SeatClass.name}</p>
          </Col>
          <Col lg={8}>
            <p>{seat.quantity}</p>
          </Col>
          <Col lg={8}>
            <p>
              <Tag color="green">{numeral(seat.price).format("0,0")} đ</Tag>
            </p>
          </Col>
        </Row>
      );
    });
  }
  render() {
    const { flight } = this.state;
    const id = flight ? flight.id : "";
    return (
      <>
        <CustomBreadcrumb
          items={[
            { url: "/admin/dashboard", icon: "home", title: "Bảng điều khiển" },
            { url: "/admin/flight", icon: "rocket", title: "Chuyến bay" },
            {
              url: `/admin/flight/${id}`,
              icon: "rocket",
              title: "Thông tin chuyến bay"
            }
          ]}
        />
        <Card>
          <Row>
            <Col lg={8}>
              <Typography.Title level={4}>Hãng hàng không</Typography.Title>
              <p>
                <Tag color="#1890ff">{flight ? flight.Airline.name : null}</Tag>
              </p>
            </Col>
            <Col lg={8}>
              <Typography.Title level={4}>Điểm đi</Typography.Title>
              <p>
                <Tag color="geekblue">
                  {flight ? flight.start_airport.name : null}
                </Tag>
              </p>
            </Col>
            <Col lg={8}>
              <Typography.Title level={4}>Điểm đến</Typography.Title>
              <p>
                <Tag color="geekblue">
                  {flight ? flight.end_airport.name : null}
                </Tag>
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <Typography.Title level={4}>Thời gian bay</Typography.Title>
              <p>{flight ? flight.flight_time : null}</p>
            </Col>
            <Col lg={8}>
              <Typography.Title level={4}>Ngày bay</Typography.Title>
              <p>
                <Tag color="purple">
                  {flight
                    ? moment(flight.flight_date).format("DD/MM/YYYY")
                    : null}
                </Tag>
              </p>
            </Col>
            <Col lg={8}>
              <Typography.Title level={4}>Giờ bắt đầu bay</Typography.Title>
              <p>
                <Tag color="purple">
                  {flight ? flight.flight_start_time : null}
                </Tag>
              </p>
            </Col>
          </Row>
        </Card>
        <Card
          style={{ marginTop: 20 }}
          title={<strong>Thông tin chi tiết từng hạng ghế</strong>}
        >
          <Row>
            <Col lg={8}>
              <Typography.Title level={4}>Tên hạng ghế</Typography.Title>
            </Col>
            <Col lg={8}>
              <Typography.Title level={4}>Số lượng</Typography.Title>
            </Col>
            <Col lg={8}>
              <Typography.Title level={4}>Giá</Typography.Title>
            </Col>
          </Row>
          {flight ? this.showSeatClass(flight.Seats) : null}
        </Card>
      </>
    );
  }
}

export default FlightInformation;
