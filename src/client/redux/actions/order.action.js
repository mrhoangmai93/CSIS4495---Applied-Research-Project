const DOCUMENT = "ORDER_";

//clear cart
export const LOAD = `${DOCUMENT}LOAD`;
export const LOADED = `${DOCUMENT}LOADED`;
export const LOAD_ERROR = `${DOCUMENT}LOAD_ERROR`;
//seller Pending
export const SELLER_PENDING_LOAD = `${DOCUMENT}SELLER_PENDING_LOAD`;
export const SELLER_PENDING_LOADED = `${DOCUMENT}SELLER_PENDING_LOADED`;
export const SELLER_PENDING_LOAD_ERROR = `${DOCUMENT}SELLER_PENDING_LOAD_ERROR`;
//seller Completed
export const SELLER_COMPLETE_LOAD = `${DOCUMENT}SELLER_COMPLETE_LOAD`;
export const SELLER_COMPLETE_LOADED = `${DOCUMENT}SELLER_COMPLETE_LOADED`;
export const SELLER_COMPLETE_LOAD_ERROR = `${DOCUMENT}SELLER_COMPLETE_LOAD_ERROR`;
//seller Pending
export const SELLER_COMPLETE = `${DOCUMENT}SELLER_COMPLETE`;
export const SELLER_COMPLETED = `${DOCUMENT}SELLER_COMPLETED`;
export const SELLER_COMPLETE_ERROR = `${DOCUMENT}SELLER_COMPLETE_ERROR`;
//seller All Order
export const SELLER_LOAD = `${DOCUMENT}SELLER_LOAD`;
export const SELLER_LOADED = `${DOCUMENT}SELLER_LOADED`;
export const SELLER_LOAD_ERROR = `${DOCUMENT}SELLER_LOAD_ERROR`;
//seller Pending
export const SELLER_CANCEL = `${DOCUMENT}SELLER_`;
export const SELLER_CANCELED = `${DOCUMENT}SELLER_CANCELED`;
export const SELLER_CANCEL_ERROR = `${DOCUMENT}SELLER_CANCEL_ERROR`;
//Load orders
export const loadOrders = () => ({
  type: LOAD
});
export const loadPendingSellerOrders = () => ({
  type: SELLER_PENDING_LOAD
});
export const loadCompletedSellerOrders = () => ({
  type: SELLER_COMPLETE_LOAD
});
export const loadAllSellerOrders = () => ({
  type: SELLER_LOAD
});
export const sellerCompleteOrder = id => ({
  type: SELLER_COMPLETE,
  id
});
export const sellerCancelOrder = id => ({
  type: SELLER_CANCEL,
  id
});
