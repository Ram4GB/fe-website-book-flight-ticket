import React, { Component } from "react";
import { Row, Col, Card, notification, Alert, Button } from "antd";
import Lottie from "../../../common/libraries/Lottie";
import { connect } from "react-redux";
import handlers from "../../order/handlers";
import { catchErrorAndNotification } from "../../../common/utils/Notification";
import { withRouter } from "react-router";

export class FinishStepRegister extends Component {
  async componentDidMount() {
    const { paramsRegisterFly } = this.props;
    const {
      type,
      seatClass,
      flight,
      passengers,
      flight_return
    } = paramsRegisterFly;
    console.log(type);
    let data = {};
    if (type === 1) {
      data.seat_class_id = JSON.parse(seatClass).id;
      data.flight_id = flight.id;
      data.passengers = passengers;
    } else {
      data.seat_class_id = JSON.parse(seatClass).id;
      data.flight_id = flight.id;
      data.return_flight_id = flight_return.id;
      data.passengers = passengers;
    }
    console.log(data);
    let result = await this.props.orderTicket(data, type);
    if (result && result.success) {
      notification.success({
        message: "Bạn đã order thành công"
      });
    } else catchErrorAndNotification(result.error);
  }
  render() {
    const { paramsRegisterFly } = this.props;
    return (
      <Card>
        <Row
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
        >
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              borderRight: "1px solid #efdede"
            }}
            sm={24}
            lg={12}
          >
            <div>
              <Lottie
                options={{
                  animationData: require("../../../common/assets/animations/782-check-mark-success.json")
                }}
                style={{
                  height: 200,
                  display: "block"
                }}
              />
            </div>

            <Alert
              style={{ display: "block" }}
              message={<strong>Thông báo</strong>}
              description={
                <>
                  <p>Bạn vừa đặt thành công chuyến bay.</p>
                  <p>Tài khoản của chúng tôi: 1234567890</p>
                  <p>
                    Hãy đến ngân hàng gần nhất và cập nhật bằng chứng thanh toán
                    trong hóa đơn
                  </p>
                  <Button
                    type="primary"
                    onClick={() => this.props.history.push("/admin/order")}
                  >
                    Cập nhật ngay
                  </Button>
                </>
              }
              type="info"
              showIcon
            />
          </Col>
          <Col className="text-left" sm={24} lg={12}>
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
              <p>
                <strong style={{ textTransform: "uppercase" }}>
                  Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi
                </strong>
              </p>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...handlers(dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(FinishStepRegister));
