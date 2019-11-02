import React, { Component } from "react";
import {
  Card,
  Typography,
  Form,
  Row,
  Col,
  Input,
  TimePicker,
  Button,
  InputNumber
} from "antd";
import CustomBreadcrumb from "../common/components/widgets/CustomBreadcrumb";

export class FlightAddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        console.log(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <CustomBreadcrumb
          items={[
            { url: "/admin/dashboard", icon: "home", title: "Bảng điều khiển" },
            {
              url: "/admin/flight",
              icon: "rocket",
              title: "Chuyến bay"
            },
            {
              url: "/admin/flight/create",
              icon: "rocket",
              title: "Tạo chuyến bay"
            }
          ]}
        ></CustomBreadcrumb>
        <Card
          title={<Typography.Title level={4}>Thêm chuyến bay</Typography.Title>}
        >
          <Form onSubmit={this.handleSubmit}>
            <Typography.Title level={4}>Nhập thông tin</Typography.Title>
            <Row gutter={15}>
              <Col lg={8}>
                <Form.Item label="Chọn hãng hàng không">
                  {getFieldDecorator("airline", {
                    rules: [
                      { message: "Mời chọn hãng hàng không", required: true }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item label="Chọn điểm đi">
                  {getFieldDecorator("from", {
                    rules: [{ message: "Mời chọn điểm đi", required: true }]
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item label="Chọn điểm đến">
                  {getFieldDecorator("to", {
                    rules: [{ message: "Mời chọn điểm đến", required: true }]
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={15}>
              <Col lg={8}>
                <Form.Item label="Chọn thời gian bắt đầu">
                  {getFieldDecorator("timeStart", {
                    rules: [
                      { message: "Mời chọn thời gian bắt đầu", required: true }
                    ]
                  })(<TimePicker format={"HH:ss"} style={{ width: "100%" }} />)}
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item label="Chọn thời gian bay">
                  {getFieldDecorator("timeEnd", {
                    rules: [
                      { message: "Mời chọn thời gian bay", required: true }
                    ]
                  })(<TimePicker format={"HH:ss"} style={{ width: "100%" }} />)}
                </Form.Item>
              </Col>
            </Row>
            <Typography.Title level={4}>Nhập số lượng ghế</Typography.Title>
            <Row gutter={15}>
              <Col lg={8}>
                <Form.Item label="Chọn số lượng ghế hạng 1">
                  {getFieldDecorator("level1", {
                    rules: [
                      {
                        message: "Mời chọn số lượng ghế hạng 1",
                        required: true
                      }
                    ]
                  })(<InputNumber />)}
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item label="Chọn số lượng ghế hạng 2">
                  {getFieldDecorator("level2", {
                    rules: [
                      {
                        message: "Mời chọn số lượng ghế hạng 2",
                        required: true
                      }
                    ]
                  })(<InputNumber />)}
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item label="Chọn số lượng ghế hạng 3">
                  {getFieldDecorator("level3", {
                    rules: [
                      {
                        message: "Mời chọn số lượng ghế hạng 3",
                        required: true
                      }
                    ]
                  })(<InputNumber />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col lg={24} style={{ textAlign: "right" }}>
                <Button>HỦY</Button>{" "}
                <Button htmlType="submit" type="primary">
                  TẠO MỚI
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </>
    );
  }
}

export default Form.create({ name: "form-add-flight" })(FlightAddPage);
