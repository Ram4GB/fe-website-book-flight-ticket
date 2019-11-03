import React, { Component } from "react";
import { Form, Input, Row, Col, Button, notification } from "antd";
import ReactQuill from "react-quill";
import { addAirplane } from "../../handlers";
import { catchErrorAndNotification } from "../../../../common/utils/Notification";
import Modal from "../../../../common/components/widgets/Modal";

class AirPlaneFormAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editorModules = {
      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" }
        ],
        ["link"],
        ["clean"]
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false
      }
    };
    this.editorFormats = [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link"
    ];
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        let result = await addAirplane(values);
        if (result && result.success === true) {
          notification.success({
            message: "Thêm hãng hàng không thành công"
          });
          this.props.getData();
          Modal.hide();
        } else catchErrorAndNotification(result.error, this);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Tên hãng hàng không">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Mời điền tên hảng hàng không"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Tên đại diện">
          {getFieldDecorator("short_name", {
            rules: [
              {
                required: true,
                message: "Mời điền tên đại diện"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Tên trang web">
          {getFieldDecorator("website", {})(<Input />)}
        </Form.Item>
        <Form.Item label="Liên lạc">
          {getFieldDecorator("contact_info", {})(<Input />)}
        </Form.Item>
        <Form.Item label="Mô tả">
          {getFieldDecorator("description", {
            initialValue: ""
          })(
            <ReactQuill
              modules={this.editorModules}
              formats={this.editorFormats}
            />
          )}
        </Form.Item>
        <Row>
          <Col style={{ textAlign: "right" }} lg={24}>
            <Button onClick={() => Modal.hide()}>Hủy</Button>{" "}
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create({ name: "airplane-form" })(AirPlaneFormAdd);
