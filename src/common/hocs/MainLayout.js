import React, { Component } from "react";
import { Layout, Menu, Icon, Row, Col, Dropdown, Avatar } from "antd";
import { withRouter } from "react-router";
import menuConstant from "./Menu";
import LoginPage from "./LoginPage";
import { connect } from "react-redux";
import handlers from "../../modules/user/handlers";
import "bootstrap/dist/css/bootstrap-grid.css";
const { Header, Content, Footer, Sider } = Layout;

// const nameLogo = 'Fly Now'

export class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSelect = this.handleSelect.bind(this);
    this.handleShowMenu = this.handleShowMenu.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleSelect(value) {
    this.props.history.push(`/${value.key}`);
  }

  handleShowMenu() {
    const { pathname } = this.props.location;
    let split = pathname.split("/");
    let defaultPath = `admin/` + split[2];
    // /admin/customer/1
    // /admin/customer
    const { mode } = this.props;
    const menu = menuConstant[mode];
    const { SubMenu } = Menu;
    const renderMenu = [];
    menu.forEach(item => {
      let menuItemArray = [];
      if (item.children.length !== 0) {
        menuItemArray = item.children.map(menuItem => {
          return (
            <Menu.Item key={menuItem.key}>
              <span>
                <Icon type={menuItem.icon} />
                {menuItem.name}
              </span>
            </Menu.Item>
          );
        });
        renderMenu.push(
          <SubMenu
            title={
              <span>
                <Icon className="fix-icon" type={item.icon} />
                {item.name}
              </span>
            }
            key={item.key}
          >
            {menuItemArray}
          </SubMenu>
        );
      } else {
        renderMenu.push(
          <Menu.Item key={item.key}>
            <span>
              <Icon className="fix-icon" type={item.icon} key={item} />
              {item.name}
            </span>
          </Menu.Item>
        );
      }
    });
    return (
      <Menu
        menu="inline"
        onSelect={this.handleSelect}
        theme="dark"
        mode="inline"
        selectedKeys={[defaultPath ? defaultPath : "/admin/dashboard"]}
      >
        {renderMenu}
      </Menu>
    );
  }

  handleLogout(value) {
    this.props.logout();
  }

  render() {
    const { mode } = this.props;
    if (mode) {
      return (
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {}}
            onCollapse={(collapsed, type) => {
              // console.log(collapsed, type);
            }}
            theme="dark"
          >
            <div className="logo" />
            <div
              onClick={() => this.props.history.push("/")}
              style={{
                cursor: "pointer",
                padding: 10
              }}
            >
              {/* {nameLogo} */}
              <img
                width={100}
                alt=""
                src="https://res.flynow.vn/logoflynow.png"
              />
            </div>
            {this.handleShowMenu()}
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Row>
                <Col span={6} />
                <Col offset={12} span={6}>
                  <Menu
                    selectable={false}
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                    style={{
                      lineHeight: "64px",
                      float: "right",
                      marginRight: 20
                    }}
                  >
                    <Menu.Item>
                      <Dropdown
                        overlay={
                          <Menu style={{ width: 180, fontSize: "1.2em" }}>
                            <Menu.Item
                              onClick={() =>
                                this.props.history.push("/admin/profile")
                              }
                              key="profile"
                            >
                              <Icon type="user" />
                              Thông tin cá nhân
                            </Menu.Item>
                            <Menu.Item onClick={this.handleLogout} key="logout">
                              <Icon type="poweroff" />
                              Đăng xuất
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Avatar
                          style={{ width: 40, height: 40 }}
                          src={require("../../common/assets/images/user.svg")}
                        />
                      </Dropdown>
                    </Menu.Item>
                  </Menu>
                </Col>
              </Row>
            </Header>
            <Content
              style={{
                margin: "5px 9px",
                height: "100%"
              }}
            >
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  minWidth: "calc(80vw)"
                }}
              >
                {React.cloneElement(this.props.children, { ...this.props })}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              FlyNow Management ©2019
            </Footer>
          </Layout>
        </Layout>
      );
    } else return <LoginPage />;
  }
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    ...handlers(dispatch)
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainLayout)
);
