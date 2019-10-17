const DOCUMENT = "CURRENT_ORDER_";

//Load cart Data
export const LOAD = `${DOCUMENT}LOAD`;
export const LOADED = `${DOCUMENT}LOADED`;
export const LOAD_ERROR = `${DOCUMENT}LOAD_ERROR`;

//Create
export const CREATE = `${DOCUMENT}CREATE`;
export const CREATED = `${DOCUMENT}CREATED`;
export const CREATE_ERROR = `${DOCUMENT}CREATE_ERROR`;
//Create
export const PLACE = `${DOCUMENT}PLACE`;
export const PLACED = `${DOCUMENT}PLACED`;
export const PLACE_ERROR = `${DOCUMENT}PLACE_ERROR`;
//update cart
export const createOrder = payload => ({
  type: CREATE,
  payload
});
//placeOrder
export const placeOrder = payload => ({
  type: PLACE,
  payload
});
