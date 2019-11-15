import React, { Component } from "react";
import { Card, Input, Button, Table, Avatar } from "antd";
import { catchErrorAndNotification } from "../../../common/utils/Notification";
import Column from "antd/lib/table/Column";
import modal from "../../../common/components/widgets/Modal";
import LocationAddForm from "./Form/LocationAddForm";
import { sortTable } from "../../../common/utils/sortTable";
import { searchTable } from "../../../common/utils/searchTable";

export class LocationListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      total: 0,
      params: {}
    };
    this.getData = this.getData.bind(this);
    this.handleShowFormAddLocation = this.handleShowFormAddLocation.bind(this);
    this.handleChangeTable = this.handleChangeTable.bind(this);
  }
  async getData(input) {
    let next = input || this.state.page;
    let result = await this.props.getListLocation(next, this.state.params);
    if (result && result.success)
      this.setState({
        total: result.totalRecord,
        page: next
      });
    else catchErrorAndNotification(result.error);
  }
  componentDidMount() {
    this.props.getListLocation();
  }
  handleShowFormAddLocation() {
    modal.show(
      <LocationAddForm
        getData={this.getData}
        addLocation={this.props.addLocation}
        edit={false}
      ></LocationAddForm>,
      {
        width: "60%",
        style: {
          top: 20
        },
        title: "Thêm địa điểm"
      }
    );
  }
  handleShowFormEditLocation(location) {
    modal.show(
      <LocationAddForm
        getData={this.getData}
        updateLocation={this.props.updateLocation}
        edit={true}
        location={location}
      ></LocationAddForm>,
      {
        width: "60%",
        style: {
          top: 20
        },
        title: "Thêm địa điểm"
      }
    );
  }
  async handleChangeTable(pagination, filter, sorter) {
    await sortTable(this, pagination, sorter);
  }

  render() {
    const { locations } = this.props;
    const { page, total } = this.state;
    return (
      <Card>
        <div style={{ overflow: "hidden", marginBottom: 5 }}>
          <Input.Search
            placeholder="Tìm tên địa điểm"
            onSearch={searchTable(this, "name", "like")} // => Field Name and Operator
            style={{ float: "left", width: 200, marginLeft: 5 }}
          />
          <Button
            icon="plus"
            type="primary"
            style={{ float: "right", marginLeft: 5 }}
            onClick={this.handleShowFormAddLocation}
          >
            Thêm địa điểm
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
            size: "small",
            total,
            current: page
          }}
          rowKey={e => e.id}
          dataSource={locations}
        >
          <Column
            key="name"
            sorter
            title="Tên địa điểm"
            dataIndex="name"
            render={value => {
              return (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginRight: 5 }}>
                    <Avatar src="https://i-love-png.com/images/location_559008.png" />
                  </div>
                  <div>
                    {value ? <p className="table-name">{value}</p> : "---"}
                  </div>
                </div>
              );
            }}
          ></Column>
          <Column
            key="action"
            title="Thao tác"
            render={record => {
              return (
                <>
                  <Button
                    size="small"
                    onClick={() => this.handleShowFormEditLocation(record)}
                    icon="edit"
                    type="primary"
                  >
                    Sửa
                  </Button>{" "}
                  <Button type="danger" size="small" icon="delete">
                    Xóa
                  </Button>
                </>
              );
            }}
          ></Column>
        </Table>
      </Card>
    );
  }
}

export default LocationListComponent;
