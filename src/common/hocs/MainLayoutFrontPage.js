import React, { Component } from "react";
import { Layout, Row, Col, Input, Icon, notification } from "antd";
import logo from "../assets/images/logo.png";
import logofooter from "../assets/images/logo-footer.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import handlers from "../../modules/user/handlers";
import { MODULE_NAME as MODULE_USER } from "../../modules/user/models";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";

const { Footer } = Layout;
export class MainLayoutFrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }
  async logout() {
    await this.props.logout();
    notification.success({
      message: "Logout success"
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }
  componentDidMount() {}
  render() {
    const { user } = this.props;
    console.log(
      _.isEmpty(this.props.user) ? "khong co user" : "co user",
      this.props.user
    );
    return (
      <Layout>
        <nav
          style={{
            backgroundColor: "#001529",
            color: "#fff",
            padding: "8px 50px"
          }}
          className="navbar navbar-expand-lg navbar-dark"
        >
          <a className="navbar-brand" href="/#">
            <img alt="logo" src={logo} />
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
                <li className="nav-item active">
                  <Link className="nav-link" to="/login">
                    Đăng nhập <span className="sr-only">(current)</span>
                  </Link>
                </li>
              )}
              {!_.isEmpty(user) ? (
                <li className="nav-item">
                  <a onClick={this.logout} className="nav-link" href="/#">
                    Đăng xuất
                  </a>
                </li>
              ) : null}
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">
                  Admin Page
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div
          style={{
            height: "100%"
          }}
        >
          {this.props.children}
        </div>
        <Footer
          className="text-light"
          style={{ backgroundColor: "#001529", color: "#fff" }}
        >
          <Row>
            <Col lg={6}>
              <img
                alt="logo-footer"
                style={{ width: "auto", height: 70 }}
                src={logofooter}
              />
            </Col>
            <Col lg={6}>
              <p>ĐỊA CHỈ FLY NOW</p>
              <p>Thành phố Hồ Chí Minh: Đại học Sài Gòn</p>
            </Col>
            <Col lg={6}>
              <p>LIÊN HỆ</p>
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
              <p>ĐĂNG KÍ NHẬN EMAIL</p>
              <p>
                <Input style={{ width: 200 }} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayoutFrontPage);
