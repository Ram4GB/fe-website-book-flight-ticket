import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Descriptions,
  Icon,
  Form,
  Input,
  Button,
  notification,
  DatePicker
} from "antd";
import { getStaffByID, updateStaffByID } from "../modules/user/handlers";
import { catchErrorAndNotification } from "../common/utils/Notification";
import { emptyString } from "../modules/user/models";
import removeNullObject from "../common/utils/removeObjectNull";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";
import moment from "moment";

export class StaffInformationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staff: {},
      isEditing: {
        name: false,
        identifier: false,
        phone: false,
        email: false,
        address: false,
        birthday: false
      }
    };
    this.getStaff = this.getStaff.bind(this);
    this.edit = this.edit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showEdittingButton = this.showEdittingButton.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  componentWillMount() {
    document.title = "FlyNow | Thông tin Nhân viên";
  }
  async getStaff() {
    if (this.props.match.params.id) {
      let result = await getStaffByID(this.props.match.params.id);
      if (result && result.success === true)
        this.setState({
          staff: result.staff
        });
      else catchErrorAndNotification(result.error);
    }
  }
  componentDidMount() {
    this.getStaff();
  }
  edit(key) {
    this.setState({
      ...this.state,
      isEditing: {
        ...this.state.isEditing,
        [key]: !this.state.isEditing[key]
      }
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        values = removeNullObject(values);
        let result = await updateStaffByID(values, this.props.match.params.id);
        if (result && result.success === true) {
          notification.success({
            message: "Cập nhật thành công"
          });
          this.setState({
            isEditing: {
              name: false,
              identifier: false,
              phone: false,
              email: false,
              address: false
            }
          });
          await this.getStaff();
        } else catchErrorAndNotification(result.error, this);
      }
    });
  }
  showEdittingButton() {
    const { isEditing } = this.state;
    const values = this.props.form.getFieldsValue();
    for (const key in values) {
      if (isEditing[key] !== values[key]) return true;
    }
    return false;
  }
  handleReset() {
    this.setState({
      isEditing: {
        name: false,
        identifier: false,
        phone: false,
        email: false,
        address: false
      }
    });
    this.props.form.resetFields();
  }
  render() {
    const { staff, isEditing } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <CustomBreadcrumb
          items={[
            { url: "/admin/dashboard", icon: "home", title: "Bảng điều khiển" },
            { url: "/admin/staff", icon: "user", title: "Nhân viên" },
            {
              url: `/admin/staff/${staff.id}`,
              icon: "user",
              title: "Thông tin nhân viên"
            }
          ]}
        />
        <Row style={{ display: "flex" }} gutter={5}>
          <Col lg={7}>
            <Card style={{ height: "100%" }}>
              <div>
                <Avatar
                  style={{
                    width: "100%",
                    height: 200,
                    maxWidth: 200,
                    minWidth: 200,
                    display: "block",
                    margin: "auto"
                  }}
                />
              </div>
              <Typography.Title
                style={{ textAlign: "center", marginTop: 8 }}
                level={3}
              >
                {staff ? staff.name : null}
              </Typography.Title>
            </Card>
          </Col>
          <Col lg={17}>
            <Card
              title={<strong>Thông tin cá nhân</strong>}
              style={{ height: "100%" }}
            >
              {staff ? (
                <Form onSubmit={this.handleSubmit}>
                  <Descriptions column={1} bordered>
                    <Descriptions.Item label={<strong>Họ và tên</strong>}>
                      <div style={{ overflow: "hidden" }}>
                        {isEditing.name ? (
                          <Form.Item style={{ marginBottom: 0 }}>
                            {getFieldDecorator("name", {
                              rules: [
                                {
                                  required: true,
                                  message: "Mời điền họ và tên"
                                }
                              ],
                              initialValue: staff.name
                            })(<Input placeholder="Mời điền họ và tên" />)}
                          </Form.Item>
                        ) : (
                          <span>{staff.name}</span>
                        )}
                        {isEditing.name ? null : (
                          <span style={{ float: "right" }}>
                            <Icon
                              onClick={() => this.edit("name")}
                              type="edit"
                              style={{ color: "blue" }}
                            />
                          </span>
                        )}
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>CMND</strong>}>
                      <div style={{ overflow: "hidden" }}>
                        {isEditing.identifier ? (
                          <Form.Item style={{ marginBottom: 0 }}>
                            {getFieldDecorator("identifier", {
                              rules: [
                                {
                                  required: true,
                                  message: "Mời điền CMND"
                                }
                              ],
                              initialValue: staff.identifier
                            })(<Input placeholder="Mời điền CMND" />)}
                          </Form.Item>
                        ) : (
                          <span>{staff.identifier}</span>
                        )}
                        {isEditing.identifier ? null : (
                          <span style={{ float: "right" }}>
                            <Icon
                              onClick={() => this.edit("identifier")}
                              type="edit"
                              style={{ color: "blue" }}
                            />
                          </span>
                        )}
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>Ngày sinh</strong>}>
                      <div style={{ overflow: "hidden" }}>
                        {isEditing.birthday ? (
                          <Form.Item style={{ marginBottom: 0 }}>
                            {getFieldDecorator("birthday", {
                              rules: [
                                {
                                  required: true,
                                  message: "Mời điền CMND"
                                }
                              ],
                              initialValue: moment(staff.birthday)
                            })(<DatePicker placeholder="Mời điền ngày sinh" />)}
                          </Form.Item>
                        ) : staff.birthday ? (
                          <span>
                            {moment(staff.birthday).format("DD-MM-YYYY")}
                          </span>
                        ) : (
                          emptyString
                        )}
                        {isEditing.birthday ? null : (
                          <span style={{ float: "right" }}>
                            <Icon
                              onClick={() => this.edit("birthday")}
                              type="edit"
                              style={{ color: "blue" }}
                            />
                          </span>
                        )}
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>SDT</strong>}>
                      <div style={{ overflow: "hidden" }}>
                        {isEditing.phone ? (
                          <Form.Item style={{ marginBottom: 0 }}>
                            {getFieldDecorator("phone", {
                              initialValue: staff.phone
                            })(<Input placeholder="Mời điền SDT" />)}
                          </Form.Item>
                        ) : staff.phone ? (
                          <span>{staff.phone}</span>
                        ) : (
                          emptyString
                        )}
                        {isEditing.phone ? null : (
                          <span style={{ float: "right" }}>
                            <Icon
                              onClick={() => this.edit("phone")}
                              type="edit"
                              style={{ color: "blue" }}
                            />
                          </span>
                        )}
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>Email</strong>}>
                      <div style={{ overflow: "hidden" }}>
                        {isEditing.email ? (
                          <Form.Item style={{ marginBottom: 0 }}>
                            {getFieldDecorator("email", {
                              rules: [
                                {
                                  required: true,
                                  message: "Mời điền email"
                                }
                              ],
                              initialValue: staff.email
                            })(<Input placeholder="Mời điền email" />)}
                          </Form.Item>
                        ) : (
                          <span>{staff.email}</span>
                        )}
                        {isEditing.email ? null : (
                          <span style={{ float: "right" }}>
                            <Icon
                              onClick={() => this.edit("email")}
                              type="edit"
                              style={{ color: "blue" }}
                            />
                          </span>
                        )}
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>Địa chỉ</strong>}>
                      <div style={{ overflow: "hidden" }}>
                        {isEditing.address ? (
                          <Form.Item style={{ marginBottom: 0 }}>
                            {getFieldDecorator("address", {
                              initialValue: staff.address
                            })(<Input placeholder="Mời điền địa chỉ" />)}
                          </Form.Item>
                        ) : staff.address ? (
                          <span>{staff.address}</span>
                        ) : (
                          emptyString
                        )}
                        {isEditing.address ? null : (
                          <span style={{ float: "right" }}>
                            <Icon
                              onClick={() => this.edit("address")}
                              type="edit"
                              style={{ color: "blue" }}
                            />
                          </span>
                        )}
                      </div>
                    </Descriptions.Item>
                  </Descriptions>
                  {this.showEdittingButton() ? (
                    <div style={{ marginTop: 5, textAlign: "right" }}>
                      <Button
                        onClick={this.handleReset}
                        style={{ margin: "0px 5px" }}
                      >
                        Hủy
                      </Button>
                      <Button htmlType="submit" type="primary">
                        Lưu lại
                      </Button>
                    </div>
                  ) : null}
                </Form>
              ) : null}
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default Form.create({ name: "form" })(StaffInformationPage);
