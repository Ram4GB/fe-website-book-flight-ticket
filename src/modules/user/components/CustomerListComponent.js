import React, { Component } from "react";
import { Table, notification, Button, Card, Input } from "antd";
import Column from "antd/lib/table/Column";
import { catchErrorAndNotification } from "../../../common/utils/Notification";
import { LIMIT, emptyString } from "../models";
import modal from "../../../common/components/widgets/Modal";
import FormAddCustomer from "./Forms/FormAddCustomer";
import { tableSortUtil } from "../../../common/utils/TableUtil";

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
    this.handleAddCustomer = this.handleAddCustomer.bind(this);
    this.getData = this.getData.bind(this);
  }
  async getData(input = 1) {
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
  handleChangeTable(pagination, filter, sorter) {
    if (sorter && sorter.order) {
      tableSortUtil(sorter, this);
    }
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
        address: "TP HCM",
        gender: "Nam"
      });
    }
    return arr;
  }

  handleAddCustomer() {
    modal.show(
      <FormAddCustomer
        getData={this.getData}
        addCustomer={this.props.addCustomer}
      ></FormAddCustomer>,
      {
        style: { top: 20 },
        width: "60%"
      }
    );
  }

  render() {
    const { page, limit, totalRecord } = this.state;
    const { users } = this.props;
    return (
      <Card>
        <div style={{ overflow: "hidden", marginBottom: 5 }}>
          <Input
            placeholder="Tìm bằng họ và tên"
            style={{ float: "left", width: 200, marginLeft: 5 }}
          />
          <Input
            placeholder="Tìm bằng CMND"
            style={{ float: "left", width: 200, marginLeft: 5 }}
          />
          <Button
            icon="plus"
            type="primary"
            style={{ float: "right", marginLeft: 5 }}
            onClick={this.handleAddCustomer}
          >
            Thêm nhân viên
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
            current: page,
            pageSize: limit,
            total: totalRecord,
            size: "small"
          }}
          dataSource={users}
          onChange={this.handleChangeTable}
          rowKey={e => e.id}
        >
          <Column sorter title="Họ và tên" dataIndex="name"></Column>
          <Column sorter title="CMND" dataIndex="identifier"></Column>
          <Column
            sorter
            title="Điện thoại"
            dataIndex="phone"
            render={value => {
              if (value) return value;
              else return emptyString;
            }}
          ></Column>
          <Column sorter title="Email" dataIndex="email"></Column>
          <Column sorter title="Giới tính" dataIndex="gender"></Column>
          {/* <Column title="Giới tính" dataIndex="gender"></Column> */}
          <Column
            sorter
            title="Địa chỉ"
            dataIndex="address"
            render={value => {
              if (value) return value;
              else return emptyString;
            }}
          ></Column>
          {/* <Column
            title="Ngày sinh"
            dataIndex="birthday"
            render={date => {
              return moment(date).format("DD-MM-YYYY");
            }}
          ></Column> */}
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
