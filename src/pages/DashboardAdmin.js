import React, { Component } from "react";
import { Card, Icon, List, Avatar } from "antd";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
const data2 = [
  {
    year: "1991",
    value: 3
  },
  {
    year: "1992",
    value: 4
  },
  {
    year: "1993",
    value: 3.5
  },
  {
    year: "1994",
    value: 5
  },
  {
    year: "1995",
    value: 4.9
  },
  {
    year: "1996",
    value: 6
  },
  {
    year: "1997",
    value: 7
  },
  {
    year: "1998",
    value: 9
  },
  {
    year: "1999",
    value: 13
  }
];
const cols2 = {
  value: {
    min: 0
  },
  year: {
    range: [0, 1]
  }
};
const cols = {
  sales: {
    tickInterval: 20
  }
};
const data = [
  {
    year: "1951 年",
    sales: 38
  },
  {
    year: "1952 年",
    sales: 52
  },
  {
    year: "1956 年",
    sales: 61
  },
  {
    year: "1957 年",
    sales: 145
  },
  {
    year: "1958 年",
    sales: 48
  },
  {
    year: "1959 年",
    sales: 38
  },
  {
    year: "1960 年",
    sales: 38
  },
  {
    year: "1962 年",
    sales: 38
  }
];
export class DashboardAdmin extends Component {
  render() {
    return (
      <div>
        <div className="d-flex row-custom">
          <div className="col-card-3">
            <Card>
              <div className="d-flex justify-content-between ">
                <span className="card-header-custom">Khách hàng</span>
                <div className="icon-wrap">
                  <i className="user-icon"></i>
                </div>
              </div>
              <div className="number">32000</div>
              <div>
                <Icon className="custom-icon" type="arrow-up" />
                <span className="percent" style={{ color: "green" }}>
                  5.15%{" "}
                </span>
                <span style={{ color: "#6a6a82 !important" }}>
                  Since last month
                </span>
              </div>
            </Card>
          </div>
          <div className="col-card-3">
            <Card>
              <div className="d-flex justify-content-between ">
                <span className="card-header-custom">Khách hàng</span>
                <div className="icon-wrap">
                  <i className="user-icon"></i>
                </div>
              </div>
              <div className="number">32000</div>
              <div>
                <Icon className="custom-icon" type="arrow-up" />
                <span className="percent" style={{ color: "green" }}>
                  5.15%{" "}
                </span>
                <span style={{ color: "#6a6a82 !important" }}>
                  Since last month
                </span>
              </div>
            </Card>
          </div>
          <div className="col-card-3">
            <Card>
              <div className="d-flex justify-content-between ">
                <span className="card-header-custom">Khách hàng</span>
                <div className="icon-wrap">
                  <i className="user-icon"></i>
                </div>
              </div>
              <div className="number">32000</div>
              <div>
                <Icon className="custom-icon" type="arrow-up" />
                <span className="percent" style={{ color: "green" }}>
                  5.15%{" "}
                </span>
                <span style={{ color: "#6a6a82 !important" }}>
                  Since last month
                </span>
              </div>
            </Card>
          </div>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ marginTop: 25 }}
        >
          <Card
            title={<div className="title">thống kê doanh thu tháng 11</div>}
            style={{ width: "55.5%" }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
            {/* <div className="title">thống kê doanh thu tháng 11</div> */}
          </Card>
          <Card
            title={<div className="title">thống kê theo loại vé</div>}
            style={{ width: "42.5%" }}
          >
            <Chart height={400} data={data} scale={cols} forceFit>
              <Axis name="year" />
              <Axis name="sales" />
              <Tooltip
                crosshairs={{
                  type: "y"
                }}
              />
              <Geom type="interval" position="year*sales" />
            </Chart>
            {/* <div className="title">thống kê theo loại vé</div> */}
          </Card>
        </div>
        <Card
          title={<div className="title">thống kê doanh thu từng tháng</div>}
          style={{ marginTop: 25 }}
        >
          <Chart height={400} data={data2} scale={cols2} forceFit>
            <Axis name="year" />
            <Axis name="value" />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="line" position="year*value" size={2} />
            <Geom
              type="point"
              position="year*value"
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

export default DashboardAdmin;
