import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  notification,
  Icon,
  Checkbox,
  Row,
  Col
} from "antd";
import { connect } from "react-redux";
import handlers from "../../modules/user/handlers";
import { withRouter } from "react-router";
import { catchErrorAndNotification } from "../utils/Notification";
import PageLoading from "./widgets/PageLoading";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.handleSubmitLoginForm = this.handleSubmitLoginForm.bind(this);
  }

  handleSubmitLoginForm(e) {
    this.setState({ loading: true });
    PageLoading.show();
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields(async (errors, values) => {
      if (!errors) {
        const { login } = this.props;
        const result = await login(values.email, values.password);
        if (result) {
          if (result && result.success === false) {
            PageLoading.hide();
            this.setState({ loading: false });
            catchErrorAndNotification(result.error);
          } else {
            PageLoading.hide();
            this.setState({ loading: false });
            notification.success({
              message: "Đăng nhập thành công"
            });
            setTimeout(() => {
              window.location.href = "/";
            }, 300);
          }
        }
      } else {
        PageLoading.hide();
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmitLoginForm}>
        <Form.Item label="Email">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "Invalid email"
              },
              {
                required: true
              }
            ]
          })(<Input prefix={<Icon type="user" />} />)}
        </Form.Item>
        <Form.Item label="Mật khẩu">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true
              }
            ]
          })(<Input.Password prefix={<Icon type="lock" />} />)}
        </Form.Item>
        <Form.Item>
          <Row>
            <Col lg={12}>
              <Checkbox></Checkbox>
              <span style={{ marginLeft: 5 }}>Ghi nhớ tôi</span>
            </Col>
            <Col lg={12} className="text-right">
              <a href="/#" className="text-decoration-none">
                Quên mật khẩu
              </a>
            </Col>
          </Row>
        </Form.Item>
        <Button
          loading={this.state.loading}
          htmlType="submit"
          type="primary"
          style={{ width: "100%" }}
        >
          Đăng nhập
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispathToProps = (dispatch, props) => {
  return {
    ...handlers(dispatch, props)
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withRouter(Form.create({ name: "login-form" })(LoginForm)));
