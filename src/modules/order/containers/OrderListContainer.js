import { connect } from "react-redux";
import OrderListComponent from "../components/OrderListComponent";
import { MODULE_NAME } from "../models";
import handlers from "../handlers";

const mapStateToProps = state => {
  return {
    orders: state[MODULE_NAME].orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...handlers(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListComponent);
