import Immutable from "immutable";

import * as ACTION from "../../actions/food.action";

const initialState = Immutable.fromJS({
  loading: true,
  searchTerm: '',
  list: []
});
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION.LOADED_ALL:
    case ACTION.SEARCH_FOOD_SUCCESS:
      return state.set("list", payload).set("loading", false);
    case ACTION.LOAD_ERROR:
      //   return state.merge({
      //     token: null,
      //     isAuthenticated: false,
      //     loading: false
      //   });

      return state.set("loading", false);
    default:
      return state;
  }
}
