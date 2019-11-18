import React, { Component } from "react";
import { Card, Select } from "antd";
import SearchFlyItem from "./SearchFlyItem";
import { connect } from "react-redux";
import handlers from "../../flight/handlers";
import { catchErrorAndNotification } from "../../../common/utils/Notification";
import { MODULE_NAME } from "../models";

export class FindFly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightFrom: []
    };
    this.showFlyFrom = this.showFlyFrom.bind(this);
    this.getDataFlight = this.getDataFlight.bind(this);
  }
  async componentDidMount() {
    // fetch api flight here and show
    console.log(this.props.paramsRegisterFly);
    await this.getDataFlight();
  }
  async getDataFlight() {
    let result = await this.props.getListFlight();
    if (result && result.success) {
      this.setState({
        flightFrom: result.data
      });
    } else catchErrorAndNotification(result.error);
  }
  showFlyFrom() {
    let arr = [];
    const { flightFrom } = this.state;
    const { paramsRegisterFly } = this.props;
    for (let i = 0; i < flightFrom.length; i++)
      arr.push(
        <SearchFlyItem
          next={this.props.next}
          flight={flightFrom[i]}
          id={`item-fly-from-${i}`}
          key={`item-fly-${i}`}
          paramsRegisterFly={paramsRegisterFly}
        ></SearchFlyItem>
      );
    return arr;
  }
  showFlyTo() {
    let arr = [];
    for (let i = 0; i < 5; i++)
      arr.push(
        <SearchFlyItem
          id={`item-fly-to${i}`}
          key={`item-fly-${i}`}
        ></SearchFlyItem>
      );
    return arr;
  }
  render() {
    const { type } = this.props.paramsRegisterFly;
    const { paramsRegisterFly } = this.props;
    const { flightFrom } = this.state;
    return (
      <div>
        <h5 className="font-weight-bold">
          Tìm chuyến bay từ {paramsRegisterFly.from} đến {paramsRegisterFly.to}
        </h5>
        <div className="row">
          <div className="col-lg-12">
            <Card
              className="fix-card"
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
                    {paramsRegisterFly.from} đến {paramsRegisterFly.to}
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="text-right">{flightFrom.length} kết quả</p>
                  <p className="text-right">
                    Giá vé đã bao gồm thuế và phụ phí
                  </p>
                </div>
              </div>
            </Card>
            <Card className="fix-card" style={{ margin: "10px 24px" }}>
              <div className="row">
                <div className="col-lg-6 text-align-left">
                  <span>
                    <strong className="text">Bộ lọc: </strong>{" "}
                  </span>{" "}
                  <Select
                    style={{ width: 200, marginRight: 5, marginTop: 5 }}
                    placeholder="Hãng hàng không"
                  >
                    <Select.Option value="1">VietJet Air</Select.Option>
                    <Select.Option value="2">Vietnam Airline</Select.Option>
                  </Select>
                  <Select
                    style={{ width: 200, marginRight: 5, marginTop: 5 }}
                    placeholder="Hạng vé"
                  >
                    <Select.Option value="1">1</Select.Option>
                    <Select.Option value="2">2</Select.Option>
                  </Select>
                </div>
                <div className="col-lg-6 text-align-right">
                  <span>
                    <strong className="text">Giá vé: </strong>{" "}
                  </span>{" "}
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
            <Card
              className="fix-card card-step"
              style={{ margin: "10px 24px" }}
            >
              <div className="row">{this.showFlyFrom()}</div>
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

const mapStateToProps = state => {
  return {
    paramsRegisterFly: state[MODULE_NAME].paramsRegisterFly
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...handlers(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindFly);
