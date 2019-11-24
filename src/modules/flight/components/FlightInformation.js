import React, { Component } from "react";
import { Card, Col, Row, Typography } from "antd";

class FlightInformation extends Component {
  showSeatClass(seats) {
    return seats.map(seat => {
      return (
        <>
          <Col lg={8}>
            <Typography.Title level={4}>Tên hạng ghế</Typography.Title>
            <p>{seat.SeatClass.name}</p>
          </Col>
          <Col lg={8}>
            <Typography.Title level={4}>Số lượng</Typography.Title>
            <p>{seat.quantity}</p>
          </Col>
          <Col lg={8}>
            <Typography.Title level={4}>Giá</Typography.Title>
            <p>{seat.price}</p>
          </Col>
        </>
      );
    });
  }
  render() {
    const { flight } = this.props;
    console.log(flight);
    return (
      <>
        <Card>
          <Row>
            <Col lg={8}>
              <Typography.Title level={4}>Hãng hàng không</Typography.Title>
              <p>{flight.Airline.name}</p>
            </Col>
            <Col lg={8}>
              <Typography.Title level={4}>Điểm đi</Typography.Title>
              <p>{flight.start_airport.name}</p>
            </Col>
            <Col lg={8}>
              <Typography.Title level={4}>Điểm đến</Typography.Title>
              <p>{flight.end_airport.name}</p>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <Typography.Title level={4}>Thời gian bay</Typography.Title>
              <p>{flight.flight_time}</p>
            </Col>
            <Col lg={8}>
              <Typography.Title level={4}>Ngày bay</Typography.Title>
              <p>{flight.flight_date}</p>
            </Col>
            <Col lg={8}>
              <Typography.Title level={4}>Giờ bắt đầu bay</Typography.Title>
              <p>{flight.flight_start_time}</p>
            </Col>
          </Row>
        </Card>
        <Card
          style={{ marginTop: 20 }}
          title={<strong>Thông tin chi tiết từng hạng ghế</strong>}
        >
          <Row>{this.showSeatClass(flight.Seats)}</Row>
        </Card>
      </>
    );
  }
}

export default FlightInformation;
