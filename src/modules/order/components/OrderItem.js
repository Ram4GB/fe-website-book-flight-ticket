import React, { Component } from "react";
import { Avatar, Tag } from "antd";
import point from "../../../common/assets/images/01-point.png";
import moment from "moment";
import numeral from "numeral";

export class OrderItem extends Component {
  render() {
    const { ticket } = this.props;
    let outbound_flight = {};
    if (ticket) {
      outbound_flight = ticket.outbound_flight;
    }
    return this.props.ticket ? (
      <>
        <div className="border p-3 rounded">
          <p>
            <span className="strong">Hành khách: </span>
            {ticket.passenger_name}{" "}
          </p>
          <div className="d-flex justify-content-between align-items-center flex-wrap flex-lg-row flex-column pb-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <Avatar src="https://cdn3.iconfinder.com/data/icons/hotel-and-restaurant-volume-3-2/48/123-512.png" />
              <div className="pl-2">
                <p className="strong">Mã vé:</p>
                <Tag color="blue">{ticket.id}</Tag>
              </div>
            </div>
            <div className="text-center">
              <p className="strong">Mã chuyến bay</p>
              <Tag color="blue">{ticket.flight_id}</Tag>
            </div>
            <div className="text-center">
              <p className="strong">
                {moment(outbound_flight.flight_start_time, "HH:mm").format(
                  "HH:mm a"
                )}
              </p>
              <p>Quảng Ninh</p>
            </div>
            <div className="text-center pb-0 strong">
              <p style={{ margin: 0, padding: 0 }}>
                {outbound_flight.flight_time} giờ
              </p>
              <img alt="" src={point} />
            </div>
            <div className="text-center">
              <p className="strong">
                {moment(outbound_flight.flight_start_time, "HH:mm")
                  .add(outbound_flight.flight_time, "hours")
                  .format("HH:mm a")}
              </p>
              <p>Quảng Ninh</p>
            </div>
            <div>
              <a
                data-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Xem chi tiết
              </a>
            </div>
            <div className="strong" style={{ color: "rgb(255, 168, 1)" }}>
              {numeral(ticket.flight_price).format("0,0")}đ
            </div>
          </div>
          <div className="collapse" id="collapseExample">
            <div className="border-top pt-3 d-flex justify-content-center justify-content-lg-between flex-column flex-lg-row flex-wrap">
              <div className="d-flex flex-wrap justify-content-center justify-content-lg-between">
                <div className="text-center">
                  <p className="strong">07:55, 28/11/2019</p>
                  <p>Cảng Quốc Tế Cát Bi</p>
                </div>
                <div className="text-center mx-5">
                  <p style={{ margin: 0, padding: 0 }}>
                    {outbound_flight.flight_time} giờ
                  </p>
                  <img alt="" src={point} />
                </div>
                <div className="text-center">
                  <p className="strong">07:55, 28/11/2019</p>
                  <p>Cảng Quốc Tế Cát Bi</p>
                </div>
              </div>
              <div className="text-center">
                <p className="strong">Loại vé</p>
                <Tag color="blue">Phổ thông</Tag>
              </div>
              <div className="text-center">
                <p className="strong">Số lượng</p>
                <p>1</p>
              </div>
              <div className="text-center">
                <p className="strong">Giá vé</p>
                {numeral(ticket.flight_price).format("0,0")}đ
              </div>
              <div className="text-center">
                <p className="strong">Tổng cộng</p>
                <p style={{ color: "rgb(255, 168, 1)" }} className="strong">
                  {numeral(ticket.flight_price).format("0,0")}đ
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : null;
  }
}

export default OrderItem;
