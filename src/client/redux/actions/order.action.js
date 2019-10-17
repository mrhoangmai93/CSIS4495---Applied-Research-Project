const DOCUMENT = "ORDER_";

//clear cart
export const LOAD = `${DOCUMENT}LOAD`;
export const LOADED = `${DOCUMENT}LOADED`;
export const LOAD_ERROR = `${DOCUMENT}LOAD_ERROR`;
//Load cart
export const loadOrders = () => ({
  type: LOAD
});
