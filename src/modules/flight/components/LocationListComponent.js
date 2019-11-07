import React, { Component } from "react";
import { Card, Input, Button, Table } from "antd";
import { catchErrorAndNotification } from "../../../common/utils/Notification";
import Column from "antd/lib/table/Column";
import modal from "../../../common/components/widgets/Modal";
import LocationAddForm from "./Form/LocationAddForm";

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
  render() {
    const { locations } = this.props;
    const { page, total } = this.state;
    return (
      <Card>
        <div style={{ overflow: "hidden", marginBottom: 5 }}>
          <Input
            placeholder="Tìm tên địa điểm"
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
          pagination={{
            size: "small",
            total,
            current: page
          }}
          rowKey={e => e.id}
          dataSource={locations}
        >
          <Column key="id" title="ID" dataIndex="id"></Column>
          <Column key="name" title="Tên địa điểm" dataIndex="name"></Column>
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
