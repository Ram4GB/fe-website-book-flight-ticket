import React, { Component } from "react";
import { LIMIT } from "../models";
import { catchErrorAndNotification } from "../../../common/utils/Notification";
import { Table, Button, Tag, Avatar, notification, Card } from "antd";
import modal from "../../../common/components/widgets/Modal";
import FormAddUser from "./Forms/FormAddUser";
import moment from "moment";
const columns = [
  {
    title: "Ảnh",
    key: "image",
    render: record => {
      return record.gender === "female" ? (
        <Avatar src="https://inspireducation.org.pk/wp-content/uploads/2019/06/person-girl-flat.png" />
      ) : (
        <Avatar src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1" />
      );
    }
  },
  { title: "CMND", dataIndex: "id", key: "id" },
  {
    title: "Tên",
    key: "name",
    render: record => <div className="link">{record.name}</div>
  },
  { title: "Giới tính", dataIndex: "gender", key: "gender" },
  {
    title: "Ngày sinh",
    dataIndex: "birthday",
    key: "birthday",
    render: value => {
      return <span>{moment(value).format("DD-MM-YYYY")}</span>;
    }
  },
  { title: "Điển thoại", dataIndex: "phone", key: "phone" },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
    render: value => {
      return <Tag color="blue">{value}</Tag>;
    }
  },
  {
    title: "Thao tác",
    key: "action",
    width: 120,
    render: record => {
      return (
        <span style={{ display: "flex", justifyContent: "space-around" }}>
          <Button type="primary" icon="edit" />
          <Button type="danger" icon="delete" />
        </span>
      );
    }
  }
];
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
    this.handleShowFormAddUser = this.handleShowFormAddUser.bind(this);
    this.handleChangeTableStaffs = this.handleChangeTableStaffs.bind(this);
    this.getData = this.getData.bind(this);
  }

  async componentDidMount() {
    await this.getData();
    console.log(this.props);
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

  handleShowFormAddUser() {
    const { addCashier } = this.props;
    modal.show(<FormAddUser getData={this.getData} addUser={addCashier} />, {
      title: "Form Add Staff",
      width: "60%",
      style: { top: 10, minWidth: 300 }
    });
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
        status: "New"
      });
    }
    return arr;
  }
  render() {
    const { page, limit, totalRecord } = this.state;
    // const { users } = this.props;
    return (
      <Card>
        <Table
          className="mw-70"
          onChange={this.handleChangeTableStaffs}
          rowKey={staff => {
            return staff.id;
          }}
          dataSource={this.renderDataSource()}
          columns={columns}
          pagination={{
            current: page,
            pageSize: limit,
            total: totalRecord,
            size: "small"
          }}
        />
      </Card>
    );
  }
}

export default UserComponent;
