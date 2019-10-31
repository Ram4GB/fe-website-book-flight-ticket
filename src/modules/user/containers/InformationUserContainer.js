import { connect } from "react-redux";
import InformationUserComponent from "../components/InformationUserComponent";
import { MODULE_NAME as MODULE_USER } from "../models";

const mapStateToProps = state => {
  return {
    user: state[MODULE_USER].user
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InformationUserComponent);
