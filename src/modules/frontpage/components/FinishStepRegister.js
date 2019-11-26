import React, { Component } from "react";
import { Row, Col, Card, notification, Alert, Button } from "antd";
import Lottie from "../../../common/libraries/Lottie";
import { connect } from "react-redux";
import handlers from "../../order/handlers";
import { catchErrorAndNotification } from "../../../common/utils/Notification";
import { withRouter } from "react-router";

export class FinishStepRegister extends Component {
  state = {
    order: null,
    isSuccess: false
  };

  async componentDidMount() {
    const { paramsRegisterFly } = this.props;
    const {
      type,
      seatClass,
      flight,
      passengers,
      flight_return
    } = paramsRegisterFly;
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
    let result = await this.props.orderTicket(data, type);
    if (result && result.success) {
      console.log("Ninh Debug: result", result);
      this.setState({ order: result, isSuccess: true });
      notification.success({
        message: "Bạn đã order thành công"
      });
    } else {
      catchErrorAndNotification(result.error);
      this.setState({ isSuccess: false });
    }
  }
  render() {
    const { isSuccess } = this.state;

    if (!isSuccess) {
      return (
        <div>
          <Lottie
            options={{
              animationData: require("../../../common/assets/animations/4970-unapproved-cross.json"),
              loop: false
            }}
            style={{
              height: 200,
              display: "block"
            }}
          />
          <h4>Thất bại!</h4>
        </div>
      );
    }

    return (
      <Card>
        <Row
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
        >
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column"
            }}
            sm={24}
            lg={12}
          >
            <div>
              <Lottie
                options={{
                  animationData: require("../../../common/assets/animations/782-check-mark-success.json"),
                  loop: false
                }}
                style={{
                  height: 200,
                  display: "block"
                }}
              />
            </div>
            <Alert
              style={{ display: "block", paddingRight: 40 }}
              message={<strong className="text-left">Thành công</strong>}
              description={
                <div>
                  <p className="text-left">
                    Quý khách có thể thanh toán cho chúng tôi bằng cách chuyển
                    khoản <b>tại ngân hàng</b>, chuyển khoản qua <b>thẻ ATM</b>{" "}
                    hoặc qua <b>Internet Banking</b>.
                  </p>
                  <p className="text-left">
                    <b>
                      *Lưu ý: Sau khi thanh toán, quý khách hãy cập nhật bằng
                      chứng thanh toán (Biên lai, giấy tờ liên quan...)
                    </b>
                  </p>
                  <Button
                    type="primary"
                    onClick={() => this.props.history.push("/admin/order")}
                  >
                    Cập nhật bằng chứng thanh toán
                  </Button>
                </div>
              }
              type="success"
              showIcon
            />
          </Col>
          {/* <Col className="text-left" sm={24} lg={12}>
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
           */}
          <Col
            style={{ padding: "0 30px" }}
            className="text-left"
            sm={24}
            lg={12}
          >
            <Card>
              <h3>Thông tin chuyển khoản</h3>
              <table className="bankInfo table table-responsive">
                <tbody>
                  <tr>
                    <td style={{ width: 120 }}>Ngân hàng</td>
                    <td className="bankname">Ngân hàng đầu tư và phát triển</td>
                  </tr>
                  <tr>
                    <td>Chi nhánh</td>
                    <td className="branch">Chi nhánh Chương Dương</td>
                  </tr>
                  <tr>
                    <td>Tên người hưởng</td>
                    <td className="accountname">
                      CÔNG TY CỔ PHẦN CỔNG THÔNG MINH (Tên cũ: Công ty TNHH
                      SMARTADV)
                    </td>
                  </tr>
                  <tr>
                    <td>Số tài khoản</td>
                    <td className="accountno">12810000058586</td>
                  </tr>
                  <tr>
                    <td>Số tiền</td>
                    <td>11.644.000 ₫</td>
                  </tr>
                  <tr>
                    <td>Nội dung</td>
                    <td>MDH 0645302569</td>
                  </tr>
                </tbody>
              </table>
            </Card>
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
