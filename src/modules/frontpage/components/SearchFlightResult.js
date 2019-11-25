import React, { Component } from "react";
import { Card, Select, Col, Button, Row } from "antd";
import SearchFlyItem from "./SearchFlyItem";
import { connect } from "react-redux";
import handlers from "../../flight/handlers";
import { catchErrorAndNotification } from "../../../common/utils/Notification";
import { MODULE_NAME } from "../models";
import removeNullObject from "../../../common/utils/removeObjectNull";
import moment from "moment";

export class SearchFlightResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightFrom: [],
      flightReturn: [],
      flightItem: null,
      flightItemReturn: null
    };
    this.showFlyFrom = this.showFlyFrom.bind(this);
    this.getDataFlight = this.getDataFlight.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.chooseFlightReturn = this.chooseFlightReturn.bind(this);
    this.chooseFlight = this.chooseFlight.bind(this);
  }
  chooseFlightReturn(flightItemReturn) {
    this.setState({
      flightItemReturn:
        this.state.flightItemReturn &&
        this.state.flightItemReturn.id === flightItemReturn.id
          ? null
          : flightItemReturn
    });
  }
  chooseFlight(flightItem) {
    this.setState({
      flightItem:
        this.state.flightItem && this.state.flightItem.id === flightItem.id
          ? null
          : flightItem
    });
  }
  async componentDidMount() {
    // fetch api flight here and show
    await this.getDataFlight();
    await this.getDataFlightReturn();
    this.setState({
      flightItem: this.props.paramsRegisterFly.flight,
      flightItemReturn: this.props.paramsRegisterFly.flight_return
    });
  }
  async getDataFlight(extraParams) {
    const { paramsRegisterFly } = this.props;
    let params = {};
    if (paramsRegisterFly.start_location)
      params.start_location = JSON.parse(paramsRegisterFly.start_location).id;
    if (paramsRegisterFly.end_location)
      params.end_location = JSON.parse(paramsRegisterFly.end_location).id;
    if (paramsRegisterFly.seatClass)
      params.seat_class_id = JSON.parse(paramsRegisterFly.seatClass).id;
    if (paramsRegisterFly.quantity)
      params.quantity = paramsRegisterFly.quantity;
    if (paramsRegisterFly.flight_date)
      params.flight_date = moment(paramsRegisterFly.flight_date).format(
        "YYYY/MM/DD"
      );
    params.offset = 100; // this is the first time I do this
    params = {
      ...params,
      ...extraParams
    };
    params = removeNullObject(params);
    let result = await this.props.getListFlight(1, params);
    if (result && result.success) {
      this.setState({
        flightFrom: result.data
      });
    } else catchErrorAndNotification(result.error);
  }
  async getDataFlightReturn(extraParams) {
    const { paramsRegisterFly } = this.props;
    let params = {};
    if (paramsRegisterFly.start_location)
      params.start_location = JSON.parse(paramsRegisterFly.end_location).id;
    if (paramsRegisterFly.end_location)
      params.end_location = JSON.parse(paramsRegisterFly.start_location).id;
    if (paramsRegisterFly.seatClass)
      params.seat_class_id = JSON.parse(paramsRegisterFly.seatClass).id;
    if (paramsRegisterFly.quantity)
      params.quantity = paramsRegisterFly.quantity;
    if (paramsRegisterFly.flight_date)
      params.flight_date = moment(paramsRegisterFly.flight_date_return).format(
        "YYYY/MM/DD"
      );
    params.offset = 100; // this is the first time I do this
    params = {
      ...params,
      ...extraParams
    };
    params = removeNullObject(params);
    let result = await this.props.getListFlight(1, params);
    if (result && result.success) {
      this.setState({
        flightReturn: result.data
      });
    } else catchErrorAndNotification(result.error);
  }
  showFlyFrom() {
    let arr = [];
    const { flightFrom, flightItem } = this.state;
    const { paramsRegisterFly } = this.props;
    for (let i = 0; i < flightFrom.length; i++)
      arr.push(
        <SearchFlyItem
          active={
            flightItem && flightFrom[i].id === flightItem.id ? true : false
          }
          next={this.props.next}
          flight={flightFrom[i]}
          id={`item-fly-from-${i}`}
          key={`item-fly-${i}`}
          paramsRegisterFly={paramsRegisterFly}
          chooseFlight={this.chooseFlight}
        ></SearchFlyItem>
      );
    return arr;
  }
  showFlyTo() {
    let arr = [];
    const { flightReturn, flightItemReturn } = this.state;
    const { paramsRegisterFly } = this.props;
    for (let i = 0; i < flightReturn.length; i++)
      arr.push(
        <SearchFlyItem
          active={
            flightItemReturn && flightReturn[i].id === flightItemReturn.id
              ? true
              : false
          }
          return={true}
          next={this.props.next}
          flight={flightReturn[i]}
          id={`item-fly-return-${i}`}
          key={`item-fly-${i}`}
          paramsRegisterFly={paramsRegisterFly}
          chooseFlightReturn={this.chooseFlightReturn}
        ></SearchFlyItem>
      );
    return arr;
  }
  handleChangePrice(value) {
    this.getDataFlight({
      sort: "price",
      direction: value
    });
  }

  render() {
    console.log(this.props.paramsRegisterFly);
    const { type } = this.props.paramsRegisterFly;
    const { paramsRegisterFly } = this.props;
    const start_location = JSON.parse(paramsRegisterFly.start_location);
    const end_location = JSON.parse(paramsRegisterFly.end_location);
    console.log(paramsRegisterFly);
    const { flightFrom, flightReturn } = this.state;
    return (
      <div>
        <h5 className="font-weight-bold" style={{ margin: "20px" }}>
          Tìm chuyến bay {type === 2 ? "khứ hồi " : ""} {start_location.name} -{" "}
          {end_location.name}
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
                    {start_location.name} đến {end_location.name}
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
                    onChange={this.handleChangePrice}
                    style={{ width: 200, marginRight: 5 }}
                    placeholder="Tăng dần"
                  >
                    <Select.Option value="">Mặc định </Select.Option>
                    <Select.Option value="asc">Tăng dần </Select.Option>
                    <Select.Option value="desc">Giảm dần</Select.Option>
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
        {type === 2 ? (
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
                      {end_location.name} về {start_location.name}
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <p className="text-right">{flightReturn.length} kết quả</p>
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
        <Row>
          <Col lg={24}>
            <Button
              onClick={() =>
                this.props.next(
                  this.state.flightItem,
                  this.state.flightItemReturn
                )
              }
              type="primary"
            >
              Tiếp theo
            </Button>
          </Col>
        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchFlightResult);
