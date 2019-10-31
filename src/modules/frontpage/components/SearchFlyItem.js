import React, { Component } from "react";
import point from "../../../common/assets/images/01-point.png";
import { Button } from "antd";

export class SearchFlyItem extends Component {
  render() {
    const { id } = this.props;
    return (
      <div className="col-lg-12 pt-3">
        <div style={{ cursor: "pointer" }} className="card">
          <div
            style={{ color: "#6A6A6A" }}
            className="p-3 align-items-center d-flex flex-md-column flex-sm-column flex-column flex-lg-row"
          >
            <div className="col d-flex flex-md-column flex-sm-column flex-column flex-lg-row">
              <img
                alt="flight"
                style={{ width: 50, height: 50 }}
                src="https://media.gettyimages.com/photos/road-trip-picture-id846454370?s=612x612"
              />
              <span>Vietjet Air</span>
            </div>
            <div className="col">
              <p className="font-weight-bold">21:15</p>
              <p>Hà Nội</p>
            </div>
            <div className="col">
              <p className="text-center">1h</p>
              <img alt="flight" src={point} />
            </div>
            <div className="col">
              <p className="text-center font-weight-bold">22:15</p>
              <p className="text-center">Hồ Chí Minh</p>
            </div>
            <div className="col">
              <p
                data-toggle="collapse"
                href={`#${id}`}
                style={{ color: "#4469B0" }}
              >
                Xem chi tiết
              </p>
            </div>
            <div className="col">
              <p className="font-weight-bold" style={{ color: "#FFA801" }}>
                200.000đ
              </p>
            </div>
            <div className="col">
              <Button size="large" type="primary" shape="round">
                CHỌN
              </Button>
            </div>
          </div>
          <div
            className="row border-top"
            style={{ marginRight: 0, marginLeft: 0 }}
          >
            <div
              id={id}
              className="col collapse multi-collapse"
            >
              <div className="d-flex p-3 justify-content-center">
                <div className="m-auto d-flex align-items-center justify-content-between">
                  <div>
                    <p className="font-weight-bold">Hà Nội</p>
                    <p>21:15, 12/11/2019</p>
                    <p>Sân Bay Nội Bài</p>
                  </div>
                  <div>
                    <img
                      alt='point'
                      style={{ paddingBottom: 10, paddingLeft: 7 }}
                      src={point}
                    />
                  </div>
                  <div>
                    <p className="font-weight-bold">Hồ Chí Minh</p>
                    <p>21:15, 12/11/2019</p>
                    <p>Sân Bay Tân Sơn Nhất</p>
                  </div>
                </div>
                <div className="border-left p-5">
                  <p>Loại vé:</p>
                  <p>Vé loại 1</p>
                </div>
                <div className="border-left p-5">
                  <p>Số lượng:</p>
                  <p>2</p>
                </div>
                <div className="border-left p-5">
                  <p>Giá vé:</p>
                  <p>200.000đ</p>
                </div>
                <div className="border-left p-5">
                  <p className="font-weight-bold">Tổng cộng</p>
                  <p>400.000đ</p>
                </div>
              </div>
              <div>
                <p className="font-weight-bold text-right">
                  Số tiền bạn phải trả:{" "}
                  <span
                    className="font-weight-bold"
                    style={{ color: "#FFA801" }}
                  >
                    400.000đ
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFlyItem;
