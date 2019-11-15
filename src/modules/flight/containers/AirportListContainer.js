import { connect } from "react-redux";
import handlers from "../handlers";
import { MODULE_NAME as MODULE_AIRPORT } from "../models";
import AirportListComponent from "../components/AirportListComponent";

const mapStateToProps = state => {
  return {
    airports: state[MODULE_AIRPORT].airports
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
)(AirportListComponent);
