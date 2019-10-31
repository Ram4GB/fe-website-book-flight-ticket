import React, { Component } from "react";
import { Card, Form, Input, Icon } from "antd";
import point from "../../../common/assets/images/01-point.png";

class InformationCustomer extends Component {
  showCustomer(count) {
    const { getFieldDecorator } = this.props.form;
    let arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(
        <Form.Item key={i} className="text-left" label={`Khách hàng ${i + 1}`}>
          {getFieldDecorator(`customers[${i}]`)(
            <Input
              prefix={<Icon type="user" />}
              style={{ width: "100%" }}
              placeholder="Họ và tên khách hàng"
            ></Input>
          )}
        </Form.Item>
      );
    }
    return arr;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { count } = this.props.paramsRegisterFly;
    return (
      <Card>
        <h5 className="font-weight-bold">
          Tìm chuyến bay từ Hà Nội (HAN) đến Hồ Chí Mình (SGN)
        </h5>
        <div className="row">
          <div className="col-lg-12">
            <div
              style={{
                marginBottom: 10
              }}
              className="card border border-primary p-3"
            >
              <div className="row align-items-center d-flex flex-lg-row flex-md-column flex-sm-column">
                <div
                  className="col d-flex"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <p className="font-weight-bold">Hà Nội</p>
                    <p>21:15, 12/11/2019</p>
                    <p>Sân bay Hà nội</p>
                  </div>
                  <div>
                    <p>1h</p>
                    <img alt="" src={point} />
                  </div>
                  <div>
                    <p className="font-weight-bold">Hồ Chí Minh</p>
                    <p>21:15, 12/11/2019</p>
                    <p>Sân bay Tân Sơn Nhất</p>
                  </div>
                </div>
                <div className="col">
                  <p>Loại vé:</p>
                  <p>Vé loại 1</p>
                </div>
                <div className="col">
                  <p>Số lượng:</p>
                  <p>2</p>
                </div>
                <div className="col">
                  <p>Giá vé:</p>
                  <p>200.000đ</p>
                </div>
                <div className="col">
                  <p className="font-weight-bold">Tổng cộng</p>
                  <p>400.000đ</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 text-right">
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
                <Card title="THÔNG TIN KHÁCH HÀNG">
                  <Form style={{ margin: 20 }}>{this.showCustomer(count)}</Form>
                </Card>
              </div>
              <div className="col-lg-6">
                <Card title="THÔNG TIN NGƯỜI ĐẶT">
                  <p className="text-left font-weight-bold">
                    Fly now liên hệ vé theo thông tin người đặt
                  </p>
                  <Form>
                    <Form.Item className="text-left" label="Họ và tên">
                      {getFieldDecorator("fullname_customer_book")(
                        <Input
                          prefix={<Icon type="user" />}
                          style={{ width: "100%" }}
                        ></Input>
                      )}
                    </Form.Item>
                    <Form.Item className="text-left" label="Email">
                      {getFieldDecorator("email_customer_book")(
                        <Input
                          prefix={<Icon type="mail" />}
                          style={{ width: "100%" }}
                        ></Input>
                      )}
                    </Form.Item>
                    <Form.Item className="text-left" label="Số điện thoại">
                      {getFieldDecorator("phonenumber_customer_book")(
                        <Input
                          prefix={<Icon type="phone" />}
                          style={{ width: "100%" }}
                        ></Input>
                      )}
                    </Form.Item>
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
