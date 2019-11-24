import React, { Component } from "react";
import { Card, Icon, Table } from "antd";
import { Chart, Geom, Axis, Tooltip, Label } from "bizcharts";
import Column from "antd/lib/table/Column";

import { connect } from "react-redux";
import handlers from "../modules/user/handlers";
import numeral from "numeral";

const cols2 = {
  revenue: {
    min: 0,
    formatter: value => {
      return numeral(value).format("0,0");
    }
  },
  month: {
    range: [0, 0.9],
    formatter: value => {
      return "Tháng " + value;
    }
  }
};
const cols = {
  revenue: {
    min: 0,
    formatter: value => {
      return numeral(value).format("0,0");
    }
  }
};
export class DashboardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generalStatic: null,
      yearStatic: [],
      flights: [],
      seatClasses: []
    };
    this.getGeneralStatics = this.getGeneralStatics.bind(this);
    this.seatClassStatic = this.seatClassStatic.bind(this);
    this.yearStatic = this.yearStatic.bind(this);
    this.monthStatic = this.monthStatic.bind(this);
  }
  async getGeneralStatics() {
    let result = await this.props.generalStatic();
    if (result && result.success) {
      this.setState({
        generalStatic: result
      });
    }
  }
  async yearStatic() {
    let result = await this.props.yearStatic();
    if (result && result.success) {
      this.setState({
        yearStatic: result.data
      });
    }
  }
  componentWillMount() {
    document.title = "FlyNow | Bảng điều khiển";
  }

  async monthStatic() {
    let result = await this.props.monthStatic();
    if (result && result.success) {
      this.setState({
        flights: result.data
      });
    }
  }
  async seatClassStatic() {
    let result = await this.props.seatClassStatic();
    if (result && result.success) {
      let arr;
      arr = result.data.map(item => {
        return { name: item.SeatClass.name, revenue: item.revenue };
      });
      this.setState({
        seatClasses: arr
      });
    }
  }
  async componentDidMount() {
    await this.getGeneralStatics();
    await this.yearStatic();
    await this.monthStatic();
    await this.seatClassStatic();
  }
  render() {
    const { generalStatic, yearStatic, seatClasses } = this.state;
    return (
      <div>
        <div className="d-flex row-custom">
          {generalStatic ? (
            <>
              <div className="col-card-3">
                <Card className="card-1">
                  <div className="d-flex justify-content-between ">
                    <span className="card-header-custom">Khách hàng</span>
                    <div className="icon-wrap">
                      <i className="fal fa-users icon-custom"></i>
                    </div>
                  </div>
                  <div className="number">{generalStatic.customer.total} </div>
                  <div>
                    <Icon className="custom-icon" type="arrow-up" />
                    <span className="percent" style={{ color: "green" }}>
                      {generalStatic.customer.increment.toFixed(2)}%
                    </span>
                    <span style={{ color: "#6a6a82 !important" }}>
                      Trong tháng qua
                    </span>
                  </div>
                </Card>
              </div>
              <div className="col-card-3">
                <Card className="card-1">
                  <div className="d-flex justify-content-between ">
                    <span className="card-header-custom">Đối tác</span>
                    <div className="icon-wrap">
                      <i className="fal fa-handshake icon-custom"></i>
                    </div>
                  </div>
                  <div className="number">{generalStatic.airline.total}</div>
                  <div>
                    <Icon className="custom-icon" type="arrow-up" />
                    <span className="percent" style={{ color: "green" }}>
                      {generalStatic.airline.increment.toFixed(2)}%{" "}
                    </span>
                    <span style={{ color: "#6a6a82 !important" }}>
                      Trong tháng qua
                    </span>
                  </div>
                </Card>
              </div>
              <div className="col-card-3">
                <Card className="card-1">
                  <div className="d-flex justify-content-between ">
                    <span className="card-header-custom">Doanh thu</span>
                    <div className="icon-wrap">
                      <i className="fal fa-money-bill icon-custom"></i>
                    </div>
                  </div>
                  <div className="number">
                    {numeral(generalStatic.revenue.revenue).format("0,0")}
                  </div>
                  <div>
                    <Icon className="custom-icon" type="arrow-up" />
                    <span className="percent" style={{ color: "green" }}>
                      {generalStatic.revenue.increment.toFixed(2)}%{" "}
                    </span>
                    <span style={{ color: "#6a6a82 !important" }}>
                      Trong tháng qua
                    </span>
                  </div>
                </Card>
              </div>
            </>
          ) : null}
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ marginTop: 25 }}
        >
          <Card
            className="card-1"
            title={<div className="title">thống kê doanh thu tháng 11</div>}
            style={{ width: "49%", height: 620 }}
          >
            <Table
              pagination={{
                size: "small",
                pageSize: 5
              }}
              rowKey={e => e.flight_id}
              dataSource={this.state.flights}
            >
              <Column
                title="Số hiệu chuyến bay"
                align="center"
                dataIndex="flight_id"
                key="flight_id"
              ></Column>
              <Column
                align="center"
                title="Hãng hàng không"
                dataIndex="Flight.Airline.name"
                key="name"
              ></Column>
              <Column
                align="center"
                title="Tổng số vé"
                dataIndex="quantity"
                key="quantity"
              ></Column>
              <Column
                key="remaining_quantity"
                align="center"
                title="Số vé bán"
                render={record => {
                  return record.quantity - record.remaining_quantity;
                }}
              ></Column>
              <Column
                key="percent"
                align="center"
                title="Tỉ lệ"
                render={record => {
                  return (
                    (
                      ((record.quantity - record.remaining_quantity) * 100) /
                      record.quantity
                    ).toFixed(2) + "%"
                  );
                }}
              ></Column>
              <Column
                align="center"
                title="Doanh thu"
                dataIndex="revenue"
                key="revenue"
              ></Column>
            </Table>
            {/* <div className="title">thống kê doanh thu tháng 11</div> */}
          </Card>
          <Card
            className="card-1"
            title={<div className="title">thống kê theo loại vé</div>}
            style={{ width: "49%" }}
          >
            <Chart height={500} data={seatClasses} scale={cols} forceFit>
              <Axis name="name" />
              <Axis name="revenue" />
              <Tooltip
                crosshairs={{
                  type: "y"
                }}
              />
              <Geom type="interval" position="name*revenue">
                <Label></Label>
              </Geom>
            </Chart>
            {/* <div className="title">thống kê theo loại vé</div> */}
          </Card>
        </div>
        <Card
          className="card-1"
          title={<div className="title">thống kê doanh thu từng tháng</div>}
          style={{ marginTop: 25 }}
        >
          <Chart height={400} data={yearStatic} scale={cols2} forceFit>
            <Axis name="month" />
            <Axis name="revenue" />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="line" position="month*revenue" size={2} />
            <Geom
              type="point"
              position="month*revenue"
              size={4}
              shape={"circle"}
              style={{
                stroke: "#fff",
                lineWidth: 1
              }}
            />
          </Chart>
          {/* <div className="title">thống kê doanh thu từng tháng</div> */}
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...handlers(dispatch)
  };
};

export default connect(null, mapDispatchToProps)(DashboardAdmin);
