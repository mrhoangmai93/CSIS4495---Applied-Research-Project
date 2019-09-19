import Immutable from "immutable";
import * as Action from "../../actions/front/test.action";
const initialState = Immutable.fromJS({
  isLoading: false
});

export default function test(state = initialState, action) {
  switch (action.type) {
    case Action.GET_TEST:
      return state.set("isLoading", true);
    default:
      return state;
  }
}
