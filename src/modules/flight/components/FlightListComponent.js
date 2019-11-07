import React, { Component } from "react";
import { Card, Table, Input, Button } from "antd";
import Column from "antd/lib/table/Column";
import { catchErrorAndNotification } from "../../../common/utils/Notification";

export class FlightListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      total: 0,
      params: {}
    };
    this.handleShowFormAddFlight = this.handleShowFormAddFlight.bind(this);
    this.getData = this.getData.bind(this);
    this.handleChangeTable = this.handleChangeTable.bind(this);
  }
  handleShowFormAddFlight() {
    this.props.history.push("/admin/flight/create");
  }
  async getData(input = 1) {
    let next = input || this.state.page;
    let result = await this.props.getListFlight(next, this.state.params);
    if (result && result.success === true) {
      this.setState({
        total: result.totalRecord,
        page: next
      });
    } else catchErrorAndNotification(result.error);
  }
  componentDidMount() {
    // this.getData();
  }
  handleChangeTable(pagination) {
    this.getData(pagination.current);
  }
  render() {
    const { flights } = this.props;
    const { page, total } = this.state;
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
        <Table
          onChange={this.handleChangeTable}
          pagination={{
            total,
            current: page
          }}
          rowKey={e => e.airlines}
          dataSource={flights}
        >
          <Column
            title="Hãng hàng không"
            key="airlines"
            width="25%"
            render={record => {
              return <p className="table-name">{record.airlines}</p>;
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
                  <Button
                    size="small"
                    type="primary"
                    icon="info-circle"
                    key="infoButton"
                  >
                    Chi tiết
                  </Button>
                  &nbsp;
                  <Button
                    size="small"
                    type="primary"
                    icon="edit"
                    key="editButton"
                  >
                    Sửa
                  </Button>
                  &nbsp;
                  <Button
                    size="small"
                    type="danger"
                    icon="delete"
                    key="deleteButton"
                  >
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
