import React, { Component } from "react";
import { connect } from "react-redux";
import { HashRouter } from "react-router-dom";
import Routes from "../routes";
import Modal from "../components/widgets/Modal";
import { MODULE_NAME as MODULE_USER } from "../../modules/user/models";
import handlers from "../../modules/user/handlers";
import handlersOrder from "../../modules/order/handlers";
import { notification } from "antd";
import PageLoading from "../components/widgets/PageLoading";
notification.config({
  placement: "topRight",
  bottom: 50,
  duration: 3
});
class MainPage extends Component {
  shouldComponentUpdate(nextProps) {
    const { user } = this.props;
    if (
      (!user && nextProps.user) ||
      (nextProps.user && user.id !== nextProps.user.id)
    ) {
      return true;
    }
    return false;
  }

  async componentDidMount() {
    await this.props.getProfileUser();
  }

  render() {
    const { store } = this.props;
    return (
      <>
        <HashRouter>
          <Routes getListOrder={this.props.getListOrder} store={store} />
        </HashRouter>
        <Modal.Component global />
        <PageLoading.Component type="bars" />
      </>
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
    ...handlers(dispatch),
    ...handlersOrder(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
