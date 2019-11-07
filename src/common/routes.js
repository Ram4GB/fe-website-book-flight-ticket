import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { MODULE_NAME as MODULE_USER } from "../modules/user/models";
import UnderConstruction from "./components/UnderConstruction";
/** Pages */
import MainLayout from "./hocs/MainLayout";
import LoginPage from "./hocs/LoginPage";
import NewAccount from "../pages/NewAccount";
import StaffPage from "../pages/StaffPage";
import MainLayoutFrontPage from "./hocs/MainLayoutFrontPage";
import { Result, Button } from "antd";
import { withRouter } from "react-router";
import RegisterFlyPage from "../pages/RegisterFlyPage";
import StepRegisterPage from "../pages/StepRegisterPage";
import Homepage from "../pages/Homepage";
import CustomerPage from "../pages/CustomerPage";
import OrderListPage from "../pages/OrderListPage";
import InformationUser from "../pages/InformationUser";
import StaffInformationPage from "../pages/StaffInformationPage";
import FlightPage from "../pages/FlightPage";
import FlightInformationPage from "../pages/FlightInformationPage";
import CustomerInfomationPage from "../pages/CustomerInfomationPage";
import FlightAddPage from "../pages/FlightAddPage";
import AirplaneListPage from "../pages/AirplaneListPage";
import AirplaneInformationPage from "../pages/AirplaneInformationPage";
import AirplaneEditPage from "../pages/AirplaneEditPage";
import LocationListPage from "../pages/LocationListPage";

export class routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getRole = this.getRole.bind(this);
  }
  getRole(user) {
    if (user) {
      if (user.Admin) return "admin";
      if (user.Staff) return "staff";
    }
  }
  render() {
    const { store } = this.props;
    const { user } = store.getState()[MODULE_USER];
    const role = this.getRole(user);
    if (user && role) {
      switch (role) {
        case "admin":
          return (
            <Switch>
              <Route exact path="/admin/dashboard">
                <MainLayout mode="admin">
                  <UnderConstruction></UnderConstruction>
                </MainLayout>
              </Route>
              <Route exact path="/admin/staff">
                <MainLayout mode="admin">
                  <StaffPage></StaffPage>
                </MainLayout>
              </Route>
              <Route exact path="/admin/staff/:id">
                <MainLayout mode="admin">
                  <StaffInformationPage></StaffInformationPage>
                </MainLayout>
              </Route>
              <Route exact path="/admin/customer">
                <MainLayout mode="admin">
                  <CustomerPage></CustomerPage>
                </MainLayout>
              </Route>
              <Route exact path="/admin/customer/:id">
                <MainLayout mode="admin">
                  <CustomerInfomationPage></CustomerInfomationPage>
                </MainLayout>
              </Route>
              <Route exact path="/admin/order">
                <MainLayout mode="admin">
                  <OrderListPage></OrderListPage>
                </MainLayout>
              </Route>
              <Route exact path="/admin/flight">
                <MainLayout mode="admin">
                  <FlightPage></FlightPage>
                </MainLayout>
              </Route>
              <Route exact path="/admin/flight/create">
                <MainLayout mode="admin">
                  <FlightAddPage></FlightAddPage>
                </MainLayout>
              </Route>
              <Route exact path="/admin/flight/:id">
                <MainLayout mode="admin">
                  <FlightInformationPage></FlightInformationPage>
                </MainLayout>
              </Route>
              <Route exact path="/admin/profile">
                <MainLayout mode="admin">
                  <InformationUser></InformationUser>
                </MainLayout>
              </Route>
              <Route exact path="/admin/airplane">
                <MainLayout mode="admin">
                  <AirplaneListPage></AirplaneListPage>
                </MainLayout>
              </Route>
              <Route exact path="/admin/airplane/:id">
                <MainLayout mode="admin">
                  <AirplaneInformationPage></AirplaneInformationPage>
                </MainLayout>
              </Route>
              <Route exact path="/admin/airplane/:id/edit">
                <MainLayout mode="admin">
                  <AirplaneEditPage></AirplaneEditPage>
                </MainLayout>
              </Route>
              <Route exact path="/admin/location">
                <MainLayout mode="admin">
                  <LocationListPage></LocationListPage>
                </MainLayout>
              </Route>
              {/* Front Page */}
              <Route exact path="/">
                <MainLayoutFrontPage>
                  <RegisterFlyPage></RegisterFlyPage>
                </MainLayoutFrontPage>
              </Route>
              <Route exact path="/register">
                <MainLayoutFrontPage>
                  <RegisterFlyPage></RegisterFlyPage>
                </MainLayoutFrontPage>
              </Route>
              <Route path="/step-register">
                <MainLayoutFrontPage>
                  <StepRegisterPage></StepRegisterPage>
                </MainLayoutFrontPage>
              </Route>
              <Route exact path="/login">
                <MainLayoutFrontPage>
                  <LoginPage></LoginPage>
                </MainLayoutFrontPage>
              </Route>
              <Route path="*">
                <MainLayoutFrontPage>
                  <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                      <Button
                        onClick={() => this.props.history.push("/")}
                        type="primary"
                      >
                        Về trang chủ
                      </Button>
                    }
                  />
                </MainLayoutFrontPage>
              </Route>
            </Switch>
          );
        case "staff":
          return (
            <Switch>
              <Route exact path="/admin/dashboard">
                <MainLayout mode="staff">
                  <UnderConstruction></UnderConstruction>
                </MainLayout>
              </Route>
              <Route exact path="/admin/profile">
                <MainLayout mode="staff">
                  <InformationUser></InformationUser>
                </MainLayout>
              </Route>
              <Route exact path="/admin/order">
                <MainLayout mode="staff">
                  <OrderListPage></OrderListPage>
                </MainLayout>
              </Route>
              <Route exact path="/admin/customer">
                <MainLayout mode="staff">
                  <CustomerPage></CustomerPage>
                </MainLayout>
              </Route>
              <Route exact path="/admin/customer/:id">
                <MainLayout mode="staff">
                  <CustomerInfomationPage></CustomerInfomationPage>
                </MainLayout>
              </Route>
              {/* Front Page */}
              <Route exact path="/">
                <MainLayoutFrontPage>
                  <RegisterFlyPage></RegisterFlyPage>
                </MainLayoutFrontPage>
              </Route>
              <Route exact path="/register">
                <MainLayoutFrontPage>
                  <RegisterFlyPage></RegisterFlyPage>
                </MainLayoutFrontPage>
              </Route>
              <Route path="/step-register">
                <MainLayoutFrontPage>
                  <StepRegisterPage></StepRegisterPage>
                </MainLayoutFrontPage>
              </Route>
              <Route exact path="/login">
                <MainLayoutFrontPage>
                  <LoginPage></LoginPage>
                </MainLayoutFrontPage>
              </Route>
              <Route exact path="/new-account">
                <MainLayoutFrontPage>
                  <NewAccount></NewAccount>
                </MainLayoutFrontPage>
              </Route>
              <Route path="*">
                <MainLayoutFrontPage>
                  <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                      <Button
                        onClick={() => this.props.history.push("/")}
                        type="primary"
                      >
                        Về trang chủ
                      </Button>
                    }
                  />
                </MainLayoutFrontPage>
              </Route>
            </Switch>
          );
        default:
          return (
            <MainLayout mode="">
              <Route path="*" component={UnderConstruction} />
            </MainLayout>
          );
      }
    } else {
      return (
        <MainLayoutFrontPage>
          <Switch>
            <Route exact component={RegisterFlyPage} path="/" />
            <Route exact component={LoginPage} path="/login" />
            <Route exact component={NewAccount} path="/new-account" />
            <Route exact component={RegisterFlyPage} path="/register" />
            <Route exact component={StepRegisterPage} path="/step-register" />
            <Route exact component={Homepage} path="/homepage" />
            <Route path="*">
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                  <Button
                    onClick={() => this.props.history.push("/")}
                    type="primary"
                  >
                    Về trang chủ
                  </Button>
                }
              />
            </Route>
          </Switch>
        </MainLayoutFrontPage>
      );
    }
  }
}

export default withRouter(routes);
