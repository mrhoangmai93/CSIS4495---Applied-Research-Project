import * as ACTION from "../../actions/alert.action";
import Immutable from "immutable";

// const initialState = [];
const initialState = Immutable.fromJS([]);
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION.ALERT_SET_DONE:
      return state.merge({
        payload
      });
    // return [...state, payload];
    case ACTION.ALERT_REMOVED:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
