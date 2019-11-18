import { connect } from "react-redux";
import OrderListComponent from "../components/OrderListComponent";
import { MODULE_NAME } from "../models";
import { MODULE_NAME as MODULE_USER } from "../../user/models";
import handlers from "../handlers";

const mapStateToProps = state => {
  return {
    orders: state[MODULE_NAME].orders,
    user: state[MODULE_USER].user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...handlers(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListComponent);
