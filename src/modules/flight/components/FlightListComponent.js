import React, { Component } from "react";
import { Card, Table, Button, Avatar, Tag } from "antd";
import Column from "antd/lib/table/Column";
import { catchErrorAndNotification } from "../../../common/utils/Notification";
import moment from "moment";
import { DEFAULT_URL } from "../../../common/url";

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
    this.getData();
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
            current: page,
            size: "small"
          }}
          rowKey={e => e.id}
          dataSource={flights}
        >
          <Column
            title="Hãng hàng không"
            key="airline"
            render={record => {
              const { Airline = {} } = record;
              return (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginRight: 5 }}>
                    <Avatar src={DEFAULT_URL + "/" + Airline.logo} />
                  </div>
                  <div>
                    <p
                      onClick={() =>
                        this.props.history.push(`/admin/airline/${Airline.id}`)
                      }
                      className="table-name"
                    >
                      {Airline.name}
                    </p>
                    <p>
                      <Tag color="#1890ff">{Airline.short_name}</Tag>
                    </p>
                  </div>
                </div>
              );
            }}
          ></Column>
          <Column
            title="Điểm đi"
            key="from"
            render={record => {
              return (
                <>
                  {/* <strong>{record.departure}</strong> */}
                  <p className="table-name" style={{ fontSize: "13px" }}>
                    {record.start_airport.name}
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
                  {/* <strong>{record.arrival}</strong> */}
                  <p className="table-name" style={{ fontSize: "13px" }}>
                    {record.end_airport.name}
                  </p>
                </>
              );
            }}
          ></Column>
          <Column
            title="Số lượng loại ghế"
            dataIndex="Seats"
            key="seats"
            align="center"
            render={(record = []) => {
              return record.map(r => {
                const { SeatClass = {} } = r;
                return (
                  <Tag color="blue" style={{ marginBottom: 5 }}>
                    {SeatClass.name} - {r.quantity}
                  </Tag>
                );
              });
            }}
          ></Column>
          <Column
            title="Ngày bay"
            dataIndex="flight_date"
            key="flight_date"
            align="center"
            render={(record, row) => {
              return (
                row.flight_start_time +
                ", " +
                moment(record).format("DD/MM/YYYY")
              );
            }}
          ></Column>
          <Column
            title="Thời gian bay"
            dataIndex="flight_time"
            key="flight_time"
            align="center"
            render={record => {
              const m = moment()
                .startOf("day")
                .add(record, "hours");
              return record ? (
                <Tag>
                  {m.format("HH")}h{m.format("mm")}p
                </Tag>
              ) : (
                "0"
              );
            }}
          ></Column>
          <Column
            title="Thao tác"
            render={record => {
              return (
                <>
                  <Button
                    onClick={() =>
                      this.props.history.push(`/admin/flight/${record.id}`)
                    }
                    size="small"
                    type="primary"
                    icon="info-circle"
                    key="infoButton"
                  >
                    Chi tiết
                  </Button>
                  &nbsp;
                  <Button
                    onClick={() =>
                      this.props.history.push(`/admin/flight/${record.id}/edit`)
                    }
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
