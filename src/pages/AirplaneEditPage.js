import React, { Component } from "react";
import {
  Card,
  Form,
  Col,
  Row,
  Input,
  Button,
  Upload,
  Icon,
  notification
} from "antd";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";
import ReactQuill from "react-quill";
import { updateAirpplane, getAirplaneByID } from "../modules/flight/handlers";
import { catchErrorAndNotification } from "../common/utils/Notification";

export class AirplaneEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airline: {}
    };
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
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        let result = await updateAirpplane(this.props.match.params.id, values);
        if (result && result.success) {
          notification.success({
            message: "Sửa thành công"
          });
        } else catchErrorAndNotification(result.error, this);
      }
    });
  }
  async getAirplaneByID() {
    let result = await getAirplaneByID(this.props.match.params.id);
    if (result && result.success) {
      this.setState({
        airline: result.airline
      });
    }
  }
  async componentDidMount() {
    await this.getAirplaneByID();
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
    const { airline } = this.state;
    // const { form } = this.props;
    // const file = form.getFieldValue("file") || [];
    return (
      <>
        <CustomBreadcrumb
          items={[
            { url: "/admin/dashboard", icon: "home", title: "Bảng điều khiển" },
            {
              url: "/admin/airplane",
              icon: "rocket",
              title: "Hãng hàng không"
            },
            {
              url: `/admin/airplane/${this.props.match.params.id}`,
              icon: "rocket",
              title: "Thông tin hãng hàng không"
            },
            {
              url: `/admin/airplane/${this.props.match.params.id}/edit`,
              icon: "edit",
              title: "Chỉnh sửa hãng hàng không"
            }
          ]}
        ></CustomBreadcrumb>
        {airline ? (
          <Card
            title={<strong>Sửa hãng hàng không</strong>}
            style={{ marginTop: 5 }}
          >
            <Form onSubmit={this.handleSubmit}>
              <Row gutter={10}>
                <Col lg={8}>
                  <Form.Item label="Tên hãng hàng không">
                    {getFieldDecorator("name", {
                      rules: [
                        {
                          required: true,
                          message: "Xin mời điền tên hãng hàng không"
                        }
                      ],
                      initialValue: airline.name
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label="Tên viết tắt">
                    {getFieldDecorator("short_name", {
                      rules: [
                        {
                          required: true,
                          message: "Xin mời điền viết tắt hãng hàng không"
                        }
                      ],
                      initialValue: airline.short_name
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label="Logo">
                    {getFieldDecorator("document", {
                      rules: [
                        {
                          required: false,
                          message: "Xin chọn logo"
                        }
                      ],
                      valuePropName: "fileList",
                      getValueFromEvent: this.handleChangeFile
                    })(
                      <Upload
                        customRequest={this.dummyRequest}
                        beforeUpload={this.beforeUpload}
                      >
                        <Button>
                          <Icon type="upload" /> Click to Upload
                        </Button>
                      </Upload>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col lg={8}>
                  <Form.Item label="Người liên lạc">
                    {getFieldDecorator("contact_info", {
                      rules: [
                        {
                          message: "Xin mời điên người liên lạc",
                          required: true
                        }
                      ],
                      initialValue: airline.contact_info
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label="Số điện thoại">
                    {getFieldDecorator("phone", {
                      rules: [
                        {
                          message: "Xin mời điên số điện thoại",
                          required: false
                        }
                      ],
                      initialValue: airline.phone
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label="Trang web">
                    {getFieldDecorator("website", {
                      rules: [
                        {
                          message: "Xin mời điên Trang web",
                          required: false
                        }
                      ],
                      initialValue: airline.website
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label="Mô tả">
                    {getFieldDecorator("description", {
                      initialValue: airline.description
                    })(<ReactQuill></ReactQuill>)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col style={{ textAlign: "right" }} lg={24}>
                  <Button size="default">Hủy</Button>{" "}
                  <Button
                    htmlType="submit"
                    size="default"
                    icon="edit"
                    type="primary"
                  >
                    Sửa
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        ) : null}
      </>
    );
  }
}

export default Form.create({})(AirplaneEditPage);
