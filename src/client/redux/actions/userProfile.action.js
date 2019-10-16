const DOCUMENT = "PROFILE_";

//Load cart Data
export const LOAD = `${DOCUMENT}LOAD`;
export const LOADED = `${DOCUMENT}LOADED`;
export const LOAD_ERROR = `${DOCUMENT}LOAD_ERROR`;
//add to
export const ADD = `${DOCUMENT}ADD`;
export const ADDED = `${DOCUMENT}ADDED`;
export const ADD_ERROR = `${DOCUMENT}ADD_ERROR`;

// Edit Address
export const EDIT_ADDRESS = `${DOCUMENT}EDIT_ADDRESS`;
export const EDITED_ADDRESS = `${DOCUMENT}EDITED_ADDRESS`;
export const EDIT_ADDRESS_ERROR = `${DOCUMENT}EDIT_ADDRESS_ERROR`;
// Edit Payment
export const EDIT_PAYMENT = `${DOCUMENT}EDIT_PAYMENT`;
export const EDITED_PAYMENT = `${DOCUMENT}EDITED_PAYMENT`;
export const EDIT_PAYMENT_ERROR = `${DOCUMENT}EDIT_PAYMENT_ERROR`;
// delete Payment
export const DELETE_PAYMENT = `${DOCUMENT}DELETE_PAYMENT`;
export const DELETED_PAYMENT = `${DOCUMENT}DELETED_PAYMENT`;
export const DELETE_PAYMENT_ERROR = `${DOCUMENT}DELETE_PAYMENT_ERROR`;
//Load cart
export const loadProfile = () => ({
  type: LOAD
});

//
export const editAddress = payload => ({
  type: EDIT_ADDRESS,
  payload
});
export const editPayment = payload => ({
  type: EDIT_PAYMENT,
  payload
});
export const deletePayment = payload => ({
  type: DELETE_PAYMENT,
  payload
});
