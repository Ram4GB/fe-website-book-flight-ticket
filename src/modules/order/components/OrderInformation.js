import React, { Component } from "react";
import { Card, Tag } from "antd";
import { catchErrorAndNotification } from "../../../common/utils/Notification";
import OrderItem from "./OrderItem";
import { emptyString, COLOR_REJECT_CONTENT } from "../models";
import moment from "moment";
import numeral from "numeral";
import Modal from "../../../common/components/widgets/Modal";
import { DEFAULT_URL } from "../../../common/url";

export class OrderInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
      loading: false
    };
    this.getOrderById = this.getOrderById.bind(this);
  }
  async getOrderById() {
    this.setState({
      loading: true
    });
    let result = await this.props.getOrderByID(this.props.match.params.id);
    if (result && result.success) {
      this.setState({
        order: result.orders,
        loading: false
      });
    } else catchErrorAndNotification(result.error);
  }
  async componentDidMount() {
    await this.getOrderById();
  }
  getPersonApprove(approve_person) {
    if (approve_person) {
      if (approve_person.Admin) return approve_person.Admin;
      else if (approve_person.Staff) return approve_person.Staff;
    } else return null;
  }
  showTicket() {
    const { order } = this.state;
    return order
      ? order.Tickets.map(item => {
          return <OrderItem ticket={item}></OrderItem>;
        })
      : null;
  }
  showEvidence(imgSource) {
    Modal.show(
      <img alt="" src={`${DEFAULT_URL}/${imgSource}`} className="evidence" />,
      {
        title: <strong>Bằng chứng thanh toán</strong>,
        style: { top: 20 },
        width: "80%"
      }
    );
  }
  render() {
    const { order, loading } = this.state;
    let Customer = {};
    let approve_person = {};
    if (order) {
      Customer = order.Customer;
      approve_person = this.getPersonApprove(order.approve_person);
    }
    console.log(Customer);
    return (
      <Card
        loading={loading}
        title={
          <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
            Chi tiết hóa đơn - {order && order.code ? order.code : null}
          </p>
        }
      >
        {order && Customer ? (
          <>
            <div className="d-flex flex-column flex-lg-row flex-wrap">
              <div className="d-flex flex-column flex-lg-row align-items-center col-lg-4 col-md-12 col-xs-12">
                <img
                  alt=""
                  src="https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_male-512.png"
                  style={{ width: 200, height: 200 }}
                />
                <div>
                  <p>
                    <span className="strong">Khách hàng: </span> {Customer.name}
                  </p>
                  <p>
                    <span className="strong">CNND: </span> {Customer.identifier}
                  </p>
                  <p>
                    <span className="strong">Số điện thoại: </span>{" "}
                    {Customer.phone ? Customer.phone : emptyString}
                  </p>
                </div>
              </div>
              <div className="d-flex border-left align-items-center col-lg-4 col-md-12 col-xs-12">
                <div>
                  <p>
                    <span className="strong">Ngày đặt: </span>
                    {moment(order.createdAt).format("DD/MM/YYYY")} -{" "}
                    {moment(order.createdAt).format("HH:mm a")}
                  </p>
                  <p>
                    <span className="strong">Tổng số vé: </span>
                    {order.Tickets.length}
                  </p>
                  <p>
                    <span className="strong">Trạng thái: </span>
                    {order.status === "New" ? (
                      <Tag color={COLOR_REJECT_CONTENT.New}>
                        Cần update bằng chứng
                      </Tag>
                    ) : order.status === "Approved" ? (
                      <Tag color={COLOR_REJECT_CONTENT.Approved}>
                        Đã thanh toán
                      </Tag>
                    ) : order.status === "Rejected" ? (
                      <>
                        <Tag color={COLOR_REJECT_CONTENT.Rejected}>Đã hủy</Tag>
                      </>
                    ) : order.status === "Verifying" ? (
                      <Tag color={COLOR_REJECT_CONTENT.Verifying}>
                        Đã cập nhật bằng chứng thanh toán
                      </Tag>
                    ) : null}
                  </p>
                  {order && order.transfer_content ? (
                    <p>
                      <span className="strong">Bằng chứng thanh toán: </span>
                      <span
                        onClick={() =>
                          this.showEvidence(order.transfer_content)
                        }
                        className="link"
                      >
                        Xem chi tiết
                      </span>
                    </p>
                  ) : null}
                  {order && order.reject_reason ? (
                    <p>
                      <span className="strong">Lý do hủy: </span>
                      {order.reject_reason}
                    </p>
                  ) : null}
                  <p>
                    <span className="strong">Tổng tiền: </span>
                    {numeral(order.total_price).format("0,0")}đ
                  </p>
                </div>
              </div>
              {approve_person ? (
                <div className="d-flex border-left align-items-center col-lg-4 col-md-12 col-xs-12">
                  <div>
                    <p>
                      <span className="strong">
                        Được thực hiện bởi nhân viên:{" "}
                      </span>
                      {approve_person.name ? approve_person.name : emptyString}
                    </p>
                    <p>
                      <span className="strong">SDT: </span>
                      {approve_person.phone
                        ? approve_person.phone
                        : emptyString}
                    </p>
                    <p>
                      <span className="strong">CMND: </span>
                      {approve_person.identifier
                        ? approve_person.identifier
                        : emptyString}
                    </p>
                    <p>
                      <span className="strong">Email: </span>
                      {approve_person.email
                        ? approve_person.email
                        : emptyString}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="mt-3">{this.showTicket()}</div>
          </>
        ) : null}
      </Card>
    );
  }
}

export default OrderInformation;
