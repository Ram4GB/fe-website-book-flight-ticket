import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Layout, Row, Col, Input, Icon, notification } from "antd";
// import logo from "../assets/images/logo.png";
// import logofooter from "../assets/images/logo-footer.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import handlers from "../../modules/user/handlers";
import { MODULE_NAME as MODULE_USER } from "../../modules/user/models";
// import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";
import "../../style.scss";

const { Footer } = Layout;
export class MainLayoutFrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = { path: "" };
    this.logout = this.logout.bind(this);
  }
  async logout() {
    await this.props.logout();
    notification.success({
      message: "Đăng xuất thành công"
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }
  componentDidMount() {}
  UNSAFE_componentWillReceiveProps() {
    let path = this.props.history.location.pathname;
    this.setState({
      path
    });
  }
  render() {
    const { user } = this.props;
    const { path } = this.state;
    return (
      <Layout className="use-bootstrap">
        <nav
          style={{
            backgroundColor: "#001529",
            color: "#fff",
            padding: "8px 50px"
          }}
          className="navbar navbar-expand-lg navbar-dark"
        >
          <a className="navbar-brand" href="/#">
            <img
              style={{ width: 100, height: "auto" }}
              alt="logo"
              src="https://res.flynow.vn/logoflynow.png"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav ml-auto">
              {_.isEmpty(user) === false ? null : (
                <>
                  <li
                    className={`nav-item ${
                      path === "/login" ? "active" : null
                    }`}
                  >
                    <Link className="nav-link" to="/login">
                      Đăng nhập <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      path === "/new-account" ? "active" : null
                    }`}
                  >
                    <Link className="nav-link" to="/new-account">
                      Đăng ký <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                </>
              )}
              {!_.isEmpty(user) ? (
                <>
                  <li className="d-flex">
                    <img
                      src={require("../../common/assets/images/user.svg")}
                      alt="avatar"
                      width={35}
                    />
                    <div style={{ width: 5 }}></div>
                    <Link to="/admin/profile" className="nav-link member">
                      {user && user.Admin
                        ? user.Admin.name
                        : user && user.Staff
                        ? user.Staff.name
                        : user && user.Customer
                        ? user.Customer.name
                        : "Thành viên"}
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      path === "/admin/dashboard" ? "active" : null
                    }`}
                  >
                    {user.role === "ADMIN" ||
                    user.role === "STAFF" ||
                    user.role === "CUSTOMER" ? (
                      <Link
                        className="nav-link"
                        to={
                          user.role === "CUSTOMER"
                            ? "/admin/order"
                            : "/admin/dashboard"
                        }
                      >
                        {user.role === "CUSTOMER" ? "Hóa đơn" : "Admin Page"}
                      </Link>
                    ) : null}
                  </li>
                  <li className="nav-item">
                    <a onClick={this.logout} className="nav-link" href="/#">
                      Đăng xuất
                    </a>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </nav>
        <div
          style={{
            minHeight: "calc(100vh - 80px - 180px)"
          }}
        >
          {this.props.children}
        </div>
        <Footer
          className="text-light"
          style={{
            backgroundColor: "#001529",
            color: "#fff",
            paddingBottom: 50
          }}
        >
          <Row>
            <Col lg={6}>
              <img
                style={{ width: 150, height: "auto" }}
                alt="logo"
                src="https://res.flynow.vn/logoflynow.png"
              />
            </Col>
            <Col lg={6}>
              <p style={{ fontWeight: "bold", fontSize: 15 }}>
                ĐỊA CHỈ FLY NOW
              </p>
              <p>Thành phố Hồ Chí Minh: Đại học Sài Gòn</p>
            </Col>
            <Col lg={6}>
              <p style={{ fontWeight: "bold", fontSize: 15 }}>LIÊN HỆ</p>
              <p>
                <Icon type="phone" />
                <span className="icon-description">123456789</span>
              </p>
              <p>
                <Icon type="mail" />
                <span className="icon-description">Flynow@gmail.com</span>
              </p>
            </Col>
            <Col lg={6}>
              <p style={{ fontWeight: "bold", fontSize: 15 }}>
                ĐĂNG KÍ NHẬN EMAIL
              </p>
              <p>
                <Input style={{ width: 233 }} placeholder="Email" />
              </p>
            </Col>
          </Row>
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state[MODULE_USER].user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...handlers(dispatch)
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainLayoutFrontPage)
);
