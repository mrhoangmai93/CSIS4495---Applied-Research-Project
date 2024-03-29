import Immutable from "immutable";

import * as ACTION from "../../actions/cart.action";

const initialState = Immutable.fromJS({});
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION.LOADED:
    case ACTION.ADDED:
    case ACTION.UPDATED:
    case ACTION.DELETED_ITEM:
    case ACTION.CLEARED:
      return state.merge(payload);

    case ACTION.LOAD_ERROR:
    case ACTION.ADD_ERROR:
      //   return state.merge({
      //     token: null,
      //     isAuthenticated: false,
      //     loading: false
      //   });
      return;
    default:
      return state;
  }
}
