import { connect } from "react-redux";
import handlers from "../handlers";
import { MODULE_NAME as MODULE_AIRPLANE } from "../models";
import AirlineListComponent from "../components/AirlineListComponent";

const mapStateToProps = state => {
  return {
    airlines: state[MODULE_AIRPLANE].airlines
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
)(AirlineListComponent);
