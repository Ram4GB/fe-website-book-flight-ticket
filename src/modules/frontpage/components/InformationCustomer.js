import React, { Component } from "react";
import { Card, Form, Input, Icon, Col, Row, Tag, Button, Alert } from "antd";
import point from "../../../common/assets/images/01-point.png";

class InformationCustomer extends Component {
  showCustomer(count) {
    const { paramsRegisterFly } = this.props;
    const { getFieldDecorator } = this.props.form;
    let arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(
        <Row key={i} gutter={6}>
          <Col lg={12}>
            <Form.Item
              key={i}
              className="text-left"
              label={<strong>Họ và tên</strong>}
            >
              {getFieldDecorator(`passengers[${i}].name`, {
                initialValue:
                  paramsRegisterFly && paramsRegisterFly.passengers
                    ? paramsRegisterFly.passengers[i].name
                    : "",
                rules: [
                  {
                    required: true,
                    message: "Mời bạn điền tên"
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="user" />}
                  style={{ width: "100%" }}
                  placeholder="Họ và tên khách hàng"
                ></Input>
              )}
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item
              key={i}
              className="text-left"
              label={<strong>CMND</strong>}
            >
              {getFieldDecorator(`passengers[${i}].identifier`, {
                initialValue:
                  paramsRegisterFly && paramsRegisterFly.passengers
                    ? paramsRegisterFly.passengers[i].identifier
                    : "",
                rules: [
                  {
                    required: true,
                    message: "Mời bạn điền CMND"
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="code" />}
                  style={{ width: "100%" }}
                  placeholder="CMND"
                ></Input>
              )}
            </Form.Item>
          </Col>
        </Row>
      );
    }
    return arr;
  }
  render() {
    const { paramsRegisterFly, user } = this.props;
    const customer = user && user.Customer ? user.Customer : null;
    const { getFieldDecorator } = this.props.form;
    const { count } = this.props.paramsRegisterFly;
    return (
      <Card>
        <h5 className="font-weight-bold">
          Tìm chuyến bay từ Hà Nội (HAN) đến Hồ Chí Mình (SGN)
        </h5>
        <div className="row">
          <div className="col-lg-12 card-step-1">
            <div
              style={{
                marginBottom: 10
              }}
              className="card border border-primary p-3"
            >
              <div className="flex-direction-column row align-items-center d-flex flex-lg-row flex-md-column flex-sm-column">
                <div
                  className="flex-direction-column col d-flex"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <p className="font-weight-bold">Hà Nội</p>
                    <Tag>21:15, 12/11/2019</Tag>
                    <p className="strong">Sân bay Hà nội</p>
                  </div>
                  <div>
                    <p>1h</p>
                    <img alt="" src={point} />
                  </div>
                  <div>
                    <p className="font-weight-bold">Hồ Chí Minh</p>
                    <Tag>21:15, 12/11/2019</Tag>
                    <p className="strong">Sân bay Tân Sơn Nhất</p>
                  </div>
                </div>
                <div className="col">
                  <p className="strong">Loại vé:</p>
                  <p>{JSON.parse(paramsRegisterFly.seatClass).name}</p>
                </div>
                <div className="col">
                  <p className="strong">Số lượng:</p>
                  <p>2</p>
                </div>
                <div className="col">
                  <p className="strong">Giá vé:</p>
                  <p>200.000đ</p>
                </div>
                <div className="col">
                  <p className="font-weight-bold strong">Tổng cộng</p>
                  <p>400.000đ</p>
                </div>
              </div>
              <div className="row">
                <div className="strong col-lg-12 text-right">
                  Số tiền bạn phải trả:{" "}
                  <span
                    className="font-weight-bold"
                    style={{ color: "#FFA801" }}
                  >
                    400.000đ
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row d-flex" style={{ justifyContent: "center" }}>
              <div className="col-lg-6">
                <Card title={<strong>THÔNG TIN KHÁCH HÀNG</strong>}>
                  <Form style={{ margin: 20 }}>{this.showCustomer(count)}</Form>
                </Card>
              </div>
              <div className="col-lg-6">
                <Card title={<strong>THÔNG TIN NGƯỜI ĐẶT</strong>}>
                  <p className="text-left font-weight-bold">
                    Fly now liên hệ vé theo thông tin người đặt
                  </p>
                  <Form>
                    {customer ? (
                      <>
                        <Form.Item
                          className="text-left"
                          label={<strong>Họ và tên</strong>}
                        >
                          {getFieldDecorator("fullname_customer_book", {
                            initialValue: customer ? customer.name : ""
                          })(
                            <Input
                              disabled
                              prefix={<Icon type="user" />}
                              style={{ width: "100%" }}
                            ></Input>
                          )}
                        </Form.Item>
                        <Form.Item
                          className="text-left"
                          label={<strong>Email</strong>}
                        >
                          {getFieldDecorator("email_customer_book", {
                            initialValue: customer ? customer.email : ""
                          })(
                            <Input
                              disabled
                              prefix={<Icon type="mail" />}
                              style={{ width: "100%" }}
                            ></Input>
                          )}
                        </Form.Item>
                        <Form.Item
                          className="text-left"
                          label={<strong>Số điện thoại</strong>}
                        >
                          {getFieldDecorator("phonenumber_customer_book", {
                            initialValue: customer ? customer.phone : ""
                          })(
                            <Input
                              disabled
                              prefix={<Icon type="phone" />}
                              style={{ width: "100%" }}
                            ></Input>
                          )}
                        </Form.Item>
                      </>
                    ) : (
                      <Alert
                        style={{ margin: "20px 0px" }}
                        message={<strong>Cảnh bảo</strong>}
                        description={
                          <>
                            <p>Bạn chưa đăng nhập vào hệ thống</p>
                            <Button
                              type="ghost"
                              onClick={() => this.props.history.push(`/login`)}
                            >
                              Đăng nhập
                            </Button>
                          </>
                        }
                        type="warning"
                        showIcon
                      />
                    )}
                    {/* <Row>
                      <Button
                        style={{ width: "80%" }}
                        type="primary"
                        onClick={() => this.props.next()}
                        size="large"
                      >
                        BƯỚC TIẾP THEO
                      </Button>
                    </Row> */}
                  </Form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default InformationCustomer;
