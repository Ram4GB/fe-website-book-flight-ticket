import React, { Component } from "react";
import registerImg from "../common/assets/images/register-left-img.png";
import {
  Form,
  Row,
  Col,
  Card,
  Input,
  Button,
  Icon,
  Typography,
  notification,
  Radio
} from "antd";
import "antd/dist/antd.css";
import handlers from "../modules/user/handlers";
import { connect } from "react-redux";
import { catchErrorAndNotification } from "../common/utils/Notification";
import Lottie from "../common/libraries/Lottie";
import successAnimation from "../common/assets/animations/4541-mail-verification.json";
import { withRouter } from "react-router";

export class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null
    };
  }
  handelSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        delete values.confirmPassword;
        let result = await this.props.signUp(values);
        if (result && result.success === true) {
          notification.success({
            message: "Tạo tài khoản thành công"
          });
          this.setState({
            success: 1
          });
        } else catchErrorAndNotification(result.error, this);
      }
    });
  };
  checkMatchPassword = (rule, value, callback) => {
    let password = this.props.form.getFieldValue("password");
    if (value && password === value) {
      callback();
    } else {
      callback("2 Password không trùng khớp");
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { Title } = Typography;
    const { success } = this.state;
    return (
      <Card
        style={{
          width: "70%",
          margin: "10px auto"
        }}
      >
        {!success ? (
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
                  <Form.Item label="Tên" hasFeedback>
                    {getFieldDecorator("name", {
                      rules: [{ required: true, message: "Mời nhập họ và tên" }]
                    })(
                      <Input
                        prefix={
                          <Icon type="user" style={{ color: "#CACACA" }} />
                        }
                        placeholder="Họ và tên"
                      />
                    )}
                  </Form.Item>
                  <Form.Item label="CMND" hasFeedback>
                    {getFieldDecorator("identifier", {
                      rules: [{ required: true, message: "Mời nhập CMND" }]
                    })(
                      <Input
                        prefix={
                          <Icon type="code" style={{ color: "#CACACA" }} />
                        }
                        placeholder="CMND"
                      />
                    )}
                  </Form.Item>
                  <Form.Item label="Giới tính">
                    {getFieldDecorator("gender", {
                      rules: [
                        { required: true, message: "Mời nhập giới tính" }
                      ],
                      initialValue: "male"
                    })(
                      <Radio.Group>
                        <Radio value="male">Nam</Radio>
                        <Radio value="female">Nữ</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
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
                        prefix={
                          <Icon type="mail" style={{ color: "#CACACA" }} />
                        }
                        placeholder="Email"
                      />
                    )}
                  </Form.Item>
                  <Form.Item label="Mật khẩu">
                    {getFieldDecorator("password", {
                      rules: [{ required: true, message: "Mời nhập mật khẩu" }]
                    })(
                      <Input.Password
                        prefix={
                          <Icon type="lock" style={{ color: "#CACACA" }} />
                        }
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
                        prefix={
                          <Icon type="lock" style={{ color: "#CACACA" }} />
                        }
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
        ) : success === 1 ? (
          <>
            <Lottie
              options={{
                animationData: successAnimation
              }}
              width={"100%"}
              height={400}
            />
            <div style={{ textAlign: "center" }}>
              <Typography.Title level={4}>
                Một email đã được gửi tới hộp thư của bạn. Vui lòng kiểm tra
              </Typography.Title>
              <Button
                type="primary"
                onClick={() => this.props.history.push("/")}
              >
                Về trang chủ
              </Button>
            </div>
          </>
        ) : (
          <p>Không thành công</p>
        )}
      </Card>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  RegisterForm
);

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    ...handlers(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(WrappedNormalLoginForm));
