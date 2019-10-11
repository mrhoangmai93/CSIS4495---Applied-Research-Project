const DOCUMENT = "CART_";

//Load cart Data
export const LOAD = `${DOCUMENT}LOAD`;
export const LOADED = `${DOCUMENT}LOADED`;
export const LOAD_ERROR = `${DOCUMENT}LOAD_ERROR`;
//add to
export const ADD = `${DOCUMENT}ADD`;
export const ADDED = `${DOCUMENT}ADDED`;
export const ADD_ERROR = `${DOCUMENT}ADD_ERROR`;

//Load cart
export const loadCart = () => ({
  type: LOAD
});

//Load cart
export const addToCart = payload => ({
  type: ADD,
  payload
});
