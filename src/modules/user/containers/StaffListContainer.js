import React, { Component } from "react";
import { connect } from "react-redux";
import StaffListComponent from "../components/StaffListComponent";
import handlers from "../handlers";
import { MODULE_NAME as MODULE_USER } from "../models";

export class UserContainer extends Component {
  render() {
    return <div />;
  }
}

const mapStateToProps = (state, props) => {
  return {
    staffs: state[MODULE_USER].staffs
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    ...handlers(dispatch, props)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffListComponent);
