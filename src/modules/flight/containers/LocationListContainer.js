import { connect } from "react-redux";
import handlers from "../handlers";
import LocationListComponent from "../components/LocationListComponent";
import { MODULE_NAME } from "../models";

const mapStateToProps = state => {
  return {
    locations: state[MODULE_NAME].locations
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
)(LocationListComponent);
