import React, { Component } from "react";
import { Card, Table, Button, Input } from "antd";
import Column from "antd/lib/table/Column";
import { catchErrorAndNotification } from "../../../common/utils/Notification";
import modal from "../../../common/components/widgets/Modal";
import FormAddSeatClass from "./Form/FormAddSeatClass";
import { sortTable } from "../../../common/utils/sortTable";

export class SeatClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      total: 0,
      params: {}
    };
    this.getData = this.getData.bind(this);
    this.handleAddSeatClass = this.handleAddSeatClass.bind(this);
    this.handleChangeTable = this.handleChangeTable.bind(this);
  }
  async getData(input) {
    let next = input || this.state.page;
    let result = await this.props.getListSeatClass(next, this.state.params);
    if (result && result.success) {
      this.setState({
        total: result.totalRecord,
        page: next
      });
    } else catchErrorAndNotification(result.error);
  }
  async componentDidMount() {
    await this.getData();
  }
  handleAddSeatClass() {
    modal.show(
      <FormAddSeatClass
        getData={this.getData}
        createSeatClass={this.props.createSeatClass}
        edit={false}
      ></FormAddSeatClass>,
      {
        width: "60%",
        style: {
          top: 20
        },
        title: "Thêm loại vé"
      }
    );
  }
  handleEdit(item) {
    modal.show(
      <FormAddSeatClass
        getData={this.getData}
        updateSeatClass={this.props.updateSeatClass}
        edit={true}
        item={item}
      ></FormAddSeatClass>,
      {
        width: "60%",
        style: {
          top: 20
        },
        title: "Thêm loại vé"
      }
    );
  }
  async handleChangeTable(pagination, filter, sorter) {
    await sortTable(this, pagination, sorter);
  }
  render() {
    const { seatClasses } = this.props;
    const { page, total } = this.state;
    return (
      <Card>
        <div style={{ overflow: "hidden", marginBottom: 5 }}>
          <Input.Search
            placeholder="Tìm tên loại vé"
            style={{ float: "left", width: 200, marginLeft: 5 }}
          />
          <Button
            icon="plus"
            type="primary"
            style={{ float: "right", marginLeft: 5 }}
            onClick={this.handleAddSeatClass}
          >
            Thêm loại vé
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
          dataSource={seatClasses}
        >
          <Column title="Mã" sorter dataIndex="id"></Column>
          <Column title="Tên" sorter dataIndex="name"></Column>
          <Column title="Mô tả" dataIndex="description"></Column>
          <Column
            title="Thao tác"
            render={value => {
              return (
                <>
                  {" "}
                  <Button
                    onClick={() => this.handleEdit(value)}
                    icon="edit"
                    type="primary"
                    size="small"
                  >
                    Sửa
                  </Button>{" "}
                  <Button icon="delete" type="danger" size="small">
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

export default SeatClassList;
