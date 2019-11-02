import { connect } from "react-redux";
import { MODULE_NAME } from "../models";
import FlightListComponent from "../components/FlightListComponent";

const mapStateToProps = state => {
  return {
    flights: state[MODULE_NAME].flights
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightListComponent);
