import React, { Component } from "react";
import { Form, Input, Button, notification } from "antd";
import { catchErrorAndNotification } from "../../../../common/utils/Notification";
import Modal from "../../../../common/components/widgets/Modal";
import removeNullObject from "../../../../common/utils/removeObjectNull";

export class FormAddSeatClass extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    const { item } = this.props;
    e.preventDefault();
    this.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        values = removeNullObject(values);
        let result = !this.props.edit
          ? await this.props.createSeatClass(values)
          : await this.props.updateSeatClass(
              item && item.id ? item.id : null,
              values
            );
        if (result && result.success) {
          notification.success({
            message: !this.props.edit
              ? "Thêm thành công"
              : "Chỉnh sửa thành công"
          });
          this.props.getData();
          Modal.hide();
        } else catchErrorAndNotification(result.error, this);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { edit, item } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Tên">
          {getFieldDecorator("name", {
            rules: [{ message: "Mời bạn điền tên", required: true }],
            initialValue: edit && item ? item.name : ""
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Mô tả">
          {getFieldDecorator("description", {
            initialValue: edit && item ? item.description : ""
          })(<Input.TextArea />)}
        </Form.Item>
        <div style={{ textAlign: "right" }}>
          <Button htmlType="submit" type="primary">
            {!edit ? <>Thêm</> : <>Sửa</>}
          </Button>
        </div>
      </Form>
    );
  }
}

export default Form.create({ name: "" })(FormAddSeatClass);
