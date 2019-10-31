import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import Lottie from "../../../common/libraries/Lottie";

export class FinishStepRegister extends Component {
  componentDidMount() {
    console.log(this.props.paramsRegisterFly);
  }
  render() {
    const { paramsRegisterFly } = this.props;
    return (
      <Card>
        <Row>
          <Col
            style={{ display: "flex", alignItems: "center" }}
            sm={24}
            lg={12}
          >
            <Lottie
              options={{
                animationData: require("../../../common/assets/animations/782-check-mark-success.json")
              }}
              style={{
                marginBottom: 150,
                height: 200
              }}
            />
          </Col>
          <Col className="text-left border" sm={24} lg={12}>
            <div className="p-3">
              <span className="font-weight-bold">Khách hàng: </span>
              <span>
                {paramsRegisterFly.fullname_customer_book || "Nguyễn Văn Tèo"}
              </span>
            </div>
            <div className="p-3">
              <span className="font-weight-bold">Email: </span>
              <span>
                {paramsRegisterFly.email_customer_book || "teonguyen@gmail.com"}
              </span>
            </div>
            <div className="p-3">
              <span className="font-weight-bold">Số điện thoại: </span>
              <span>
                {paramsRegisterFly.phonenumber_customer_book || "012456789"}
              </span>
            </div>
            <div className="p-3">
              <span className="font-weight-bold">Thành tiền: </span>
              <span className="font-weight-bold" style={{ color: "#FFA801" }}>
                400.000đ
              </span>
            </div>
            <div className="p-3 text-center">
              <p>Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi</p>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default FinishStepRegister;
