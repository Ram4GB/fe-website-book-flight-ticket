import RegisterFlyComponent from "../components/RegisterFlyComponent";
import handlers from "../handlers";
import { connect } from "react-redux";
import { MODULE_NAME } from "../models";


const mapStateToProps = state => {
  return {
    paramsRegisterFly: state[MODULE_NAME].paramsRegisterFly
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
)(RegisterFlyComponent);
