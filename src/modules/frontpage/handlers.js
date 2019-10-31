import * as actions from "./actions";
export default function(dispatch, props) {
  return {
    setParamsRegisterFly: params => {
        dispatch(actions.setParamsRegisterFly(params))
    }
  };
}
