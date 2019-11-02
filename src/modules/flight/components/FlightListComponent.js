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
        id: i,
        name: "Flight " + i,
        date: new Date().toString(),
        time: new Date().getTime(),
        direction: 1
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
        <Table rowKey={e => e.id} dataSource={this.renderDataSource()}>
          <Column
            title="Tên chuyến bay"
            key="name"
            render={record => {
              return (
                <p
                  onClick={() =>
                    this.props.history.push(`/admin/flight/${record.id}`)
                  }
                  className="table-name"
                >
                  {record.name}
                </p>
              );
            }}
          ></Column>
          <Column title="Chiều" dataIndex="direction" key="direction"></Column>
          <Column title="Ngày bay" dataIndex="date" key="date"></Column>
          <Column title="Giờ bay" dataIndex="time" key="time"></Column>
        </Table>
      </Card>
    );
  }
}

export default FlightListComponent;
