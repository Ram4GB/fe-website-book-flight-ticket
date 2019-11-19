import React, { Component } from "react";
import point from "../../../common/assets/images/01-point.png";
import { Button } from "antd";
import numeral from "numeral";
import moment from "moment";

export class SearchFlyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  showTotalPrice(count, seats, seatClass) {
    let ticket = seats.filter(item => {
      let id = JSON.parse(seatClass).id;
      if (id === item.seat_class_id) return true;
      else return false;
    })[0];
    if (ticket) return ticket.price * count;
    else return "No API";
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
  handleClickItem(flight) {
    this.props.next(flight);
  }
  render() {
    const { id, flight, paramsRegisterFly } = this.props;
    return flight ? (
      <div className="col-lg-12 pt-3 my-card">
        <div style={{ cursor: "pointer" }} className="card">
          <div
            style={{ color: "#6A6A6A" }}
            className="p-3 align-items-center d-flex flex-md-column flex-sm-column flex-column flex-lg-row"
          >
            <div className="col d-flex flex-md-column flex-sm-column flex-column flex-lg-row">
              <img
                className="image-flight"
                alt="flight"
                style={{ width: 50, height: 50 }}
                src="https://media.gettyimages.com/photos/road-trip-picture-id846454370?s=612x612"
              />
              <span
                className="title"
                style={{ fontWeight: "bold", fontSize: "1.2em" }}
              >
                Vietjet Air
              </span>
            </div>
            <div className="col padding">
              <strong>21:15</strong>
              <p>{flight.start_airport.location}</p>
            </div>
            <div className="col">
              <p>1h</p>
              <img alt="flight" src={point} />
            </div>
            <div className="col">
              <p className="text-center font-weight-bold">22:15</p>
              <p className="text-center">{flight.end_airport.location}</p>
            </div>
            <div className="col">
              <p
                data-toggle="collapse"
                href={`#${id}`}
                style={{ color: "#4469B0" }}
              >
                Xem chi tiết
              </p>
            </div>
            <div className="col">
              <p className="font-weight-bold" style={{ color: "#FFA801" }}>
                {numeral(
                  this.showTotalPrice(
                    paramsRegisterFly.count,
                    flight.seats,
                    paramsRegisterFly.seatClass
                  )
                ).format("0,0")}
                đ
              </p>
            </div>
            <div className="col">
              <Button
                onClick={() => this.handleClickItem(flight)}
                size="large"
                type="primary"
                shape="round"
              >
                CHỌN
              </Button>
            </div>
          </div>
          <div
            className="row border-top"
            style={{ marginRight: 0, marginLeft: 0 }}
          >
            <div id={id} className="col collapse multi-collapse">
              <div className="d-flex p-3 justify-content-center">
                <div className="m-auto d-flex align-items-center justify-content-between">
                  <div>
                    <p className="font-weight-bold">
                      {flight.start_airport.location}
                    </p>
                    <p>
                      21:15, {moment(flight.flight_date).format("DD/MM/YYYY")}
                    </p>
                    <p>{flight.start_airport.name}</p>
                  </div>
                  <div>
                    <img
                      alt="point"
                      style={{ paddingBottom: 10, paddingLeft: 7 }}
                      src={point}
                    />
                  </div>
                  <div>
                    <p className="font-weight-bold">
                      {flight.end_airport.location}
                    </p>
                    <p>21:15, 12/11/2019</p>
                    <p>{flight.end_airport.name}</p>
                  </div>
                </div>
                <div className="border-left p-5">
                  <p>Loại vé:</p>
                  <p>{JSON.parse(paramsRegisterFly.seatClass).name}</p>
                </div>
                <div className="border-left p-5">
                  <p>Số lượng:</p>
                  <p>{paramsRegisterFly.count}</p>
                </div>
                <div className="border-left p-5">
                  <p>Giá vé:</p>
                  <p>
                    {numeral(
                      this.showPrice(
                        paramsRegisterFly.count,
                        flight.seats,
                        paramsRegisterFly.seatClass
                      )
                    ).format("0,0")}
                    đ
                  </p>
                </div>
                <div className="border-left p-5">
                  <p className="font-weight-bold">Tổng cộng</p>
                  <p>
                    {numeral(
                      this.showTotalPrice(
                        paramsRegisterFly.count,
                        flight.seats,
                        paramsRegisterFly.seatClass
                      )
                    ).format("0,0")}
                    đ
                  </p>
                </div>
              </div>
              <div>
                <p className="font-weight-bold text-right">
                  Số tiền bạn phải trả:{" "}
                  <span
                    className="font-weight-bold"
                    style={{ color: "#FFA801" }}
                  >
                    {numeral(
                      this.showTotalPrice(
                        paramsRegisterFly.count,
                        flight.seats,
                        paramsRegisterFly.seatClass
                      )
                    ).format("0,0")}
                    đ
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default SearchFlyItem;
