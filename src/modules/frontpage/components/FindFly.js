import React, { Component } from "react";
import { Card, Select } from "antd";
import SearchFlyItem from "./SearchFlyItem";

export class FindFly extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.showFlyFrom = this.showFlyFrom.bind(this);
  }
  componentDidMount() {
    // fetch api flight here and show
    console.log(this.props.paramsRegisterFly);
  }
  showFlyFrom() {
    let arr = [];
    for (let i = 0; i < 10; i++)
      arr.push(<SearchFlyItem id={`item-fly-from-${i}`} key={`item-fly-${i}`}></SearchFlyItem>);
    return arr;
  }
  showFlyTo() {
    let arr = [];
    for (let i = 0; i < 5; i++)
      arr.push(<SearchFlyItem id={`item-fly-to${i}`} key={`item-fly-${i}`}></SearchFlyItem>);
    return arr;
  }
  render() {
    const { type } = this.props.paramsRegisterFly;
    return (
      <div>
        <h5 className="font-weight-bold">
          Tìm chuyến bay từ Hà Nội (HAN) đến Hồ Chí Mình (SGN)
        </h5>
        <div className="row">
          <div className="col-lg-12">
            <Card
              style={{
                margin: "10px 24px",
                backgroundColor: "rgb(0, 21, 41)",
                color: "#fff"
              }}
            >
              <div
                className="row"
                style={{ borderLeft: "1px solid #fff", borderWidth: 2 }}
              >
                <div className="col-lg-6">
                  <p className="text-left font-weight-bold">CHỌN CHIỀU ĐI</p>
                  <p className="text-left">
                    Hà Nội (HAN) đến Hồ Chí Mình (SGN)
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="text-right">2 kết quả</p>
                  <p className="text-right">
                    Giá vé đã bao gồm thuế và phụ phí
                  </p>
                </div>
              </div>
            </Card>
            <Card style={{ margin: "10px 24px" }}>
              <div className="row">
                <div className="col-lg-6 text-left">
                  <span>Bộ lọc: </span>{" "}
                  <Select
                    style={{ width: 200, marginRight: 5 }}
                    placeholder="Hãng hàng không"
                  >
                    <Select.Option value="1">VietJet Air</Select.Option>
                    <Select.Option value="2">Vietnam Airline</Select.Option>
                  </Select>
                  <Select
                    style={{ width: 200, marginRight: 5 }}
                    placeholder="Hạng vé"
                  >
                    <Select.Option value="1">1</Select.Option>
                    <Select.Option value="2">2</Select.Option>
                  </Select>
                </div>
                <div className="col-lg-6 text-right">
                  <span>Giá vé: </span>{" "}
                  <Select
                    style={{ width: 200, marginRight: 5 }}
                    placeholder="Tăng dần"
                  >
                    <Select.Option value="1">Tăng dần </Select.Option>
                    <Select.Option value="2">Giảm dần</Select.Option>
                  </Select>
                </div>
              </div>
            </Card>
            <Card style={{ margin: "10px 24px" }}>
              <div className="row">
                {this.showFlyFrom()}
              </div>
            </Card>
          </div>
        </div>
        {type === 1 ? (
          <div className="row">
            <div className="col-lg-12">
              <Card
                style={{
                  margin: "10px 24px",
                  backgroundColor: "rgb(0, 21, 41)",
                  color: "#fff"
                }}
              >
                <div
                  className="row"
                  style={{ borderLeft: "1px solid #fff", borderWidth: 2 }}
                >
                  <div className="col-lg-6">
                    <p className="text-left font-weight-bold">CHỌN CHIỀU VỀ</p>
                    <p className="text-left">
                      Hà Nội (HAN) đến Hồ Chí Mình (SGN)
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <p className="text-right">2 kết quả</p>
                    <p className="text-right">
                      Giá vé đã bao gồm thuế và phụ phí
                    </p>
                  </div>
                </div>
              </Card>
              <Card style={{ margin: "10px 24px" }}>
                <div className="row">
                  <div className="col-lg-6 text-left">
                    <span>Bộ lọc: </span>{" "}
                    <Select
                      style={{ width: 200, marginRight: 5 }}
                      placeholder="Hãng hàng không"
                    >
                      <Select.Option value="1">VietJet Air</Select.Option>
                      <Select.Option value="2">Vietnam Airline</Select.Option>
                    </Select>
                    <Select
                      style={{ width: 200, marginRight: 5 }}
                      placeholder="Hạng vé"
                    >
                      <Select.Option value="1">1</Select.Option>
                      <Select.Option value="2">2</Select.Option>
                    </Select>
                  </div>
                  <div className="col-lg-6 text-right">
                    <span>Giá vé: </span>{" "}
                    <Select
                      style={{ width: 200, marginRight: 5 }}
                      placeholder="Tăng dần"
                    >
                      <Select.Option value="1">Tăng dần </Select.Option>
                      <Select.Option value="2">Giảm dần</Select.Option>
                    </Select>
                  </div>
                </div>
              </Card>
              <Card style={{ margin: "10px 24px" }}>
                <div style={{ marginRight: 0, marginLeft: 0 }} className="row">
                  {this.showFlyTo()}
                </div>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default FindFly;
