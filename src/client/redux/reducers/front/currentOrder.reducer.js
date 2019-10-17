import Immutable from "immutable";

import * as ACTION from "../../actions/currentOrder.action";

const initialState = Immutable.fromJS({
  foods: [],
  orderSummary: {},
  shippingAddress: {},
  paymentMethod: {}
});
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION.CREATED:
    case ACTION.PLACED:
      return state.merge(payload);

    case ACTION.CREATE_ERROR:
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
