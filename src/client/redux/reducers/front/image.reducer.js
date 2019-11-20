import Immutable from "immutable";

import * as ACTION from "../../actions/image.action";

const initialState = Immutable.fromJS({
  url: ""
});
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION.UPLOADED:
      return state.set("url", payload);

    case ACTION.UPLOAD_ERROR:
    default:
      return state;
  }
}
