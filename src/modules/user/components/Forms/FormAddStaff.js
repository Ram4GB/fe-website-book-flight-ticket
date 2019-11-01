import React, { Component } from "react";
import {
  Form,
  Input,
  Row,
  Button,
  Col,
  Radio,
  notification,
  DatePicker
} from "antd";
import modal from "../../../../common/components/widgets/Modal";
import { catchErrorAndNotification } from "../../../../common/utils/Notification";

export class FormAddStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        let result = await this.props.addStaff(values);
        if (result && result.success === true) {
          notification.success({
            message: "Thêm thành công nhân viên"
          });
          modal.hide();
          this.props.getData();
        } else catchErrorAndNotification(result.error);
      }
    });
  }
  handleCancel() {
    modal.hide();
    this.props.form.resetFields();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Họ và tên">
          {getFieldDecorator("name", {
            rules: [{ message: "Xin mời họ và tên", required: true }]
          })(<Input placeholder="Nhập họ và tên của nhân viên" />)}
        </Form.Item>
        <Form.Item label="Giới tính">
          {getFieldDecorator("gender", {
            rules: [{ message: "Xin chọn giới tính", required: true }],
            initialValue: "male"
          })(
            <Radio.Group>
              <Radio value="male">Nam</Radio>
              <Radio value="female">Nữ</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="Ngày sinh">
          {getFieldDecorator("birthday", {
            rules: [{ message: "Xin mời chọn ngày sinh", required: true }]
          })(
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Chọn ngày sinh của nhân viên"
            />
          )}
        </Form.Item>
        <Form.Item label="CMND">
          {getFieldDecorator("identifier", {
            rules: [
              { message: "Xin mời nhập Chứng Minh Nhân Dân", required: true }
            ]
          })(<Input placeholder="Nhập Chứng Minh Nhân Dân của nhân viên" />)}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator("email", {
            rules: [
              { message: "Xin mời điền tên email", required: true },
              {
                type: "email",
                message: "Xin mời bạn điền đúng định dạng email"
              }
            ]
          })(<Input placeholder="Nhập email của nhân viên" />)}
        </Form.Item>
        <Row>
          <Col style={{ textAlign: "right" }}>
            <Button onClick={this.handleCancel}>Hủy</Button>{" "}
            <Button type="primary" htmlType="submit">
              Tạo Mới
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create({ name: "form-add-staff" })(FormAddStaff);
