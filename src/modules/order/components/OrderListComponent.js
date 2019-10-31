import React, { Component } from "react";
import { Card, Table, Tag, Button } from "antd";
import Column from "antd/lib/table/Column";
import numeral from "numeral";

export class OrderListComponent extends Component {
  renderDataSource() {
    let arr = [];
    for (let i = 0; i < 11; i++) {
      arr.push({
        id: i,
        total: 20000,
        status: "Đã thanh toán"
      });
    }
    return arr;
  }
  render() {
    return (
      <Card>
        <Table rowKey={e => e.id} dataSource={this.renderDataSource()}>
          <Column title="Mã hóa đơn" dataIndex="id"></Column>
          <Column
            title="Tổng tiền"
            dataIndex="total"
            render={value => {
              return numeral(value).format("0,0");
            }}
          ></Column>
          <Column
            title="Trạng thái"
            dataIndex="status"
            render={value => {
              return <Tag color="#07fc03">{value}</Tag>;
            }}
          ></Column>
          <Column
            title="Thao tác"
            render={() => {
              return (
                <Button type="primary" icon="edit">
                  Cập nhật bằng chứng thanh toán
                </Button>
              );
            }}
          ></Column>
        </Table>
      </Card>
    );
  }
}

export default OrderListComponent;
