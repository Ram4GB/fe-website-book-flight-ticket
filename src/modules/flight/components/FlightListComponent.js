import React, { Component } from "react";
import { Card, Table, Input, Button } from "antd";
import Column from "antd/lib/table/Column";
import modal from "../../../common/components/widgets/Modal";

export class FlightListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleShowFormAddFlight = this.handleShowFormAddFlight.bind(this);
  }
  handleShowFormAddFlight() {
    this.props.history.push("/admin/flight/create");
  }
  renderDataSource() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        airlines: "VietJetAir" + i,
        departure: "Flight " + i,
        departureTime: "8:30 22/09/2019",
        arrival: "Flight " + i,
        arrivalTime: "8:30 22/09/2020",
        slot: 60
      });
    }
    return arr;
  }
  render() {
    return (
      <Card>
        <div style={{ overflow: "hidden", marginBottom: 5 }}>
          <Input
            placeholder="Tìm tên chuyến bay"
            style={{ float: "left", width: 200, marginLeft: 5 }}
          />
          <Button
            icon="plus"
            type="primary"
            style={{ float: "right", marginLeft: 5 }}
            onClick={this.handleShowFormAddFlight}
          >
            Thêm chuyến bay
          </Button>
          <Button
            icon="filter"
            type="primary"
            style={{ float: "right", marginLeft: 5 }}
          >
            Tìm kiếm nâng cao
          </Button>
        </div>
        <Table rowKey={e => e.airlines} dataSource={this.renderDataSource()}>
          <Column
            title="Hãng hàng không"
            key="airlines"
            width="25%"
            render={record => {
              return <p>{record.airlines}</p>;
            }}
          ></Column>
          <Column
            title="Điểm đi"
            key="from"
            render={record => {
              return (
                <>
                  <strong>{record.departure}</strong>
                  <p className="table-name" style={{ fontSize: "13px" }}>
                    {record.departureTime}
                  </p>
                </>
              );
            }}
          ></Column>
          <Column
            title="Điểm đến"
            key="to"
            render={record => {
              return (
                <>
                  <strong>{record.arrival}</strong>
                  <p className="table-name" style={{ fontSize: "13px" }}>
                    {record.arrivalTime}
                  </p>
                </>
              );
            }}
          ></Column>
          <Column
            title="Số lượng ghế"
            dataIndex="slot"
            key="slot"
            align="center"
          ></Column>
          <Column
            title="Thao tác"
            render={() => {
              return (
                <>
                  <Button type="primary" icon="info-circle" key="infoButton">
                    Chi tiết
                  </Button>
                  &nbsp;
                  <Button type="primary" icon="edit" key="editButton">
                    Sửa
                  </Button>
                  &nbsp;
                  <Button type="danger" icon="delete" key="deleteButton">
                    Xoá
                  </Button>
                </>
              );
            }}
            key="button"
            align="right"
            width="30%"
          ></Column>
        </Table>
      </Card>
    );
  }
}

export default FlightListComponent;
