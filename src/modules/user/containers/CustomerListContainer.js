import { connect } from "react-redux";
import CustomerListComponent from "../components/CustomerListComponent";
import handlers from "../handlers";
import { MODULE_NAME } from "../models";

const mapStateToProps = state => {
  return {
    users: state[MODULE_NAME].users
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
)(CustomerListComponent);
