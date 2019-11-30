import OrderInformation from "../components/OrderInformation";
import handlers from "../handlers";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    ...handlers(dispatch)
  };
};

export default connect(null, mapDispatchToProps)(OrderInformation);
