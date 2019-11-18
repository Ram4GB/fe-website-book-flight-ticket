import React, { Component } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  notification,
  Upload,
  Icon
} from "antd";
import ReactQuill from "react-quill";
import { addAirplane } from "../../handlers";
import { catchErrorAndNotification } from "../../../../common/utils/Notification";
import Modal from "../../../../common/components/widgets/Modal";

class AirPlaneFormAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    /**
     * Start upload Image
     */
    this.dummyRequest = this.dummyRequest.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.normFile = this.normFile.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    /**
     * End upload Image
     */
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
  /**
   *
   * Upload Logo
   */
  dummyRequest({ file, onSuccess }) {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  }

  beforeUpload(file, fileList) {
    return true;
  }

  handleChangeFile(info) {
    if (info.file.status === "uploading") {
      return this.normFile(info);
    }
    if (info.file.status === "done") {
    }
    return this.normFile(info);
  }
  normFile(e) {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  /**End Upload Logo */

  render() {
    const { getFieldDecorator } = this.props.form;
    const { form } = this.props;
    const file = form.getFieldValue("file") || [];
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="File">
          {getFieldDecorator("document", {
            valuePropName: "fileList",
            getValueFromEvent: this.handleChangeFile
          })(
            <Upload
              name="file"
              listType="text"
              customRequest={this.dummyRequest}
              beforeUpload={this.beforeUpload}
            >
              {file.length <= 0 ? (
                <Button>
                  <Icon type="plus" /> Nhấn đế thêm logo
                </Button>
              ) : null}
            </Upload>
          )}
        </Form.Item>
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
