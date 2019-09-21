import Immutable from "immutable";

import * as ACTION from "../../actions/action.types";

// const initialState = {
//   token: localStorage.getItem("token"),
//   isAuthenticated: null,
//   loading: true,
//   user: null
// };
const initialState = Immutable.fromJS({
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
});
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION.USER_LOADED:
      return state.merge({
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      });
    case ACTION.REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return state.merge({
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      });
    case ACTION.REGISTER_FAILED:
    case ACTION.AUTH_ERROR:
      localStorage.removeItem("token");
      return state.merge({
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      });
    default:
      return state;
  }
}
