import React, { Component } from "react";
import { Card, Table, Input, Button, Tag, Avatar } from "antd";
import Column from "antd/lib/table/Column";
import { catchErrorAndNotification } from "../../../common/utils/Notification";
import modal from "../../../common/components/widgets/Modal";
import AirPlaneFormAdd from "./Form/AirPlaneFormAdd";
import imageFlight from "../../../common/assets/images/flight.png";
import { sortTable } from "../../../common/utils/sortTable";

export class AirplaneListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      total: 0,
      params: {}
    };
    this.getData = this.getData.bind(this);
    this.handleChangeTable = this.handleChangeTable.bind(this);
    this.handleShowFormAddAirplane = this.handleShowFormAddAirplane.bind(this);
  }
  handleShowFormAddAirplane() {
    // this.props.history.push("/admin/airplane/create");
    modal.show(<AirPlaneFormAdd getData={this.getData}></AirPlaneFormAdd>, {
      title: "Thêm hãng hàng không",
      style: { top: 20 },
      width: "60%"
    });
  }
  async getData(input = 1) {
    let next = input || this.state.page;
    let result = await this.props.getListAirPlane(next, this.state.params);
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
  async handleChangeTable(pagination, filter, sorter) {
    this.getData(pagination.current);
    await sortTable(this, pagination, sorter);
  }
  render() {
    const { airlines } = this.props;
    const { page, total } = this.state;
    return (
      <Card>
        <div style={{ overflow: "hidden", marginBottom: 5 }}>
          <Input.Search
            placeholder="Tìm tên máy bay"
            style={{ float: "left", width: 200, marginLeft: 5 }}
          />
          <Button
            icon="plus"
            type="primary"
            style={{ float: "right", marginLeft: 5 }}
            onClick={this.handleShowFormAddAirplane}
          >
            Thêm máy bay
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
          dataSource={airlines}
        >
          <Column
            title="Tên công ty"
            sorter
            key="name"
            render={record => {
              return (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginRight: 5 }}>
                    <Avatar src={imageFlight} />
                  </div>
                  <div>
                    <p
                      onClick={() =>
                        this.props.history.push(`/admin/airplane/${record.id}`)
                      }
                      className="table-name"
                    >
                      {record.name}
                    </p>
                    <p>
                      <Tag color="#1890ff">{record.short_name}</Tag>
                    </p>
                  </div>
                </div>
              );
            }}
          ></Column>
          <Column
            title="Website"
            sorter
            dataIndex="website"
            key="website"
            align="center"
            render={value => {
              return (
                <a rel="noopener noreferrer" target="_blank" href={value}>
                  {value}
                </a>
              );
            }}
          ></Column>
          <Column
            title="Liên lạc"
            sorter
            dataIndex="contact_info"
            key="contact_info"
            align="center"
          ></Column>
          {/* <Column
            title="Mô tả"
            dataIndex="description"
            key="description"
            align="center"
            render={value => {
              return <p dangerouslySetInnerHTML={{ __html: value }}></p>;
            }}
          ></Column> */}
          <Column
            title="Thao tác"
            render={record => {
              return (
                <>
                  <Button
                    size="small"
                    onClick={() => {
                      this.props.history.push(`/admin/airplane/${record.id}`);
                    }}
                    type="primary"
                    icon="info-circle"
                    key="infoButton"
                  >
                    Chi tiết
                  </Button>
                  &nbsp;
                  <Button
                    size="small"
                    onClick={() => {
                      this.props.history.push(
                        `/admin/airplane/${record.id}/edit`
                      );
                    }}
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

export default AirplaneListComponent;
