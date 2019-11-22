import React, { Component } from "react";
import { Card, Table, Input, Button } from "antd";
import Column from "antd/lib/table/Column";
import { catchErrorAndNotification } from "../../../common/utils/Notification";
import modal from "../../../common/components/widgets/Modal";
import AirportAddForm from "./Form/AirportAddForm";
import { sortTable } from "../../../common/utils/sortTable";

export class AirportListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      total: 0,
      params: {}
    };
    this.getData = this.getData.bind(this);
    this.handleChangeTable = this.handleChangeTable.bind(this);
    this.handleShowFormAddAirport = this.handleShowFormAddAirport.bind(this);
    this.handleShowFormEditAirport = this.handleShowFormEditAirport.bind(this);
  }

  async getData(input = 1) {
    let next = input || this.state.page;
    let result = await this.props.getListAirport(next, this.state.params);
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
    await sortTable(this, pagination, sorter);
  }
  handleShowFormAddAirport() {
    modal.show(
      <AirportAddForm
        getListLocation={this.props.getListLocation}
        getData={this.getData}
        isEditing={false}
      ></AirportAddForm>,
      {
        title: "Thêm sân bay",
        style: { top: 20 },
        width: "60%"
      }
    );
  }
  handleShowFormEditAirport(item) {
    modal.show(
      <AirportAddForm
        getListLocation={this.props.getListLocation}
        getData={this.getData}
        isEditing={true}
        item={item}
      ></AirportAddForm>,
      {
        title: "Sửa sân bay",
        style: { top: 20 },
        width: "60%"
      }
    );
  }
  render() {
    const { airports } = this.props;
    const { page, total } = this.state;
    return (
      <Card>
        <div style={{ overflow: "hidden", marginBottom: 5 }}>
          <Input.Search
            placeholder="Tìm tên sân bay"
            style={{ float: "left", width: 200, marginLeft: 5 }}
          />
          <Button
            icon="plus"
            type="primary"
            style={{ float: "right", marginLeft: 5 }}
            onClick={this.handleShowFormAddAirport}
          >
            Thêm sân bay
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
          dataSource={airports}
        >
          <Column title="Tên" sorter dataIndex="name" key="name"></Column>
          <Column
            title="Mô tả"
            sorter
            dataIndex="description"
            render={value => {
              return <div dangerouslySetInnerHTML={{ __html: value }} />;
            }}
            key="description"
            align="center"
          ></Column>
          <Column
            title="Địa điểm"
            sorter
            dataIndex="Location.name"
            key="location_id"
            align="center"
          ></Column>

          <Column
            title="Thao tác"
            render={record => {
              return (
                <>
                  {/* <Button
                    size="small"
                    onClick={() => {
                      this.props.history.push(`/admin/airport/${record.id}`);
                    }}
                    type="primary"
                    icon="info-circle"
                    key="infoButton"
                  >
                    Chi tiết
                  </Button>
                  &nbsp; */}
                  <Button
                    size="small"
                    onClick={() => {
                      this.handleShowFormEditAirport(record);
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

export default AirportListComponent;
