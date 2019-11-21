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
import moment from "moment";
import { getCustomerByID, updateCustomerByID } from "../modules/user/handlers";
import { catchErrorAndNotification } from "../common/utils/Notification";
import removeNullObject from "../common/utils/removeObjectNull";
import { emptyString } from "../modules/user/models";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";

export class CustomerInfomationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {},
      isEditing: {
        name: false,
        identifier: false,
        phone: false,
        email: false,
        birthday: false
      }
    };
    this.getCustomer = this.getCustomer.bind(this);
    this.edit = this.edit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.showEdittingButton = this.showEdittingButton.bind(this);
  }
  componentWillMount() {
    document.title = "FlyNow | Thông tin Khách hàng";
  }
  async getCustomer() {
    if (this.props.match.params.id) {
      let result = await getCustomerByID(this.props.match.params.id);
      if (result && result.success === true) {
        this.setState({
          customer: result.customer
        });
      } else catchErrorAndNotification(result.error);
    }
  }

  componentDidMount() {
    this.getCustomer();
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
        let result = await updateCustomerByID(
          values,
          this.props.match.params.id
        );
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
              birthday: false
            }
          });
          await this.getCustomer();
        } else catchErrorAndNotification(result.error, this);
      }
    });
  }
  handleReset() {
    this.setState({
      isEditing: {
        name: false,
        identifier: false,
        phone: false,
        email: false,
        birthday: false
      }
    });
    this.props.form.resetFields();
  }

  showEdittingButton() {
    const { isEditing } = this.state;
    const values = this.props.form.getFieldsValue();
    for (const key in values) {
      if (isEditing[key] !== values[key]) return true;
    }
    return false;
  }
  render() {
    const { customer, isEditing } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <CustomBreadcrumb
          items={[
            { url: "/admin/dashboard", icon: "home", title: "Bảng điều khiển" },
            { url: "/admin/customer", icon: "user", title: "Khách hàng" },
            {
              url: `/admin/customer/${customer.id}`,
              icon: "user",
              title: "Thông tin khách hàng"
            }
          ]}
        />
        <Row style={{ display: "flex" }} gutter={5}>
          <Col lg={7}>
            <Card style={{ height: "100%" }}>
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
              <Typography.Title
                style={{ textAlign: "center", marginTop: 8 }}
                level={3}
              >
                {customer ? customer.name : null}
              </Typography.Title>
            </Card>
          </Col>
          <Col lg={17}>
            <Card
              title={<strong>Thông tin cá nhân</strong>}
              style={{ height: "100%" }}
            >
              {customer ? (
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
                              initialValue: customer.name
                            })(<Input placeholder="Mời điền họ và tên" />)}
                          </Form.Item>
                        ) : (
                          <span>{customer.name}</span>
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
                              initialValue: customer.identifier
                            })(<Input placeholder="Mời điền CMND" />)}
                          </Form.Item>
                        ) : (
                          <span>{customer.identifier}</span>
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
                              initialValue: moment(customer.birthday)
                            })(<DatePicker placeholder="Mời điền ngày sinh" />)}
                          </Form.Item>
                        ) : (
                          <span>
                            {moment(customer.birthday).format("DD-MM-YYYY")}
                          </span>
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
                              initialValue: customer.phone
                            })(<Input placeholder="Mời điền SDT" />)}
                          </Form.Item>
                        ) : customer.phone ? (
                          <span>{customer.phone}</span>
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
                              initialValue: customer.email
                            })(<Input placeholder="Mời điền email" />)}
                          </Form.Item>
                        ) : (
                          <span>{customer.email}</span>
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
                  </Descriptions>
                  {this.showEdittingButton() ? (
                    <div style={{ marginTop: 5, textAlign: "right" }}>
                      <Button
                        onClick={this.handleReset}
                        style={{ margin: "0px 5px" }}
                      >
                        Làm mới
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

export default Form.create({ name: "form" })(CustomerInfomationPage);
