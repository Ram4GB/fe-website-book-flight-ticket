import { connect } from "react-redux";
import CustomerListComponent from "../components/CustomerListComponent";
import handlers from "../handlers";

const mapStateToProps = state => {
  return {};
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
