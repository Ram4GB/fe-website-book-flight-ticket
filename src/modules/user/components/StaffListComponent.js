import React, { Component } from "react";
import { LIMIT, emptyString } from "../models";
import { catchErrorAndNotification } from "../../../common/utils/Notification";
import { Table, Button, notification, Card, Input } from "antd";
import modal from "../../../common/components/widgets/Modal";
import Column from "antd/lib/table/Column";
import FormAddStaff from "./Forms/FormAddStaff";

export class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalRecord: 0,
      page: 1,
      limit: LIMIT,
      params: {
        // please dont put params there just call exaple params.name
      }
    };
    this.handleShowFormAddStaff = this.handleShowFormAddStaff.bind(this);
    this.handleChangeTableStaffs = this.handleChangeTableStaffs.bind(this);
    this.getData = this.getData.bind(this);
  }

  async componentDidMount() {
    await this.getData();
  }

  async getData(input) {
    const { page, params } = this.state;
    const { getListStaff } = this.props;
    const next = input || page;
    const result = await getListStaff(next, params);
    console.log(result);
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

  handleShowFormAddStaff() {
    const { addStaff } = this.props;
    modal.show(
      <FormAddStaff getData={this.getData} addStaff={addStaff}></FormAddStaff>,
      {
        title: "Thêm nhân viên",
        style: { top: 20 },
        width: "50%"
      }
    );
  }

  handleChangeTableStaffs(pagination) {
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
        gender: "Nam",
        status: "New",
        address: "Q.6"
      });
    }
    return arr;
  }
  render() {
    const { page, limit, totalRecord } = this.state;
    const { staffs } = this.props;
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
            onClick={this.handleShowFormAddStaff}
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
          className="mw-70"
          onChange={this.handleChangeTableStaffs}
          rowKey={staff => {
            return staff.id;
          }}
          dataSource={staffs}
          pagination={{
            current: page,
            pageSize: limit,
            total: totalRecord,
            size: "small"
          }}
        >
          <Column title="Họ và tên" dataIndex="name"></Column>
          <Column title="CMND" dataIndex="identifier"></Column>
          <Column
            title="Điện thoại"
            dataIndex="phone"
            render={value => {
              if (value) return value;
              else return emptyString;
            }}
          ></Column>
          <Column title="Email" dataIndex="email"></Column>
          <Column title="Giới tính" dataIndex="gender"></Column>
          {/* <Column title="Giới tính" dataIndex="gender"></Column> */}
          <Column
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

export default UserComponent;
