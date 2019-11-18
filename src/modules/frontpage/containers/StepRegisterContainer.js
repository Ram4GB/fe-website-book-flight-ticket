import StepRegisterComponent from "../components/StepRegisterComponent";
import { connect } from "react-redux";
import { MODULE_NAME as MODULE_USER } from "../../user/models";
import { MODULE_NAME } from "../models";
import handlers from "../handlers";

const mapStateToProps = state => {
  return {
    paramsRegisterFly: state[MODULE_NAME].paramsRegisterFly,
    user: state[MODULE_USER].user
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
)(StepRegisterComponent);
