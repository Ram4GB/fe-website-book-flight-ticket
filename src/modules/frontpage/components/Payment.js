import React, { Component } from "react";
import { Card, Tag } from "antd";
import point from "../../../common/assets/images/01-point.png";

export class Payment extends Component {
  render() {
    return (
      <Card>
        <h5 className="font-weight-bold">
          Tìm chuyến bay từ Hà Nội (HAN) đến Hồ Chí Mình (SGN)
        </h5>
        <div className="row">
          <div className="col-lg-12 card-step-1">
            <div
              style={{
                marginBottom: 10
              }}
              className="card border border-primary p-3"
            >
              <div className="flex-direction-column row align-items-center d-flex flex-lg-row flex-md-column flex-sm-column">
                <div
                  className="flex-direction-column col d-flex"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <p className="font-weight-bold strong">Hà Nội</p>
                    <Tag>21:15, 12/11/2019</Tag>
                    <p className="strong">Sân bay Hà nội</p>
                  </div>
                  <div>
                    <p className="strong">1h</p>
                    <img alt="" src={point} />
                  </div>
                  <div>
                    <p className="font-weight-bold strong">Hồ Chí Minh</p>
                    <Tag>21:15, 12/11/2019</Tag>
                    <p className="strong">Sân bay Tân Sơn Nhất</p>
                  </div>
                </div>
                <div className="col">
                  <p className="strong">Loại vé:</p>
                  <p>Vé loại 1</p>
                </div>
                <div className="col">
                  <p className="strong">Số lượng:</p>
                  <p>2</p>
                </div>
                <div className="col">
                  <p className="strong">Giá vé:</p>
                  <p>200.000đ</p>
                </div>
                <div className="col">
                  <p className="font-weight-bold strong">Tổng cộng</p>
                  <p>400.000đ</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 text-right strong">
                  Số tiền bạn phải trả:{" "}
                  <span
                    className="font-weight-bold strong"
                    style={{ color: "#FFA801" }}
                  >
                    400.000đ
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row text-left m-0">
              <div className="col-lg-6 card">
                <div className="row p-4">
                  <div className="col-lg-12">
                    <strong className="strong">CHUYỂN KHOẢN NGÂN HÀNG</strong>
                  </div>
                </div>
                <div className="row p-4">
                  <div className="col-lg-4 strong">Ngân hàng</div>
                  <div className="col-lg-8">Ngân hàng đầu tư và phát triển</div>
                </div>
                <div className="row p-4">
                  <div className="col-lg-4 strong">Chi nhánh</div>
                  <div className="col-lg-8">Chi nhánh Chương Dương</div>
                </div>
                <div className="row p-4">
                  <div className="col-lg-4 strong">Tên người hưởng</div>
                  <div className="col-lg-8">CÔNG TY CỔ PHẦN THÔNG MINH</div>
                </div>
                <div className="row p-4">
                  <div className="col-lg-4 strong">Số tài khoản</div>
                  <div className="col-lg-8">01234567890</div>
                </div>
                <div className="row p-4">
                  <div className="col-lg-4 strong">Nội dung</div>
                  <div className="col-lg-8">DH 01234567</div>
                </div>
              </div>
              <div className="col-lg-6 card">
                <div className="row p-4">
                  <div className="col-lg-12">
                    <p>
                      <strong className="strong">BẰNG CHỨNG THANH TOÁN</strong>
                    </p>
                  </div>
                </div>
                <div className="row p-4">
                  <div className="col-lg-12">
                    <img
                      alt=""
                      className="d-block m-auto evidence-img"
                      src="https://scontent-sin2-2.xx.fbcdn.net/v/t1.15752-9/75429332_531840240939716_7679763762789744640_n.png?_nc_cat=108&_nc_oc=AQkyRMDjw6Mkvpu8bQ2Eq3ntycwudB8UjS8P_WXgnCMYDMq1y4LjBqaT7eN1zrB3oDU&_nc_ht=scontent-sin2-2.xx&oh=72cdcc4631c99d45bbe76c8dbf6458e3&oe=5E2302BC"
                    />
                  </div>
                </div>
                <div className="row p-4">
                  <div className="col-lg-12 text-center">
                    {/* <Upload>
                      <Button style={{ width: "80%" }}>
                        <Icon type="upload" /> Bâm để tải lên Bằng chứng thanh
                        toán
                      </Button>
                    </Upload> */}
                    {/* <Button
                      type="primary"
                      onClick={() => this.props.next()}
                      size="large"
                    >
                      BƯỚC TIẾP THEO
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default Payment;
