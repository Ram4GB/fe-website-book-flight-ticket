import React, { Component } from "react";
import { Col, Row, Button, Card } from "antd";
import uuid from "uuid";

export class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }
  showArray = () => {
    return this.state.array.map(a => {
      return (
        <Col lg={3}>
          <Card>{a.id}</Card>
        </Col>
      );
    });
  };
  render() {
    return (
      <div>
        <Row gutter={6}>
          <Button
            onClick={() => {
              this.setState({
                array: [...this.state.array, { id: uuid.v4() }]
              });
            }}
          >
            +
          </Button>
          <Button
            onClick={() => {
              this.setState({
                array: this.state.array.slice(0, this.state.array.length - 1)
              });
            }}
          >
            -
          </Button>
        </Row>
        <Row>{this.showArray()}</Row>
      </div>
    );
  }
}

export default Homepage;
