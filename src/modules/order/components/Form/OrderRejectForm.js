import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import Modal from "../../../../common/components/widgets/Modal";

class OrderRejectForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        console.log(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label={<strong>Lý do từ chối</strong>}>
          {getFieldDecorator("text", {
            rules: [{ message: "Xin mời nhập lý do", required: true }]
          })(
            <Input.TextArea
              style={{ height: 100 }}
              placeholder="Lý do từ chối"
            />
          )}
          <div style={{ textAlign: "right" }}>
            <Button onClick={() => Modal.hide()}>Hùy</Button>{" "}
            <Button type="primary" htmlType="submit">
              Từ chối
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "form" })(OrderRejectForm);
