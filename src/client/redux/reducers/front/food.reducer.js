import Immutable from "immutable";

import * as ACTION from "../../actions/food.action";

const initialState = Immutable.fromJS([]);
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION.LOADED_ALL:
      return state.merge(payload);

    case ACTION.LOAD_ERROR:
    //   return state.merge({
    //     token: null,
    //     isAuthenticated: false,
    //     loading: false
    //   });
    default:
      return state;
  }
}
