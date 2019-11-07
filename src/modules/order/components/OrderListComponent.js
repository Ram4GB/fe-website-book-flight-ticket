import React, { Component } from "react";
import { Card, Table, Tag, Button, notification, Input } from "antd";
import Column from "antd/lib/table/Column";
import numeral from "numeral";
import modal from "../../../common/components/widgets/Modal";
import OrderRejectForm from "./Form/OrderRejectForm";
import emtyImage from "../../../common/assets/images/75429684_515379449312506_5521253739740004352_n.png";

export class OrderListComponent extends Component {
  constructor(props) {
    super(props);
    this.showEvidence = this.showEvidence.bind(this);
  }
  renderDataSource() {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push({
        id: i,
        total: 20000,
        status: 1
      });
    }
    for (let i = 0; i < 5; i++) {
      arr.push({
        id: i,
        total: 20000,
        status: 0
      });
    }
    return arr;
  }
  showModalReject() {
    modal.show(<OrderRejectForm></OrderRejectForm>, {
      title: <strong>TỪ CHỐI ĐƠN HÀNG</strong>,
      width: "50%",
      style: {
        top: 20
      }
    });
  }
  showEvidence() {
    modal.show(
      <img
        alt=""
        style={{ display: "block", margin: "auto" }}
        src={emtyImage}
      />,
      {
        title: <strong>Bằng chứng thanh toán</strong>,
        style: {
          top: 20
        },
        width: "50%"
      }
    );
  }
  handleConfirm() {
    notification.success({
      message: "Xác nhận thành công"
    });
  }
  render() {
    return (
      <Card>
        <div style={{ overflow: "hidden", marginBottom: 5 }}>
          <Input.Search
            placeholder="Tìm theo mã Hóa đơn"
            style={{ float: "left", width: 200, marginRight: 15 }}
          />
          <Button
            icon="filter"
            type="primary"
            style={{ float: "right", marginLeft: 15 }}
          >
            Tìm kiếm nâng cao
          </Button>
        </div>
        <Table rowKey={e => e.id} dataSource={this.renderDataSource()}>
          <Column
            render={value => {
              return <p className="table-name">{value}</p>;
            }}
            align="center"
            title="Mã hóa đơn"
            dataIndex="id"
          ></Column>
          <Column
            title="Tổng tiền"
            dataIndex="total"
            render={value => {
              return (
                <p style={{ color: "#FFA801", fontWeight: "bold" }}>
                  {numeral(value).format("0,0")}
                </p>
              );
            }}
          ></Column>
          <Column
            title="Trạng thái"
            dataIndex="status"
            render={value => {
              return value ? (
                <Tag color="#1EDB31">Đã thanh toán</Tag>
              ) : (
                <Tag color="#678DD7">Chờ xét duyệt</Tag>
              );
            }}
          ></Column>
          <Column
            align="center"
            title="Bằng chứng thanh toán"
            render={record => {
              return (
                <p
                  onClick={this.showEvidence}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  Xem
                </p>
              );
            }}
          ></Column>
          <Column
            title="Thao tác"
            render={record => {
              return (
                <>
                  <Button
                    onClick={this.handleConfirm}
                    size="small"
                    type="primary"
                    icon="edit"
                  >
                    Xác nhận
                  </Button>{" "}
                  <Button
                    onClick={() => this.showModalReject(record.id)}
                    size="small"
                    type="danger"
                    icon="close-circle"
                  >
                    Từ chối
                  </Button>
                </>
              );
            }}
          ></Column>
        </Table>
      </Card>
    );
  }
}

export default OrderListComponent;
