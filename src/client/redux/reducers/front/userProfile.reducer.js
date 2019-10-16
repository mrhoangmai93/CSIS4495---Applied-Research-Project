import Immutable from "immutable";

import * as ACTION from "../../actions/userProfile.action";

const initialState = Immutable.fromJS({
  payments: []
});
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION.LOADED:
    case ACTION.EDITED_ADDRESS:
    case ACTION.EDITED_PAYMENT:
    case ACTION.DELETED_PAYMENT:
      // case ACTION.DELETED_ITEM:
      return state.merge(payload);

    case ACTION.LOAD_ERROR:
    // case ACTION.ADD_ERROR:

    //   return state.merge({
    //     token: null,
    //     isAuthenticated: false,
    //     loading: false
    //   });
    default:
      return state;
  }
}
