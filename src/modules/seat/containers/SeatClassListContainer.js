import SeatClassList from "../components/SeatClassList";
import { connect } from "react-redux";
import handlers from "../handlers";
import { MODULE_NAME } from "../models";

const mapStateToProps = state => {
  return {
    seatClasses: state[MODULE_NAME].seatClasses
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
)(SeatClassList);
