const DOCUMENT = "CART_";

//Load cart Data
export const LOAD = `${DOCUMENT}LOAD`;
export const LOADED = `${DOCUMENT}LOADED`;
export const LOAD_ERROR = `${DOCUMENT}LOAD_ERROR`;
//add to
export const ADD = `${DOCUMENT}ADD`;
export const ADDED = `${DOCUMENT}ADDED`;
export const ADD_ERROR = `${DOCUMENT}ADD_ERROR`;
//
export const DELETE_ITEM = `${DOCUMENT}DELETE_ITEM`;
export const DELETED_ITEM = `${DOCUMENT}DELETED_ITEM`;
export const DELETE_ERROR = `${DOCUMENT}DELETE_ERROR`;
//update
export const UPDATE = `${DOCUMENT}UPDATE`;
export const UPDATED = `${DOCUMENT}UPDATED`;
export const UPDATE_ERROR = `${DOCUMENT}UPDATE_ERROR`;
//Load cart
export const loadCart = () => ({
  type: LOAD
});

//Load cart
export const addToCart = payload => ({
  type: ADD,
  payload
});

//Delete from cart
export const deleteFromCart = payload => ({
  type: DELETE_ITEM,
  payload
});

//update cart
export const updateCart = payload => ({
  type: UPDATE,
  payload
});
