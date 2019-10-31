import React, { Component } from "react";
import { Table, notification, Button, Card } from "antd";
import Column from "antd/lib/table/Column";
import { catchErrorAndNotification } from "../../../common/utils/Notification";
import { LIMIT } from "../models";
import moment from "moment";

export class CustomerListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: [],
      totalRecord: 0,
      page: 1,
      limit: LIMIT,
      params: {
        // please dont put params there just call exaple params.name
      }
    };
    this.handleChangeTable = this.handleChangeTable.bind(this);
  }
  async getData(input) {
    const { page, params } = this.state;
    const { getListCustomer } = this.props;
    const next = input || page;
    const result = await getListCustomer(next, params);
    if (result && result.success === true) {
      this.setState({
        page: next,
        totalRecord: result.totalRecord
      });
    } else if (result && result.success === "false") {
      catchErrorAndNotification(result.error);
    } else {
      notification.error({
        message: "Server error"
      });
    }
  }
  componentDidMount() {
    this.getData();
  }
  handleChangeTable(pagination) {
    this.getData(pagination.current);
  }
  renderDataSource() {
    let arr = [];
    for (let i = 0; i < 11; i++) {
      arr.push({
        id: i,
        name: `Le Minh Cuong ${i}`,
        identifier: "0123456789",
        phone: "0123456789",
        email: `leminhcuong298${i}@yahoo.com.vn`,
        birthday: new Date(),
        gender: "Nam"
      });
    }
    return arr;
  }
  render() {
    const { page, limit, totalRecord } = this.state;
    // const { staffs } = this.props;
    return (
      <Card>
        <Table
          pagination={{
            current: page,
            pageSize: limit,
            total: totalRecord,
            size: "small"
          }}
          dataSource={this.renderDataSource()}
          onChange={this.handleChangeTable}
          rowKey={e => e.id}
        >
          <Column title="Họ và tên" dataIndex="name"></Column>
          <Column title="Giới tính" dataIndex="gender"></Column>
          <Column
            title="Ngày sinh"
            dataIndex="birthday"
            render={date => {
              return moment(date).format("DD-MM-YYYY");
            }}
          ></Column>
          <Column title="CMND" dataIndex="identifier"></Column>
          <Column title="Điện thoại" dataIndex="phone"></Column>
          <Column title="Email" dataIndex="email"></Column>
          <Column
            title="Thao tác"
            render={record => {
              return (
                <>
                  <Button type="primary" icon="edit">
                    Sửa
                  </Button>
                  <Button type="danger" icon="delete">
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

export default CustomerListComponent;
