import React, { Component } from "react";
import { Row, Col, Card, Avatar, Typography, Descriptions } from "antd";
import { emptyString } from "../models";

export class InformationUserComponent extends Component {
  getUser(user) {
    if (user.Admin) return user.Admin;
    if (user.Staff) return user.Staff;
  }
  render() {
    let { user } = this.props;
    user = this.getUser(user);
    console.log(user);
    return (
      <Row style={{ display: "flex" }} gutter={5}>
        {user ? (
          <>
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
                    {user.name ? user.name : emptyString}
                  </Descriptions.Item>
                  <Descriptions.Item label={<strong>CMND</strong>}>
                    {user.identifier ? user.identifier : emptyString}
                  </Descriptions.Item>
                  <Descriptions.Item label={<strong>SDT</strong>}>
                    {user.phone ? user.phone : emptyString}
                  </Descriptions.Item>
                  <Descriptions.Item label={<strong>Email</strong>}>
                    {user.email ? user.email : emptyString}
                  </Descriptions.Item>
                  <Descriptions.Item label={<strong>Địa chỉ</strong>}>
                    {user.address ? user.address : emptyString}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </>
        ) : null}
      </Row>
    );
  }
}

export default InformationUserComponent;
