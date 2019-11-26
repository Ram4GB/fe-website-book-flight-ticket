import React, { Component } from "react";
import { Form, Icon, Upload, Button, Row, Col, notification } from "antd";
import { connect } from "react-redux";
import handlers from "../../handlers";
import Modal from "../../../../common/components/widgets/Modal";
import { catchErrorAndNotification } from "../../../../common/utils/Notification";

export class FormUploadTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null
    };
    /**
     * Start upload Image
     */
    this.dummyRequest = this.dummyRequest.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.normFile = this.normFile.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    /**
     * End upload Image
     */
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
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  /**End Upload Logo */
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        let result = await this.props.updateTransferContent(
          this.props.id,
          values
        );
        if (result && result.success) {
          notification.success({
            message: "Bạn đã cập nhật thành công"
          });
          this.props.getData();
          Modal.hide();
        } else catchErrorAndNotification(result.error, this);
      }
    });
  }
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { imageUrl } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col lg={24}>
            {imageUrl ? (
              <img
                alt=""
                style={{ display: "block", margin: "auto", width: 300 }}
                src={imageUrl}
              />
            ) : null}
          </Col>
        </Row>
        <Form.Item label="Bằng chứng thanh toán">
          {getFieldDecorator("document", {
            rules: [
              {
                required: true,
                message: "Xin chọn bằng chứng thanh toán"
              }
            ],
            valuePropName: "fileList",
            getValueFromEvent: this.handleChangeFile
          })(
            <Upload
              onChange={this.handleChange}
              customRequest={this.dummyRequest}
              beforeUpload={this.beforeUpload}
            >
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
          )}
        </Form.Item>
        <Row gutter={6}>
          <Col style={{ textAlign: "right" }} lg={22}>
            <Button onClick={() => Modal.hide()} htmlType="submit">
              Hủy
            </Button>{" "}
            <Button htmlType="submit" type="primary">
              Cập nhật
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...handlers(dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Form.create({})(FormUploadTransfer));
