import React, { Component } from "react";
import {
  Form,
  Radio,
  Input,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Button,
  Icon
} from "antd";
import moment from "moment";

const nowDate = new Date();

class FormRegisterHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.setParamsRegisterFly(values);
        this.props.history.push("/step-register");
      }
    });
  }
  handleChangeType() {
    this.setState({
      type: this.state.type === 1 ? 2 : 1
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { paramsRegisterFly } = this.props;
    const { type } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("type", {
            initialValue: 1
          })(
            <Radio.Group onChange={this.handleChangeType}>
              <Radio value={1}>Khứ hồi</Radio>
              <Radio value={2}>Một chiều</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="Điểm đi">
          {getFieldDecorator("from", {
            initialValue: paramsRegisterFly ? paramsRegisterFly.from : ""
          })(<Input size={"large"} prefix={<Icon type="environment" />} />)}
        </Form.Item>
        <Form.Item label="Điểm đến">
          {getFieldDecorator("to", {
            initialValue: ""
          })(<Input size={"large"} prefix={<Icon type="environment" />} />)}
        </Form.Item>
        <Row gutter={6}>
          <Col lg={type === 1 ? 12 : 24}>
            <Form.Item label="Ngày đi">
              {getFieldDecorator("date_from", {
                initialValue: moment(nowDate)
              })(
                <DatePicker
                  style={{ width: "100%" }}
                  size={"large"}
                ></DatePicker>
              )}
            </Form.Item>
          </Col>
          {type === 1 ? (
            <Col lg={12}>
              <Form.Item label="Ngày về">
                {getFieldDecorator("date_to", {
                  initialValue: moment(nowDate)
                })(
                  <DatePicker
                    style={{ width: "100%" }}
                    size={"large"}
                  ></DatePicker>
                )}
              </Form.Item>
            </Col>
          ) : null}
        </Row>
        <Row gutter={6}>
          <Col lg={12}>
            <Form.Item label="Số người">
              {getFieldDecorator("count", {
                initialValue: 0
              })(
                <InputNumber
                  className="w-100"
                  prefix={<Icon type="user" />}
                  size={"large"}
                ></InputNumber>
              )}
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item style={{ paddingTop: 48 }}>
              <Button
                className="w-100"
                size="large"
                type="primary"
                htmlType="submit"
              >
                Tìm chuyến bay
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create({ name: "form-create" })(FormRegisterHomepage);
