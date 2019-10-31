import React, { Component } from "react";
import { Row, Col, Card, Avatar, Typography, Descriptions } from "antd";

export class InformationUserComponent extends Component {
  render() {
    const { user } = this.props;
    return (
      <Row style={{ display: "flex" }} gutter={5}>
        <Col lg={7}>
          <Card style={{ height: "100%" }}>
            <div>
              <Avatar
                style={{
                  width: "100%",
                  height: 200,
                  maxWidth: 200,
                  minWidth: 200,
                  display: "block",
                  margin: "auto"
                }}
              />
            </div>
            <Typography.Title
              style={{ textAlign: "center", marginTop: 8 }}
              level={3}
            >
              Nguyễn Văn A
            </Typography.Title>
          </Card>
        </Col>
        <Col lg={17}>
          <Card
            title={<strong>Thông tin cá nhân</strong>}
            style={{ height: "100%" }}
          >
            <Descriptions column={1} bordered>
              <Descriptions.Item label={<strong>Họ và tên</strong>}>
                Nguyễn Văn A
              </Descriptions.Item>
              <Descriptions.Item label={<strong>CMND</strong>}>
                0123456789
              </Descriptions.Item>
              <Descriptions.Item label={<strong>SDT</strong>}>
                0123456789
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Email</strong>}>
                antd@gmail.com
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Địa chỉ</strong>}>
                TP Hồ Chí Minh
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default InformationUserComponent;
