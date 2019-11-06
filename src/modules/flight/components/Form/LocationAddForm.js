import React, { Component } from "react";
import { Form, Input, Row, Col, Button, notification } from "antd";
import { catchErrorAndNotification } from "../../../../common/utils/Notification";
import Modal from "../../../../common/components/widgets/Modal";

class LocationAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        if (this.props.edit === false) {
          let result = await this.props.addLocation(values);
          if (result && result.success === true) {
            notification.success({
              message: "Thêm thành công"
            });
            Modal.hide();
            this.props.getData();
          } else catchErrorAndNotification(result.error, this);
        } else {
          let result = await this.props.updateLocation(
            this.props.location.id,
            values
          );
          if (result && result.success === true) {
            notification.success({
              message: "Chỉnh sửa thành công"
            });
            Modal.hide();
            this.props.getData();
          } else catchErrorAndNotification(result.error, this);
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { edit, location } = this.props;
    console.log(location, edit);

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("name", {
            rules: [{ message: "Mời nhập địa điểm", required: true }],
            initialValue: edit ? location.name : ""
          })(<Input placeholder="Địa điểm" />)}
        </Form.Item>
        <Row>
          <Col lg={24} style={{ textAlign: "right" }}>
            <Button htmlType="submit" type="primary">
              {edit ? "Sửa" : "Thêm"}
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create({ name: "form-add" })(LocationAddForm);
