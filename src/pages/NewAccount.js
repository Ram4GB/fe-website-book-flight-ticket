import React, { Component } from "react";
import registerImg from "../common/assets/images/register-left-img.png";
import { Form, Row, Col, Card, Input, Button, Icon, Typography } from "antd";
import "antd/dist/antd.css";

export class RegisterForm extends Component {
  handelSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        console.log(values);
      }
    });
  };
  checkMatchPassword = (rule, value, callback) => {
    let password = this.props.form.getFieldValue("password");
    if (value && password === value) {
      callback();
    } else {
      callback("repassword doesnt match");
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { Title } = Typography;
    return (
      <Card
        style={{
          width: "70%",
          margin: "10px auto"
        }}
      >
        <Row>
          <Col lg={12}>
            <div>
              <img
                src={registerImg}
                alt=""
                width="100%"
                style={{
                  marginTop: "10%",
                  height: "auto",
                  verticalAlign: "middle"
                }}
              />
            </div>
          </Col>
          <Col lg={12}>
            <div
              style={{
                width: "80%",
                margin: "auto"
              }}
            >
              <Title
                type="secondary"
                strong="true"
                level={4}
                style={{ textAlign: "center" }}
              >
                ĐĂNG KÝ NGAY
              </Title>
              <Form onSubmit={this.handelSubmit}>
                <Form.Item label="Email" hasFeedback>
                  {getFieldDecorator("email", {
                    rules: [
                      { required: true, message: "Mời nhập Email" },
                      {
                        type: "email",
                        message: "It's not a email"
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type="mail" style={{ color: "#CACACA" }} />}
                      placeholder="Email"
                    />
                  )}
                </Form.Item>
                <Form.Item label="Mật khẩu">
                  {getFieldDecorator("password", {
                    rules: [{ required: true, message: "Mời nhập mật khẩu" }]
                  })(
                    <Input.Password
                      prefix={<Icon type="lock" style={{ color: "#CACACA" }} />}
                      placeholder="Mật khẩu"
                    />
                  )}
                </Form.Item>
                <Form.Item label="Nhập lại mật khẩu" hasFeedback>
                  {getFieldDecorator("confirmPassword", {
                    rules: [
                      {
                        required: true,
                        message: "Mời xác nhận mật khẩu"
                      },
                      {
                        validator: this.checkMatchPassword
                      }
                    ]
                  })(
                    <Input.Password
                      prefix={<Icon type="lock" style={{ color: "#CACACA" }} />}
                      placeholder="Nhập lại mật khẩu"
                    />
                  )}
                </Form.Item>
                <Form.Item label="Số điện thoại">
                  {getFieldDecorator("phone", {
                    rules: [
                      { message: "Mời nhập số điện thoại" },
                      {
                        pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                        message: "It not a phone number"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon type="phone" style={{ color: "#CACACA" }} />
                      }
                      placeholder="Số điện thoại"
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{ width: "100%" }}
                  >
                    <strong>ĐĂNG KÝ</strong>
                  </Button>
                </Form.Item>
                {/* <Button
                  style={{ width: "100%" }}
                  onClick={() => {
                    this.props.form.resetFields();
                  }}
                >
                  <strong>NHẬP LẠI</strong>
                </Button> */}
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  RegisterForm
);

export default WrappedNormalLoginForm;
