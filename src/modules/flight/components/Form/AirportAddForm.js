import React, { Component } from "react";
import ReactQuill from "react-quill";
import { addAirport } from "../../handlers";
import { Form, Input, Row, Col, Button, notification, Select } from "antd";
import { catchErrorAndNotification } from "../../../../common/utils/Notification";
import Modal from "../../../../common/components/widgets/Modal";
export class AirportAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getLocation = this.getLocation.bind(this);
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
      console.log(values);
      if (!errors) {
        let result = await addAirport(values);
        if (result && result.success === true) {
          notification.success({
            message: "Thêm sân bay thành công"
          });
          this.props.getData();
          Modal.hide();
        } else catchErrorAndNotification(result.error, this);
      }
    });
  }
  async getLocation() {
    let next = 1;
    let result = await this.props.getListLocation(next, {});
    if (result && result.success === true) {
      this.setState({
        locations: result.data
      });
    } else catchErrorAndNotification(result.error);
  }
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { locations } = this.state;
    const { Option } = Select;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Tên sân bay">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Mời điền tên sân bay"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Địa điểm">
          {getFieldDecorator("location_id", {
            rules: [
              {
                required: true,
                message: "Mời chọn địa điểm"
              }
            ]
          })(
            <Select>
              {locations
                ? locations.map(location => {
                    return (
                      <Option key={location.id} value={location.id}>
                        {location.name}
                      </Option>
                    );
                  })
                : null}
            </Select>
          )}
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

export default Form.create({ name: "airport-form" })(AirportAddForm);
