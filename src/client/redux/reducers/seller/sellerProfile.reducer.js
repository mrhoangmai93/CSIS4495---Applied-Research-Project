import Immutable from "immutable";

import * as ACTION from "../../actions/seller/sellerProfile.action";
import * as ORDER_ACTION from "../../actions/order.action";
const initialState = Immutable.fromJS({
  loading: true,
  socials: [],
  feedbacks: [],
  foodList: [],
  orders: {
    completedOrders: [],
    pendingOrders: []
  }
});
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION.CREATED:
    case ACTION.LOADED:
    case ACTION.ADDED_FEEDBACK:
    case ACTION.DELETED_FEEDBACK:
      payload.loading = false;
      return state.merge(payload);
    case ACTION.UPDATED_FOOD:
      const index = state.get("foodList").findIndex(item => {
        return item._id.toString() === payload._id.toString();
      });
      // keep the populated data of owner
      payload.owner = state.getIn(["foodList", index]).owner;
      return state.setIn(["foodList", index], payload);
    //return state.set("foodList", newList);
    case ACTION.FOOD_LOADED:
      return state.set("foodList", payload);
    case ACTION.CREATED_FOOD:
      const list = state.get("foodList");
      list.push(payload);
      return state.set("foodList", list);
    //return state.update("foodList", list => list.push(payload));

    case ORDER_ACTION.SELLER_PENDING_LOADED:
      //return state.mergeDeep(["orders", "pendingOrders"], payload);
      return state.mergeDeep({
        orders: {
          pendingOrders: Immutable.fromJS(payload)
        }
      });
    case ORDER_ACTION.SELLER_COMPLETE_LOADED:
      //return state.mergeDeep(["orders", "completedOrders"], payload);
      return state.mergeDeep({
        orders: {
          completedOrders: Immutable.fromJS(payload)
        }
      });
    case ORDER_ACTION.SELLER_COMPLETED:
      const orderindex = state
        .getIn(["orders", "pendingOrders"])
        .findIndex(item => {
          return item._id.toString() === payload._id.toString();
        });
      const newPen = state.getIn(["orders", "pendingOrders"]);
      const newItem = newPen.splice(orderindex, 1).get(0);
      newItem.orderStatus = "completed";
      const newCom = state.getIn(["orders", "completedOrders"]);
      newCom.push(newItem);
      // state.setIn(["orders","completedOrders", newArray ]);
      return state.merge({
        orders: {
          completedOrders: newCom,
          pendingOrders: newPen
        }
      });
    case ORDER_ACTION.SELLER_LOADED:
      return state.set("orders", payload);
    case ACTION.LOAD_ERROR:
      return state.set("loading", false);
    default:
      return state;
  }
}
