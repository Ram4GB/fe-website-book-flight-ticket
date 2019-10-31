import React, { Component } from "react";
import LoginForm from "../components/LoginForm";
import { Card, Row, Col } from "antd";
import loginleftimg from "../assets/images/login-left-img.png";

export class LoginPage extends Component {
  render() {
    return (
      <Card style={{ margin: "24px auto", width: "60%", minWidth: 300 }}>
        <Row style={{ padding: 30 }}>
          <Col lg={12}>
            <img alt='' style={{ width: "100%", maxWidth: 400 }} src={loginleftimg} />
          </Col>
          <Col lg={12}>
            <p
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: 600
              }}
            >
              Đăng nhập ngay
            </p>
            <LoginForm />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default LoginPage;
