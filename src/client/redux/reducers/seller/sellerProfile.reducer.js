import Immutable from "immutable";

import * as ACTION from "../../actions/seller/sellerProfile.action";

const initialState = Immutable.fromJS({
  loading: true,
  socials: [],
  feedbacks: []
});
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION.CREATED:
    case ACTION.LOADED:
    case ACTION.ADDED_FEEDBACK:
      // case ACTION.DELETED_ITEM:
      payload.loading = false;

      return state.merge(payload);

    case ACTION.LOAD_ERROR:
      return state.set("loading", false);

    default:
      return state;
  }
}
