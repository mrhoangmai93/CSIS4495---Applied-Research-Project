const DOCUMENT = "SELLER_PROFILE_";

//Load profile Data
export const LOAD = `${DOCUMENT}LOAD`;
export const LOADED = `${DOCUMENT}LOADED`;
export const LOAD_ERROR = `${DOCUMENT}LOAD_ERROR`;
//Load profile Data
export const FOOD_LOAD = `${DOCUMENT}FOOD_LOAD`;
export const FOOD_LOADED = `${DOCUMENT}FOOD_LOADED`;
export const FOOD_LOAD_ERROR = `${DOCUMENT}FOOD_LOAD_ERROR`;
//add to
export const CREATE = `${DOCUMENT}CREATE`;
export const CREATED = `${DOCUMENT}CREATED`;
export const CREATE_ERROR = `${DOCUMENT}CREATE_ERROR`;

// Edit Feedback
export const ADD_FEEDBACK = `${DOCUMENT}ADD_FEEDBACK`;
export const ADDED_FEEDBACK = `${DOCUMENT}ADDED_FEEDBACK`;
export const ADD_FEEDBACK_ERROR = `${DOCUMENT}ADD_FEEDBACK_ERROR`;

// delete Feedback
export const DELETE_FEEDBACK = `${DOCUMENT}DELETE_FEEDBACK`;
export const DELETED_FEEDBACK = `${DOCUMENT}DELETED_FEEDBACK`;
export const DELETE_FEEDBACK_ERROR = `${DOCUMENT}DELETE_FEEDBACK_ERROR`;
//create Food
export const CREATE_FOOD = `${DOCUMENT}CREATE_FOOD`;
export const CREATED_FOOD = `${DOCUMENT}CREATED_FOOD`;
export const CREATE_FOOD_ERROR = `${DOCUMENT}CREATE_FOOD_ERROR`;
//Load seller profile
export const loadSellerProfile = payload => ({
  type: LOAD,
  payload
});

//Load seller foods
export const loadSellerFood = payload => ({
  type: FOOD_LOAD,
  payload
});
//
export const createSellerProfile = (payload, history) => ({
  type: CREATE,
  payload,
  history
});
export const addFeedback = payload => ({
  type: ADD_FEEDBACK,
  payload
});
export const deleteFeedback = payload => ({
  type: DELETE_FEEDBACK,
  payload
});
//update / create Food
export const createFood = payload => ({
  type: CREATE_FOOD,
  payload
});
